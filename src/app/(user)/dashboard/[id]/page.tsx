import { CaptionGenerator } from "@/components/caption-generator";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

type ConversationPageProps = {
    params: Promise<{ id: string }>;
};

export default async function ConversationPage({ params }: ConversationPageProps) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/");
    }

    const { id } = await params;

    const conversation = await prisma.history.findUnique({
        where: { id },
    });

    if (!conversation || conversation.userId !== session.user.id) {
        notFound();
    }

    return (
        <div className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto w-full pb-8 scroll-fade">
            <h1 className="mb-8 shrink-0 text-center text-3xl tracking-tight font-medium text-foreground md:text-4xl">
                {conversation.title}
            </h1>

            <CaptionGenerator
                initialData={{
                    id: conversation.id,
                    imageUrl: conversation.imageUrl,
                    style: conversation.style,
                    caption: conversation.caption,
                    hashtags: conversation.hashtags,
                }}
            />
        </div>
    );
}
