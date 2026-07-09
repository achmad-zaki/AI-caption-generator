"use client";

import { useZodForm } from "@/hooks/use-zod-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Field, FieldError } from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";

const codeVerificationSchema = z.object({
    code: z
        .string()
        .min(6, { message: "Kode verifikasi harus 6 digit" })
        .max(6, { message: "Kode verifikasi harus 6 digit" })
        .refine((value) => /^\d{6}$/.test(value), { message: "Kode verifikasi harus 6 digit" }),
});

type CodeVerificationSchemaForm = z.infer<typeof codeVerificationSchema>;

async function checkEmailExists(email: string) {
    const response = await fetch("/api/auth/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });

    if (!response.ok) {
        throw new Error("Gagal memeriksa email");
    }

    const data = await response.json() as { exists: boolean };
    return data.exists;
}

export default function VerifyEmailForm({ email }: { email?: string }) {
    const router = useRouter();
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);

    const form = useZodForm<CodeVerificationSchemaForm>({
        schema: codeVerificationSchema,
        defaultValues: {
            code: "",
        },
    });

    const onSubmit = async (data: CodeVerificationSchemaForm) => {
        if (!email) {
            toast.error("Email tidak ditemukan. Silakan masuk ulang.");
            return;
        }

        setIsVerifying(true);
        try {
            const exists = await checkEmailExists(email);

            if (!exists) {
                router.push(`/auth/complete-profile?email=${encodeURIComponent(email)}`);
                return;
            }

            const { error } = await authClient.signIn.emailOtp({
                email,
                otp: data.code,
            });

            if (error) {
                toast.error(error.message);
                return;
            }

            toast.success("Berhasil masuk!");
            router.push("/dashboard");
        } catch {
            toast.error("Terjadi kesalahan. Silakan coba lagi.");
        } finally {
            setIsVerifying(false);
        }
    };

    const resendEmail = async () => {
        if (!email) {
            toast.error("Email tidak ditemukan. Silakan masuk ulang.");
            return;
        }

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
            }
        } finally {
            setIsResending(false);
        }
    };

    return (
        <form
            className="mt-8 space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
        >
            <Controller
                control={form.control}
                name="code"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <Input
                            {...field}
                            aria-invalid={fieldState.invalid}
                            onWheel={(event) => event.currentTarget.blur()}
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            className="h-11 rounded-full px-4 text-center tracking-widest"
                            placeholder="000000"
                            maxLength={6}
                        />
                        {fieldState.error && <FieldError>{[fieldState.error.message]}</FieldError>}
                    </Field>
                )}
            />

            <Button
                type="submit"
                size="lg"
                className="h-11 w-full rounded-full"
                disabled={isVerifying}
            >
                {isVerifying && <Spinner className="size-4" />}
                {isVerifying ? "Memverifikasi..." : "Verifikasi"}
            </Button>

            <Button
                type="button"
                variant="ghost"
                size="lg"
                className="h-11 w-full rounded-full hover:bg-transparent!"
                disabled={isResending || !email}
                onClick={resendEmail}
            >
                {isResending && <Spinner className="size-4" />}
                {isResending ? "Mengirim ulang kode..." : "Kirim ulang kode"}
            </Button>
        </form>
    );
}
