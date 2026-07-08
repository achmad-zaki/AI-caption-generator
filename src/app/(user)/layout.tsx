"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { TbLayoutSidebarRightCollapse, TbLayoutSidebarRightExpand } from "react-icons/tb";

function SidebarContent() {
    return (
        <div className="flex h-12 items-center px-3">
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
            {sidebarOpen && (
                <>
                    <button
                        type="button"
                        aria-label="Tutup sidebar"
                        className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-[2px] lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <aside className="fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-border bg-sidebar shadow-xl lg:hidden">
                        <SidebarContent />
                    </aside>
                </>
            )}

            {sidebarOpen && (
                <aside className="hidden w-[260px] shrink-0 flex-col border-r border-border bg-sidebar lg:flex">
                    <SidebarContent />
                </aside>
            )}

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
