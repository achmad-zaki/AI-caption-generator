"use client";

import { Button } from "@/components/ui/button";
import { RiSideBarLine } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function UserDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-svh bg-[#0d0d0d] text-white">
            {sidebarOpen && (
                <aside className="flex w-[260px] shrink-0 flex-col border-r border-white/10 bg-[#171717]">
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
                </aside>
            )}

            <div className="flex min-w-0 flex-1 flex-col bg-[#0d0d0d]">
                <header className="flex h-12 shrink-0 items-center gap-2 px-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/10"
                        onClick={() => setSidebarOpen((open) => !open)}
                        aria-label={sidebarOpen ? "Tutup sidebar" : "Buka sidebar"}
                    >
                        <RiSideBarLine className="size-5" />
                    </Button>

                    {!sidebarOpen && (
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
                    )}
                </header>

                <main className="flex min-h-0 flex-1 flex-col">{children}</main>
            </div>
        </div>
    );
}
