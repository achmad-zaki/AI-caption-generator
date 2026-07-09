"use client";

import { useZodForm } from "@/hooks/use-zod-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";

const profileSchema = z.object({
    name: z.string().min(2, { message: "Nama harus minimal 2 karakter" }),
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function CompleteProfileForm({ email }: { email: string }) {
    const router = useRouter();
    const [otp, setOtp] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useZodForm<ProfileForm>({
        schema: profileSchema,
        defaultValues: {
            name: "",
        },
    });

    useEffect(() => {
        if (!email) {
            toast.error("Email tidak ditemukan. Silakan masuk ulang.");
            router.replace("/");
            return;
        }
    }, [email, router]);

    const onSubmit = async (data: ProfileForm) => {
        if (!otp) {
            toast.error("Sesi verifikasi tidak ditemukan. Silakan masuk ulang.");
            router.replace("/");
            return;
        }

        setIsSubmitting(true);
        try {
            const { error } = await authClient.signIn.emailOtp({
                email,
                otp,
                name: data.name,
            });

            if (error) {
                toast.error(error.message);
                return;
            }

            toast.success("Akun berhasil dibuat!");
            router.push("/");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!otp) {
        return (
            <div className="mt-8 flex justify-center">
                <Spinner />
            </div>
        );
    }

    return (
        <form
            className="mt-8 space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
        >
            <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Nama lengkap</FieldLabel>
                        <Input
                            {...field}
                            aria-invalid={fieldState.invalid}
                            autoComplete="name"
                            autoFocus
                            className="h-11 rounded-full px-4"
                            placeholder="Masukkan nama Anda"
                        />
                        {fieldState.error && <FieldError>{[fieldState.error.message]}</FieldError>}
                    </Field>
                )}
            />

            <Button
                type="submit"
                size="lg"
                className="h-11 w-full rounded-full"
                disabled={isSubmitting}
            >
                {isSubmitting && <Spinner className="size-4" />}
                {isSubmitting ? "Membuat akun..." : "Buat akun"}
            </Button>
        </form>
    );
}
