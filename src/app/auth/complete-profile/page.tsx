import CompleteProfileForm from "@/components/auth/complete-profile-form";
import { ThemeToggle } from "@/components/theme-toggle";
import { prisma } from "@/lib/prisma";
import { RiUserLine } from "@remixicon/react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Lengkapi Profil",
};

export default async function CompleteProfilePage({
    searchParams,
}: {
    searchParams: Promise<{ email?: string }>;
}) {
    const { email } = await searchParams;

    if (!email) {
        redirect("/");
    }

    const existingUser = await prisma.user.findUnique({
        where: { email },
        select: { id: true },
    });

    if (existingUser) {
        redirect("/");
    }

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
                            <RiUserLine className="size-7 text-muted-foreground" />
                        </div>
                    </div>

                    <div className="space-y-3 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                            Lengkapi profil Anda
                        </h1>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            Email{" "}
                            <span className="font-medium text-foreground">{email}</span>{" "}
                            sudah terverifikasi. Masukkan nama Anda untuk menyelesaikan pendaftaran.
                        </p>
                    </div>

                    <CompleteProfileForm email={email} />
                </div>
            </main>
        </div>
    );
}
