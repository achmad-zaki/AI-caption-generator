"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import {
    RiCloseLine,
    RiDeleteBinLine,
    RiMore2Fill,
    RiSearchLine,
    RiSettingsLine,
    RiUserLine
} from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiLogOutCircle, BiPencil } from "react-icons/bi";
import { TbLayoutSidebarRightCollapse, TbLayoutSidebarRightExpand, TbPencilPlus } from "react-icons/tb";

const navItems = [
    { label: "Percakapan baru", icon: TbPencilPlus, href: "/dashboard" },
    { label: "Telusuri percakapan", icon: RiSearchLine, href: "/dashboard/search" },
] as const;

function SidebarAccount() {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    if (isPending) {
        return (
            <div className="flex items-center gap-3 px-3 py-3">
                <Spinner />
            </div>
        );
    }

    if (!session) {
        return (
            <div className="px-3 py-3">
                <p className="text-xs text-muted-foreground">Belum masuk</p>
            </div>
        );
    }

    const { user } = session;
    const initials =
        user.name
            ?.split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() ?? "U";

    const handleSignOut = async () => {
        await authClient.signOut();
        router.push("/");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-sidebar-accent focus-visible:outline-none">
                    <Avatar size="lg">
                        <AvatarImage src={user.image ?? undefined} alt={user.name} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                        {user.name && (
                            <p className="truncate text-sm font-medium">{user.name}</p>
                        )}
                        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                    </div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" side="top" className="w-(--radix-dropdown-menu-trigger-width)">
                <DropdownMenuItem asChild className="py-2">
                    <Link href="/dashboard/profile">
                        <RiUserLine className="size-4" />
                        Profil
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="py-2">
                    <Link href="/dashboard/settings">
                        <RiSettingsLine className="size-4" />
                        Pengaturan
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive" onClick={handleSignOut} className="py-2">
                    <BiLogOutCircle className="size-4" />
                    Keluar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function PromptHistoryItem({
    id,
    title,
    isActive,
    onClose,
}: {
    id: string;
    title: string;
    isActive: boolean;
    onClose?: () => void;
}) {
    return (
        <li className="group relative">
            <div
                className={cn(
                    "flex items-center gap-0.5 rounded-lg pr-1 transition-colors group-hover:bg-sidebar-accent group-focus-within:bg-sidebar-accent",
                    isActive && "bg-sidebar-accent",
                )}
            >
                <Link
                    href={`/dashboard/${id}`}
                    onClick={onClose}
                    className={cn(
                        "min-w-0 flex-1 truncate rounded-lg px-2.5 py-2 text-sm transition-colors group-hover:text-sidebar-accent-foreground group-focus-within:text-sidebar-accent-foreground",
                        isActive
                            ? "text-sidebar-accent-foreground"
                            : "text-foreground",
                    )}
                >
                    {title}
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <RiMore2Fill className="size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" side="right" className="w-40">
                        <DropdownMenuItem>
                            <BiPencil />
                            Ubah nama
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">
                            <RiDeleteBinLine />
                            Hapus
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </li>
    );
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
    const pathname = usePathname();
    const [history, setHistory] = useState<{ id: string; title: string; createdAt: string }[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(true);

    const fetchHistory = () => {
        fetch("/api/history")
            .then(res => res.json())
            .then(data => {
                if (data.histories) setHistory(data.histories);
            })
            .catch(err => console.error("Failed to fetch history:", err))
            .finally(() => setLoadingHistory(false));
    };

    useEffect(() => {
        fetchHistory();

        const handleUpdate = () => fetchHistory();
        window.addEventListener("historyUpdated", handleUpdate);
        return () => window.removeEventListener("historyUpdated", handleUpdate);
    }, []);

    return (
        <div className="flex h-full w-[260px] flex-col px-3">
            <div className="flex h-12 shrink-0 items-center justify-between gap-2">
                <Link href="/" className="flex min-w-0 items-center gap-1.5" onClick={onClose}>
                    <Image
                        src="/images/logo.svg"
                        alt="CaptionAI"
                        width={24}
                        height={24}
                        className="h-6 w-6 shrink-0"
                    />
                    <span className="truncate text-sm font-semibold tracking-tight">
                        Caption<span className="text-primary">AI</span>
                    </span>
                </Link>
                {onClose && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        aria-label="Tutup sidebar"
                        className="shrink-0"
                    >
                        <RiCloseLine className="size-5" />
                    </Button>
                )}
            </div>

            <nav className="flex shrink-0 flex-col gap-0.5 py-2">
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                        <item.icon className="size-4 shrink-0 text-muted-foreground" />
                        {item.label}
                    </Link>
                ))}
            </nav>

            <Separator />

            <div className="flex min-h-0 flex-1 flex-col py-2 overflow-y-auto scroll-fade">
                <div className="mt-0.5 flex-1">
                    <p className="px-2.5 py-1.5 text-xs font-medium text-muted-foreground">
                        Riwayat percakapan
                    </p>
                    <ul className="flex flex-col gap-1">
                        {loadingHistory ? (
                            <li className="px-2.5 py-2 text-xs text-muted-foreground">Memuat...</li>
                        ) : history.length === 0 ? (
                            <li className="px-2.5 py-2 text-xs text-muted-foreground">Belum ada percakapan</li>
                        ) : (
                            history.map((item) => (
                                <PromptHistoryItem
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    isActive={pathname === `/dashboard/${item.id}`}
                                    onClose={onClose}
                                />
                            ))
                        )}
                    </ul>
                </div>
            </div>

            <Separator />

            <div className="shrink-0 py-3">
                <SidebarAccount />
            </div>
        </div>
    );
}

