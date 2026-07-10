import { FeaturesIntro } from "@/components/landing/features-intro";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { Navbar } from "@/components/landing/navbar";
import Link from "next/link";

function CTA() {
  return (
    <section className="px-4 py-16 md:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-serif-display text-3xl tracking-tight text-foreground md:text-4xl">
          Mulai buat caption sekarang
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground md:text-base">
          Gratis dan tidak perlu mendaftar. Cukup unggah gambar Anda dan dapatkan caption
          siap posting dalam hitungan detik.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="#generator"
            className="inline-flex rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Buat caption gratis
          </Link>
          <Link
            href="#fitur"
            className="inline-flex rounded-full border border-border px-8 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Lihat fitur
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturesIntro />
      </main>
      <Footer />
    </div>
  );
}
