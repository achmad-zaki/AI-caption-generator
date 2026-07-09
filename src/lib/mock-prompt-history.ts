import type { HistoryItem } from "@/lib/api/history";

export type PromptHistoryItem = HistoryItem;

export function formatHistoryDate(isoDate: string) {
    return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
    }).format(new Date(isoDate));
}

export function groupHistoryByDate(items: PromptHistoryItem[]) {
    const sorted = [...items].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    const groups: { dateKey: string; label: string; items: PromptHistoryItem[] }[] = [];

    for (const item of sorted) {
        const dateKey = item.createdAt.slice(0, 10);
        const lastGroup = groups.at(-1);

        if (lastGroup?.dateKey === dateKey) {
            lastGroup.items.push(item);
        } else {
            groups.push({
                dateKey,
                label: formatHistoryDate(item.createdAt),
                items: [item],
            });
        }
    }

    return groups;
}
