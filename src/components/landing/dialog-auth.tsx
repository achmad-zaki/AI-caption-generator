"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useState } from "react";
import { CgMail } from "react-icons/cg";
import GoogleButton from "../google-button";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { Separator } from "../ui/separator";
import { Spinner } from "../ui/spinner";

export default function DialogAuth() {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isEmailLoading, setIsEmailLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const isLoading = isEmailLoading || isGoogleLoading;

    function resetForm() {
        setEmail("");
        setPassword("");
        setShowPassword(false);
        setError(null);
        setIsEmailLoading(false);
        setIsGoogleLoading(false);
    }

    async function handleGoogleSignIn() {
        setError(null);
        setIsGoogleLoading(true);

        await authClient.signIn.social(
            {
                provider: "google",
                callbackURL: "/api/auth/callback/google",
            },
            {
                onError: (ctx) => {
                    setError(ctx.error.message);
                    setIsGoogleLoading(false);
                },
            }
        );
    }

    async function handleEmailSignIn(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setIsEmailLoading(true);

        await authClient.signIn.email(
            {
                email,
                password,
                callbackURL: "/",
                rememberMe: true,
            },
            {
                onSuccess: () => {
                    setOpen(false);
                    resetForm();
                },
                onError: (ctx) => {
                    setError(ctx.error.message);
                },
                onResponse: () => {
                    setIsEmailLoading(false);
                },
            }
        );
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
                setOpen(nextOpen);
                if (!nextOpen) resetForm();
            }}
        >
            <DialogTrigger asChild>
                <Button size="lg" className="hidden rounded-full px-4 md:inline-flex">
                    Masuk
                </Button>
            </DialogTrigger>

            <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-[400px]">
                <div className="px-6 py-6">
                    <DialogHeader className="items-center text-center">
                        <div className="mb-3 flex size-12 items-center justify-center rounded-2xl border border-border bg-background">
                            <Image
                                src="/images/logo.svg"
                                alt="CaptionAI"
                                width={28}
                                height={28}
                                className="size-7"
                            />
                        </div>
                        <DialogTitle className="font-sans text-xl">Selamat datang kembali</DialogTitle>
                        <DialogDescription className="max-w-[280px] text-balance">
                            Masuk untuk menyimpan caption dan mengakses fitur lengkap CaptionAI.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="space-y-5 px-6 py-5">
                    <GoogleButton />

                    <div className="flex items-center gap-2 text-center">
                        <Separator className="flex-1" />
                        <span className="text-sm text-muted-foreground">atau</span>
                        <Separator className="flex-1" />
                    </div>

                    <form onSubmit={handleEmailSignIn} className="space-y-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <InputGroup className="rounded-full">
                            <InputGroupAddon>
                                <CgMail />
                            </InputGroupAddon>
                            <InputGroupInput placeholder="Alamat email" />
                        </InputGroup>

                        <Button
                            type="submit"
                            size="lg"
                            className="h-10 w-full rounded-full"
                            disabled={isLoading}
                        >
                            {isEmailLoading ? (
                                <>
                                    <Spinner />
                                    Memproses...
                                </>
                            ) : (
                                "Masuk"
                            )}
                        </Button>
                    </form>

                    <p className="text-center text-xs leading-relaxed text-muted-foreground">
                        Dengan masuk, Anda menyetujui{" "}
                        <span className="text-foreground/80">Ketentuan Layanan</span> dan{" "}
                        <span className="text-foreground/80">Kebijakan Privasi</span> kami.
                    </p>
                </div>
            </DialogContent>
        </Dialog >
    );
}
