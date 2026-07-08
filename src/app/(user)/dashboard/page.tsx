import { CaptionGenerator } from "@/components/caption-generator";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard"
}

export default function UserDashboardPage() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center">
            <h1 className="mb-8 text-center text-3xl font-medium text-white/90 md:text-4xl">
                Mau buat caption apa hari ini?
            </h1>

            {/* Prompt input */}
            <CaptionGenerator />
        </div>
    );
}
