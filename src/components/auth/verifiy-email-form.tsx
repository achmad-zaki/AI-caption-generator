"use client"

import { useZodForm } from "@/hooks/use-zod-form";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Field, FieldError } from "../ui/field";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Spinner } from "../ui/spinner";

const codeVerificationSchema = z.object({
    code: z.string().min(6, { message: "Kode verifikasi harus 6 digit" }).max(6, { message: "Kode verifikasi harus 6 digit" }).refine((value) => /^\d{6}$/.test(value), { message: "Kode verifikasi harus 6 digit" }),
});

type CodeVerificationSchemaForm = z.infer<typeof codeVerificationSchema>;

const RESEND_COOLDOWN_SECONDS = 60;

export default function VerifyEmailForm({ email }: { email?: string }) {
    const [isResending, setIsResending] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN_SECONDS);

    useEffect(() => {
        if (resendCooldown <= 0) return;

        const interval = setInterval(() => {
            setResendCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
        }, 1000);

        return () => clearInterval(interval);
    }, [resendCooldown]);

    const form = useZodForm<CodeVerificationSchemaForm>({
        schema: codeVerificationSchema,
        defaultValues: {
            code: "",
        },
    });

    const onSubmit = async (data: CodeVerificationSchemaForm) => {
        console.log(data)
    }

    const resendEmail = async () => {
        if (!email) {
            toast.error("Email tidak ditemukan. Silakan masuk ulang.");
            return;
        }

        if (resendCooldown > 0) return;

        setIsResending(true);
        try {
            const { data, error } = await authClient.emailOtp.sendVerificationOtp({
                email,
                type: "sign-in",
            });

            if (error) {
                toast.error(error.message);
                return;
            }

            if (data.success) {
                toast.success("Kode verifikasi berhasil dikirim ulang");
                setResendCooldown(RESEND_COOLDOWN_SECONDS);
            }
        } finally {
            setIsResending(false);
        }
    }

    return (
        <form
            className="mt-8 space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
        >
            <Controller
                control={form.control}
                name="code"
                render={({ field, fieldState }) => (
                    <Field aria-invalid={fieldState.invalid}>
                        <Input
                            {...field}
                            aria-invalid={fieldState.invalid}
                            onWheel={(event) => event.currentTarget.blur()}
                            type="number"
                            className="h-11 rounded-full px-4"
                            placeholder="Kode verifikasi"
                        />
                        {fieldState.error && <FieldError>{[fieldState.error.message]}</FieldError>}
                    </Field>
                )}
            />

            <Button
                type="submit"
                size="lg"
                className="h-11 w-full rounded-full"
            >
                Verifikasi
            </Button>

            <div className="flex flex-col items-center gap-5">
                <Button
                    type="button"
                    variant="ghost"
                    size="lg"
                    className="h-11 w-full rounded-full hover:bg-transparent!"
                    disabled={isResending || !email || resendCooldown > 0}
                    onClick={resendEmail}
                >
                    {isResending && <Spinner className="size-4" />}
                    {isResending
                        ? "Mengirim ulang kode..."
                        : resendCooldown > 0
                            ? `Kirim ulang dalam ${resendCooldown}s`
                            : "Kirim ulang kode"}
                </Button>

                <div className="flex items-center gap-2 w-full">
                    <Separator className="flex-1" />
                    <span className="text-sm text-muted-foreground">atau</span>
                    <Separator className="flex-1" />
                </div>

                <Button
                    size="lg"
                    variant="outline"
                    className="h-11 w-full rounded-full"
                    asChild>
                    <Link href="/auth/password-reset">
                        Lanjutkan dengan password
                    </Link>
                </Button>
            </div>
        </form>
    )
}
