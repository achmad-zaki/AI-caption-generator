import { RiChatQuoteLine, RiMagicLine, RiPencilLine } from "@remixicon/react";

const features = [
  {
    icon: RiMagicLine,
    title: "Dari topik ke caption jadi",
    description:
      "Lewati proses menulis dari nol. AI kami mengubah topik sederhana menjadi caption Instagram lengkap yang siap diposting.",
  },
  {
    icon: RiChatQuoteLine,
    title: "Kualitas di setiap caption",
    description:
      "AI memahami cerita yang ingin Anda sampaikan, dan menyesuaikan gaya bahasa agar terdengar natural — bukan seperti robot.",
  },
  {
    icon: RiPencilLine,
    title: "Tidak perlu pengalaman",
    description:
      "Belum pernah menulis caption? Tenang saja. Cukup ketik topik, dan dapatkan hasil yang profesional dalam hitungan detik.",
  },
];

export function FeaturesIntro() {
  return (
    <section id="cara-kerja" className="scroll-mt-24 px-4 py-16 md:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-serif-display text-center text-3xl tracking-tight text-foreground md:text-4xl lg:text-5xl">
          Caption dengan rasa, bukan hanya kecepatan.
        </h2>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-950/50">
                  <feature.icon className="size-5 text-sky-700 dark:text-sky-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground md:text-lg">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="rounded-3xl bg-sky-50 p-6 dark:bg-sky-950/30 md:p-8">
              <div className="overflow-hidden rounded-2xl bg-card shadow-lg">
                <div className="aspect-[4/5] bg-gradient-to-br from-muted to-muted/60 p-6">
                  <div className="flex h-full flex-col justify-between">
                    <div className="space-y-3">
                      <div className="inline-flex rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                        Hook
                      </div>
                      <p className="text-sm leading-relaxed text-foreground/80">
                        Pernah nggak sih kamu scroll IG terus berhenti karena caption-nya
                        bikin penasaran? 🤔
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Nah, itulah kekuatan hook yang tepat. Caption yang baik nggak cuma
                        jualan — tapi bikin orang mau baca sampai habis.
                      </p>
                    </div>
                    <div className="rounded-xl bg-primary px-4 py-2 text-center text-xs font-medium text-primary-foreground">
                      Buat caption sekarang →
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-2 rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background shadow-md md:-right-4">
                + Hashtag
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
