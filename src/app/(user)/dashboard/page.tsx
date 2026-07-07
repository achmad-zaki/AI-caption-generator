import { Button } from "@/components/ui/button";
import {
  RiAddLine,
  RiArrowUpLine,
  RiGlobalLine,
  RiImageLine,
  RiMicLine,
  RiPencilLine,
} from "@remixicon/react";

const quickActions = [
  { label: "Buat gambar", icon: RiImageLine },
  { label: "Tulis atau edit", icon: RiPencilLine },
  { label: "Cari referensi", icon: RiGlobalLine },
];

export default function UserDashboardPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 pb-8">
      <h1 className="mb-8 text-center text-3xl font-medium text-white/90 md:text-4xl">
        Mau buat caption apa hari ini?
      </h1>

      {/* Prompt input */}
      <div className="w-full max-w-3xl">
        <div className="flex items-center gap-2 rounded-[28px] border border-white/15 bg-[#303030] px-4 py-3 shadow-lg">
          <button
            type="button"
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Tambah lampiran"
          >
            <RiAddLine className="size-5" />
          </button>

          <input
            type="text"
            placeholder="Deskripsikan topik atau mood caption yang kamu inginkan..."
            className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
            defaultValue=""
          />

          <button
            type="button"
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Input suara"
          >
            <RiMicLine className="size-5" />
          </button>

          <button
            type="button"
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-white/90"
            aria-label="Kirim"
          >
            <RiArrowUpLine className="size-4" />
          </button>
        </div>

        {/* Quick actions */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {quickActions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className="h-9 gap-2 rounded-full border-white/15 bg-transparent px-4 text-sm font-normal text-white/80 hover:bg-white/10 hover:text-white"
            >
              <action.icon className="size-4" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
