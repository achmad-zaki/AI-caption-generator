"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { ConversationDetail } from "@/lib/api/history";
import { authClient } from "@/lib/auth-client";
import { RiCheckLine, RiFileCopyLine } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { TbPencilPlus } from "react-icons/tb";

export type ConversationData = ConversationDetail;

function UserMessage({
    imageUrl,
    style,
    userName,
    userImage,
}: {
    imageUrl: string;
    style: string | null;
    userName?: string | null;
    userImage?: string | null;
}) {
    const initials =
        userName
            ?.split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() ?? "U";

    return (
        <div className="flex w-full justify-center px-4 py-6 md:px-6">
            <div className="flex w-full max-w-3xl gap-3 md:gap-4">
                <div className="flex min-w-0 flex-1 flex-col items-end gap-2">
                    <div className="max-w-[85%] space-y-2 md:max-w-[75%]">
                        <div className="overflow-hidden rounded-2xl border border-border bg-muted/30">
                            <img
                                src={imageUrl}
                                alt="Gambar konten"
                                className="max-h-72 w-full object-contain bg-muted/20"
                            />
                        </div>
                        {style && (
                            <div className="rounded-2xl rounded-tr-sm bg-primary/10 px-4 py-3 text-sm leading-relaxed text-foreground">
                                {style}
                            </div>
                        )}
                    </div>
                </div>
                <Avatar size="sm" className="mt-0.5 shrink-0">
                    <AvatarImage src={userImage ?? undefined} alt={userName ?? "User"} />
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
}

function AssistantMessage({
    caption,
    hashtags,
}: {
    caption: string;
    hashtags: string[];
}) {
    const [copied, setCopied] = useState(false);

    async function copyToClipboard() {
        const text = `${caption}\n\n${hashtags.join(" ")}`;
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="group flex w-full justify-center bg-muted/20 px-4 py-6 md:px-6">
            <div className="flex w-full max-w-3xl gap-3 md:gap-4">
                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                    <Image
                        src="/images/logo.svg"
                        alt="CaptionAI"
                        width={18}
                        height={18}
                        className="size-[18px]"
                    />
                </div>
                <div className="min-w-0 flex-1 space-y-4">
                    <div className="space-y-4 text-sm leading-relaxed text-foreground/90 md:text-base">
                        {caption.split("\n\n").map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))}
                    </div>

                    {hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {hashtags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center gap-1 md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={copyToClipboard}
                            className="h-8 gap-1.5 rounded-lg px-2.5 text-xs text-muted-foreground"
                        >
                            {copied ? (
                                <>
                                    <RiCheckLine className="size-3.5 text-green-600 dark:text-green-400" />
                                    Tersalin
                                </>
                            ) : (
                                <>
                                    <RiFileCopyLine className="size-3.5" />
                                    Salin
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ConversationView({ data }: { data: ConversationData }) {
    const { data: session } = authClient.useSession();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
    }, []);

    const user = session?.user;

    return (
        <div className="flex h-full min-h-0 flex-1 flex-col">
            <header className="flex shrink-0 items-center justify-center border-b border-border px-4 py-3">
                <h1 className="truncate text-sm font-medium text-foreground">
                    {data.title}
                </h1>
            </header>

            <div
                ref={scrollRef}
                className="flex min-h-0 flex-1 flex-col overflow-y-auto scroll-fade"
            >
                <UserMessage
                    imageUrl={data.imageUrl}
                    style={data.style}
                    userName={user?.name}
                    userImage={user?.image}
                />

                <AssistantMessage
                    caption={data.caption}
                    hashtags={data.hashtags}
                />
            </div>

            <div className="shrink-0 border-t border-border bg-background px-4 py-4">
                <div className="mx-auto flex max-w-3xl items-center justify-center">
                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="gap-2 rounded-full"
                    >
                        <Link href="/dashboard">
                            <TbPencilPlus className="size-4" />
                            Percakapan baru
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
