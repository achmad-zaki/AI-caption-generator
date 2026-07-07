"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

export default function GoogleButton() {
    const [isLoading, setLoading] = useState<boolean>(false)

    async function handleGoogleSignIn() {
        setLoading(true);

        await authClient.signIn.social(
            {
                provider: "google",
                callbackURL: "/",
            },
            {
                onError: (ctx) => {
                    toast.error(ctx.error.statusText);
                    setLoading(false);
                },
            },
        );
    }

    return (
        <Button
            type="button"
            variant="outline"
            size="lg"
            className="h-10 w-full rounded-full border-border/80 bg-background shadow-xs hover:bg-muted/50"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
        >
            {isLoading ? (
                <Spinner />
            ) : (
                <FcGoogle />
            )}
            Lanjutkan dengan Google
        </Button>
    )
}
