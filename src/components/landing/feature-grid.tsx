const features = [
  {
    title: "Caption otomatis",
    description: "Hook, body, dan CTA yang terstruktur.",
  },
  {
    title: "Bahasa natural",
    description: "Santai dan relatable, tidak terdengar seperti AI.",
  },
  {
    title: "Hashtag relevan",
    description: "5–8 hashtag yang sesuai dengan topik Anda.",
  },
  {
    title: "Hook yang kuat",
    description: "Kalimat pembuka yang menghentikan scroll.",
  },
  {
    title: "Emoji secukupnya",
    description: "Proporsi tepat, tidak berlebihan.",
  },
  {
    title: "Paragraf pendek",
    description: "Nyaman dibaca di feed Instagram.",
  },
  {
    title: "CTA interaktif",
    description: "Ajakan komentar, share, atau bertanya.",
  },
  {
    title: "Semua niche",
    description: "Bisnis, edukasi, lifestyle, F&B, dan kreator.",
  },
  {
    title: "Instan & gratis",
    description: "Siap copy-paste dalam hitungan detik.",
  },
];

export function FeatureGrid() {
  return (
    <section id="fitur" className="scroll-mt-24 px-4 py-16 md:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl tracking-tight text-foreground md:text-3xl">
          Semua yang Anda butuhkan.
        </h2>

        <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title}>
              <h3 className="text-sm font-medium text-foreground md:text-base">
                {feature.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
