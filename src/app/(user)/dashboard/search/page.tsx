"use client";

import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { useHistories } from "@/hooks/use-history";
import { groupHistoryByDate } from "@/lib/mock-prompt-history";
import { cn } from "@/lib/utils";
import { RiCloseLine, RiSearchLine } from "@remixicon/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { MdArrowOutward } from "react-icons/md";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const { data: history = [], isPending, isError } = useHistories();

    const filteredGroups = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        const filtered = normalizedQuery
            ? history.filter((item) =>
                item.title.toLowerCase().includes(normalizedQuery),
            )
            : history;

        return groupHistoryByDate(filtered);
    }, [query, history]);

    const hasResults = filteredGroups.length > 0;

    return (
        <div className="flex flex-1 flex-col px-4 py-8">
            <div className="mx-auto w-full max-w-2xl space-y-2.5">
                <InputGroup className="h-11 rounded-full">
                    <InputGroupAddon>
                        <RiSearchLine />
                    </InputGroupAddon>
                    <InputGroupInput
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Cari percakapan..."
                    />
                    {query.trim() && (
                        <InputGroupAddon align="inline-end">
                            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setQuery("")}>
                                <RiCloseLine />
                            </Button>
                        </InputGroupAddon>
                    )}
                </InputGroup>

                <div className="mt-6">
                    {isPending ? (
                        <p className="py-8 text-center text-sm text-muted-foreground">Memuat...</p>
                    ) : isError ? (
                        <p className="py-8 text-center text-sm text-muted-foreground">
                            Gagal memuat riwayat percakapan.
                        </p>
                    ) : !hasResults ? (
                        <p className="py-8 text-center text-sm text-muted-foreground">
                            {query.trim()
                                ? "Tidak ada percakapan yang cocok."
                                : "Belum ada riwayat percakapan."}
                        </p>
                    ) : (
                        <div className="flex flex-col gap-6 overflow-y-auto max-h-[calc(95vh-10rem)] scrollbar-thin scrollbar-thumb-muted-foreground scroll-fade">
                            {filteredGroups.map((group, index) => (
                                <section key={index}>
                                    <h2 className="mb-2 px-1 text-xs font-medium text-muted-foreground">
                                        {group.label}
                                    </h2>
                                    <ul className="flex flex-col gap-0.5">
                                        {group.items.map((item) => (
                                            <li key={item.id}>
                                                <Link
                                                    href={`/dashboard/${item.id}`}
                                                    className={cn(
                                                        "group rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors flex items-center justify-between gap-2",
                                                        "hover:bg-muted/60",
                                                    )}
                                                >
                                                    {item.title}
                                                    <MdArrowOutward className="size-4 group-hover:visible invisible" />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
