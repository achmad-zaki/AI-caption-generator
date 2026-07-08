"use client";

import { useZodForm } from "@/hooks/use-zod-form";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { CgMail } from "react-icons/cg";
import { toast } from "sonner";
import { z } from "zod";
import GoogleButton from "../google-button";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Field, FieldError } from "../ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { Separator } from "../ui/separator";
import { Spinner } from "../ui/spinner";

const emailSchema = z.object({
    email: z.email("Alamat email tidak valid"),
})

type EmailSchemaForm = z.infer<typeof emailSchema>;

export default function DialogAuth() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [isLoadingEmail, setIsLoadingEmail] = useState(false);

    const form = useZodForm<EmailSchemaForm>({
        schema: emailSchema,
        defaultValues: {
            email: ""
        }
    })

    // async function handleEmailSignIn(event: React.SubmitEvent<HTMLFormElement>) {
    //     event.preventDefault();
    //     setIsEmailLoading(true);

    //     await authClient.signIn.email(
    //         {
    //             email,
    //             password,
    //             callbackURL: "/",
    //             rememberMe: true,
    //         },
    //         {
    //             onSuccess: () => {
    //                 setOpen(false);
    //                 resetForm();
    //             },
    //             onError: (ctx) => {
    //                 toast.error(ctx.error.statusText)
    //             },
    //             onResponse: () => {
    //                 setIsEmailLoading(false);
    //             },
    //         }
    //     );
    // }

    const onSubmit = async (value: EmailSchemaForm) => {
        setIsLoadingEmail(true);
        try {
            const { data, error } = await authClient.emailOtp.sendVerificationOtp({
                email: value.email,
                type: "sign-in"
            })

            if (error) {
                toast.error(error.message)
                return;
            }

            if (data.success) {
                toast.success("Kode verifikasi berhasil dikirim ke email Anda")
                router.push("/auth/email-verification");
            }
        } finally {
            setIsLoadingEmail(false);
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
                setOpen(nextOpen);
            }}
        >
            <DialogTrigger asChild>
                <Button
                    size="lg"
                    className="rounded-full px-4"
                >
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

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <InputGroup className="rounded-full">
                                        <InputGroupAddon>
                                            <CgMail />
                                        </InputGroupAddon>
                                        <InputGroupInput {...field} aria-invalid={fieldState.invalid} placeholder="Alamat email" />
                                    </InputGroup>

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full rounded-full"
                            disabled={isLoadingEmail}
                        >
                            {isLoadingEmail && <Spinner className="size-4" />}
                            {isLoadingEmail ? "Mengirim kode verifikasi..." : "Lanjutkan"}
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
