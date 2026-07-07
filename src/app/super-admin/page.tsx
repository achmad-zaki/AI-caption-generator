import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
        <p className="mt-1 text-muted-foreground">
          Kelola pengguna dan pantau aktivitas aplikasi.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-medium">Kelola Pengguna</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Lihat daftar pengguna, ubah role, dan kelola akses.
          </p>
          <Button asChild className="mt-4 rounded-full">
            <Link href="/admin/users">Buka halaman pengguna</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
