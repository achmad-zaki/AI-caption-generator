"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { RiMailLine } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";

export default function EmailVerificationPage() {
    return (
        <div className="flex min-h-dvh flex-col bg-background">
            <header className="flex items-center justify-between px-4 py-4 md:px-6 md:py-5">
                <Link href="/" className="flex items-center gap-1.5">
                    <Image
                        src="/images/logo.svg"
                        alt="CaptionAI"
                        width={24}
                        height={24}
                        className="size-6"
                    />
                    <span className="text-base font-semibold tracking-tight text-foreground">
                        Caption<span className="text-primary">AI</span>
                    </span>
                </Link>

                <ThemeToggle />
            </header>

            <main className="flex flex-1 flex-col items-center justify-center px-6 pb-16">
                <div className="w-full max-w-[400px]">
                    <div className="mb-6 flex justify-center">
                        <div className="flex size-16 items-center justify-center rounded-full bg-muted">
                            <RiMailLine className="size-7 text-muted-foreground" />
                        </div>
                    </div>

                    <div className="space-y-3 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                            Periksa kotak masuk
                        </h1>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            Kami mengirim kode 6 digit ke{" "}
                            <span className="font-medium text-foreground">jo***@gmail.com</span>
                        </p>
                    </div>

                    <form
                        className="mt-8 space-y-6"
                        onSubmit={(event) => event.preventDefault()}
                    >
                        <Input onWheel={(event) => event.currentTarget.blur()} type="number" className="h-11 rounded-full px-4" placeholder="Kode verifikasi" />

                        <Button
                            type="submit"
                            size="lg"
                            className="h-11 w-full rounded-full"
                        >
                            Verifikasi
                        </Button>

                        <div className="flex flex-col items-center gap-5">
                            <Button
                                variant="ghost"
                                size="lg"
                                className="h-11 w-full rounded-full hover:bg-transparent!"
                            >
                                Kirim ulang kode
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
                </div>
            </main>

            <footer className="px-6 pb-8 text-center">
                <p className="text-xs text-muted-foreground">
                    Tidak menerima kode? Periksa folder spam atau promosi.
                </p>
            </footer>
        </div>
    );
}
