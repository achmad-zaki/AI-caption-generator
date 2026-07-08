"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { RiCloseLine } from "@remixicon/react";
import { useState } from "react";
import { TbLayoutSidebarRightCollapse, TbLayoutSidebarRightExpand } from "react-icons/tb";

function SidebarContent({ onClose }: { onClose?: () => void }) {
    return (
        <div className="flex h-12 items-center justify-between gap-2 px-3">
            <Link href="/" className="flex min-w-0 items-center gap-1.5">
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
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-svh">
            <button
                type="button"
                aria-label="Tutup sidebar"
                aria-hidden={!sidebarOpen}
                tabIndex={sidebarOpen ? 0 : -1}
                className={cn(
                    "fixed inset-0 z-40 bg-foreground/20 backdrop-blur-[2px] transition-opacity duration-300 ease-in-out lg:hidden",
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
                    "hidden shrink-0 flex-col overflow-hidden border-r border-border bg-sidebar transition-[width] duration-300 ease-in-out lg:flex",
                    sidebarOpen ? "w-[260px]" : "w-0 border-r-transparent",
                )}
            >
                <div className="w-[260px] shrink-0">
                    <SidebarContent />
                </div>
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

                <main className="flex min-h-0 flex-1 flex-col">{children}</main>
            </div>
        </div>
    );
}
