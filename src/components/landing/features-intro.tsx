import { RiImageLine, RiMagicLine, RiTimeLine } from "@remixicon/react";

const features = [
  {
    icon: RiImageLine,
    title: "Cukup unggah gambar",
    description:
      "Tidak perlu mengetik topik. Unggah foto konten Anda, dan AI langsung membaca visualnya untuk membuat caption.",
  },
  {
    icon: RiMagicLine,
    title: "AI paham isi fotonya",
    description:
      "AI menganalisis suasana, objek, dan cerita di dalam gambar — lalu menulis caption yang cocok dan terdengar natural.",
  },
  {
    icon: RiTimeLine,
    title: "Siap posting dalam detik",
    description:
      "Dari satu gambar, dapatkan caption Instagram lengkap yang siap diposting tanpa perlu menulis dari nol.",
  },
];

export function FeaturesIntro() {
  return (
    <section id="cara-kerja" className="scroll-mt-24 px-4 py-16 md:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-sans text-center text-3xl tracking-tight text-foreground md:text-4xl lg:text-5xl">
          Dari gambar, langsung jadi caption.
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border bg-card p-6 text-center md:p-8"
            >
              <div className="mx-auto flex size-10 items-center justify-center rounded-xl bg-primary/20">
                <feature.icon className="size-5 text-primary" />
              </div>
              <h3 className="mt-5 text-base font-semibold text-foreground md:text-lg">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
