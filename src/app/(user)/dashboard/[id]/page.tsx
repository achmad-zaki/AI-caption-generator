import { getPromptHistoryById } from "@/lib/mock-prompt-history";
import { notFound } from "next/navigation";

type ConversationPageProps = {
    params: Promise<{ id: string }>;
};

export default async function ConversationPage({ params }: ConversationPageProps) {
    const { id } = await params;
    const conversation = getPromptHistoryById(id);

    if (!conversation) {
        notFound();
    }

    return (
        <div className="flex flex-1 flex-col px-4 pb-8">
            <div className="pt-4">
                <h1 className="text-lg font-medium text-white/90">{conversation.title}</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Percakapan ini akan ditampilkan di sini.
                </p>
            </div>
        </div>
    );
}
