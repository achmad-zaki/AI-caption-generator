export type PromptHistoryItem = {
    id: string;
    title: string;
};

export const promptHistory: PromptHistoryItem[] = [
    { id: "a1b2c3d4-e5f6-4789-a012-3456789abcde", title: "Caption produk skincare untuk Instagram" },
    { id: "b2c3d4e5-f6a7-4890-b123-456789abcdef0", title: "Ide konten motivasi pagi hari" },
    { id: "c3d4e5f6-a7b8-4901-c234-56789abcdef01", title: "Copywriting promo diskon 50%" },
    { id: "d4e5f6a7-b8c9-4012-d345-6789abcdef0123", title: "Caption travel ke Bali" },
    { id: "e5f6a7b8-c9d0-4123-e456-789abcdef01234", title: "Hook video TikTok makanan" },
    { id: "f6a7b8c9-d0e1-4234-f567-89abcdef012345", title: "Hook video TikTok makanan" },
    { id: "a7b8c9d0-e1f2-4345-a678-9abcdef0123456", title: "Hook video TikTok makanan" },
    { id: "b8c9d0e1-f2a3-4456-b789-abcdef01234567", title: "Hook video TikTok makanan" },
    { id: "c9d0e1f2-a3b4-4567-c89a-bcdef012345678", title: "Hook video TikTok makanan" },
    { id: "d0e1f2a3-b4c5-4678-d9ab-cdef0123456789", title: "Hook video TikTok makanan" },
    { id: "e1f2a3b4-c5d6-4789-eabc-def01234567890", title: "Hook video TikTok makanan" },
    { id: "f2a3b4c5-d6e7-4890-fbcd-ef012345678901", title: "Hook video TikTok makanan" },
    { id: "a3b4c5d6-e7f8-4901-acde-f0123456789012", title: "Hook video TikTok makanan" },
    { id: "b4c5d6e7-f8a9-4012-bdef-01234567890123", title: "Hook video TikTok makanan" },
    { id: "c5d6e7f8-a9b0-4123-ce01-12345678901234", title: "Hook video TikTok makanan" },
    { id: "d6e7f8a9-b0c1-4234-df12-23456789012345", title: "Hook video TikTok makanan" },
    { id: "e7f8a9b0-c1d2-4345-ea23-34567890123456", title: "Hook video TikTok makanan" },
    { id: "f8a9b0c1-d2e3-4456-fb34-45678901234567", title: "Hook video TikTok makanan" },
    { id: "a9b0c1d2-e3f4-4567-ac45-56789012345678", title: "Hook video TikTok makanan" },
    { id: "b0c1d2e3-f4a5-4678-bd56-67890123456789", title: "Hook video TikTok makanan" },
];

export function getPromptHistoryById(id: string) {
    return promptHistory.find((item) => item.id === id);
}
