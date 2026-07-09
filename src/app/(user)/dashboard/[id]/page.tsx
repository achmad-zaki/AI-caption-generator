"use client";

import { ConversationView } from "@/components/conversation-view";
import { Spinner } from "@/components/ui/spinner";
import { useConversation } from "@/hooks/use-conversation";
import { ConversationNotFoundError } from "@/lib/api/history";
import { authClient } from "@/lib/auth-client";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ConversationPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { data: session, isPending: isSessionPending } = authClient.useSession();
    const { data, isPending, isError, error } = useConversation(id);

    useEffect(() => {
        if (!isSessionPending && !session) {
            router.replace("/");
        }
    }, [isSessionPending, session, router]);

    if (isSessionPending || isPending) {
        return (
            <div className="-m-8 flex min-h-0 flex-1 flex-col items-center justify-center">
                <Spinner />
            </div>
        );
    }

    if (error instanceof ConversationNotFoundError) {
        notFound();
    }

    if (isError || !data) {
        return (
            <div className="-m-8 flex min-h-0 flex-1 flex-col items-center justify-center">
                <p className="text-sm text-muted-foreground">Gagal memuat percakapan.</p>
            </div>
        );
    }

    return (
        <div className="-m-8 flex min-h-0 flex-1 flex-col">
            <ConversationView data={data} />
        </div>
    );
}
