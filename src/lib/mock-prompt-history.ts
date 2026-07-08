export type PromptHistoryItem = {
    id: string;
    title: string;
    createdAt: string;
};

export const promptHistory: PromptHistoryItem[] = [
    { id: "a1b2c3d4-e5f6-4789-a012-3456789abcde", title: "Caption produk skincare untuk Instagram", createdAt: "2026-07-08T10:30:00.000Z" },
    { id: "b2c3d4e5-f6a7-4890-b123-456789abcdef0", title: "Ide konten motivasi pagi hari", createdAt: "2026-07-08T08:15:00.000Z" },
    { id: "c3d4e5f6-a7b8-4901-c234-56789abcdef01", title: "Copywriting promo diskon 50%", createdAt: "2026-07-07T16:45:00.000Z" },
    { id: "d4e5f6a7-b8c9-4012-d345-6789abcdef0123", title: "Caption travel ke Bali", createdAt: "2026-07-07T11:20:00.000Z" },
    { id: "e5f6a7b8-c9d0-4123-e456-789abcdef01234", title: "Hook video TikTok makanan", createdAt: "2026-07-04T14:00:00.000Z" },
    { id: "f6a7b8c9-d0e1-4234-f567-89abcdef012345", title: "Caption unboxing gadget terbaru", createdAt: "2026-07-04T09:30:00.000Z" },
    { id: "a7b8c9d0-e1f2-4345-a678-9abcdef0123456", title: "Ide konten edukasi finansial", createdAt: "2026-07-01T18:00:00.000Z" },
    { id: "b8c9d0e1-f2a3-4456-b789-abcdef01234567", title: "Caption kolaborasi brand fashion", createdAt: "2026-06-28T13:10:00.000Z" },
    { id: "c9d0e1f2-a3b4-4567-c89a-bcdef012345678", title: "Hook video workout di rumah", createdAt: "2026-06-28T07:45:00.000Z" },
    { id: "d0e1f2a3-b4c5-4678-d9ab-cdef0123456789", title: "Copywriting flash sale weekend", createdAt: "2026-06-25T20:30:00.000Z" },
    { id: "e1f2a3b4-c5d6-4789-eabc-def01234567890", title: "Caption review kafe aesthetic", createdAt: "2026-06-25T12:00:00.000Z" },
    { id: "f2a3b4c5-d6e7-4890-fbcd-ef012345678901", title: "Ide konten behind the scenes", createdAt: "2026-06-20T15:25:00.000Z" },
    { id: "a3b4c5d6-e7f8-4901-acde-f0123456789012", title: "Caption produk handmade", createdAt: "2026-06-20T10:00:00.000Z" },
    { id: "b4c5d6e7-f8a9-4012-bdef-01234567890123", title: "Hook video resep masakan cepat", createdAt: "2026-06-15T17:40:00.000Z" },
    { id: "c5d6e7f8-a9b0-4123-ce01-12345678901234", title: "Copywriting launching produk baru", createdAt: "2026-06-15T08:55:00.000Z" },
    { id: "d6e7f8a9-b0c1-4234-df12-23456789012345", title: "Caption tips produktivitas", createdAt: "2026-06-10T19:15:00.000Z" },
    { id: "e7f8a9b0-c1d2-4345-ea23-34567890123456", title: "Ide konten Q&A dengan followers", createdAt: "2026-06-10T11:30:00.000Z" },
    { id: "f8a9b0c1-d2e3-4456-fb34-45678901234567", title: "Caption event komunitas kreator", createdAt: "2026-06-05T14:20:00.000Z" },
    { id: "a9b0c1d2-e3f4-4567-ac45-56789012345678", title: "Hook video tips fotografi", createdAt: "2026-06-05T06:50:00.000Z" },
    { id: "b0c1d2e3-f4a5-4678-bd56-67890123456789", title: "Copywriting newsletter bulanan", createdAt: "2026-06-01T16:00:00.000Z" },
];

export function getPromptHistoryById(id: string) {
    return promptHistory.find((item) => item.id === id);
}

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
