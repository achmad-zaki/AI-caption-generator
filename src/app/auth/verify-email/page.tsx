import { Metadata } from "next";

type VerifyEmailPageProps = {
    searchParams: Promise<{ email?: string }>;
};

export const metadata: Metadata = {
    title: "Verifikasi Email",
}

export default async function VerifyEmailPage({
    searchParams,
}: VerifyEmailPageProps) {
    const { email } = await searchParams;

    return (
        <div>
            <h1>{email}</h1>
        </div>
    )
}