function BrandLogo() {
    return (
        <Link href="/" className="flex items-center gap-1.5">
            <Image
                src="/images/logo.svg"
                alt="CaptionAI"
                width={24}
                height={24}
                className="h-6 w-6"
            />
            <span className="text-sm font-semibold tracking-tight">
                Caption<span className="text-primary">AI</span>
            </span>
        </Link>
    );
}

export default function UserDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-svh">
            <button
                type="button"
                aria-label="Tutup sidebar"
                aria-hidden={!sidebarOpen}
                tabIndex={sidebarOpen ? 0 : -1}
                className={cn(
                    "fixed inset-0 z-40 bg-background/40 backdrop-blur-xs transition-opacity duration-300 ease-in-out lg:hidden",
                    sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0",
                )}
                onClick={() => setSidebarOpen(false)}
            />
            <aside
                aria-hidden={!sidebarOpen}
                className={cn(
                    "fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-border bg-sidebar shadow-xl transition-transform duration-300 ease-in-out lg:hidden",
                    sidebarOpen ? "translate-x-0" : "pointer-events-none -translate-x-full",
                )}
            >
                <SidebarContent onClose={() => setSidebarOpen(false)} />
            </aside>

            <aside
                aria-hidden={!sidebarOpen}
                className={cn(
                    "hidden h-svh shrink-0 flex-col overflow-hidden border-r border-border bg-sidebar transition-[width] duration-300 ease-in-out lg:flex",
                    sidebarOpen ? "w-[260px]" : "w-0 border-r-transparent",
                )}
            >
                <SidebarContent />
            </aside>

            <div className="flex min-w-0 flex-1 flex-col bg-background">
                <header className="flex h-12 shrink-0 items-center gap-2 px-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen((open) => !open)}
                        className="p-4.5"
                    >
                        {sidebarOpen ? (
                            <TbLayoutSidebarRightExpand className="size-6" />
                        ) : (
                            <TbLayoutSidebarRightCollapse className="size-6" />
                        )}
                    </Button>

                    {!sidebarOpen && <BrandLogo />}
                </header>

                <main className="flex min-h-0 flex-1 flex-col p-8">{children}</main>
            </div>
        </div>
    );
}
