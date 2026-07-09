import { CaptionGenerator } from "@/components/caption-generator";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard"
}

export default function UserDashboardPage() {
    return (
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto w-full">
            <h1 className="mb-8 text-center text-3xl tracking-tight font-medium text-foreground md:text-4xl">
                Mau buat caption apa hari ini?
            </h1>

            {/* Prompt input */}
            <CaptionGenerator />
        </div>
    );
}
