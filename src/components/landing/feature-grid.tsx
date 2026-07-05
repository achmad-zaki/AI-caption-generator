import {
  RiChatSmile3Line,
  RiGlobalLine,
  RiHashtag,
  RiLightbulbLine,
  RiMusic2Line,
  RiPencilRuler2Line,
  RiScissorsCutLine,
  RiSparkling2Line,
  RiTranslate2,
} from "@remixicon/react";

const features = [
  {
    icon: RiChatSmile3Line,
    title: "Caption otomatis",
    description: "Buat caption dengan hook, body, dan CTA yang terstruktur.",
  },
  {
    icon: RiTranslate2,
    title: "Bahasa Indonesia natural",
    description: "Gaya bahasa santai dan relatable, tidak terdengar seperti AI.",
  },
  {
    icon: RiHashtag,
    title: "Hashtag relevan",
    description: "5–8 hashtag populer yang masih berhubungan dengan topik Anda.",
  },
  {
    icon: RiLightbulbLine,
    title: "Hook yang kuat",
    description: "Buka caption dengan kalimat yang bikin audiens berhenti scrolling.",
  },
  {
    icon: RiSparkling2Line,
    title: "Emoji secukupnya",
    description: "Emoji ditambahkan dengan proporsi yang tepat, tidak berlebihan.",
  },
  {
    icon: RiScissorsCutLine,
    title: "Paragraf pendek",
    description: "Caption dipecah jadi paragraf singkat agar nyaman dibaca di feed.",
  },
  {
    icon: RiPencilRuler2Line,
    title: "CTA interaktif",
    description: "Ajakan bertanya, komentar, atau share di akhir caption.",
  },
  {
    icon: RiGlobalLine,
    title: "Semua niche",
    description: "Cocok untuk bisnis, edukasi, lifestyle, F&B, dan konten kreator.",
  },
  {
    icon: RiMusic2Line,
    title: "Instan & gratis",
    description: "Hasil caption dalam hitungan detik, langsung siap copy-paste.",
  },
];

export function FeatureGrid() {
  return (
    <section id="fitur" className="scroll-mt-24 bg-muted/50 px-4 py-16 md:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-semibold text-foreground md:text-3xl">
          Semua yang Anda butuhkan untuk caption hebat.
        </h2>

        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="flex gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sky-100 dark:bg-sky-950/50">
                <feature.icon className="size-5 text-sky-800 dark:text-sky-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground md:text-base">
                  {feature.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
