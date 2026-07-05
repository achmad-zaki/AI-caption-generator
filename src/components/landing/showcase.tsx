const styles = [
  {
    name: "Casual",
    preview: "Yuk ngopi dulu sebelum mulai hari! ☕",
    bg: "from-amber-50 to-orange-100 dark:from-amber-950/40 dark:to-orange-950/30",
  },
  {
    name: "Professional",
    preview: "Strategi konten yang konsisten = pertumbuhan bisnis yang berkelanjutan.",
    bg: "from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/40",
  },
  {
    name: "Storytelling",
    preview: "Dulu aku nggak percaya caption bisa bikin orang DM... sampai aku coba.",
    bg: "from-violet-50 to-purple-100 dark:from-violet-950/40 dark:to-purple-950/30",
  },
];

export function Showcase() {
  return (
    <section className="px-4 py-16 md:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="font-serif-display text-3xl tracking-tight text-foreground md:text-4xl">
            Lihat AI Caption in action
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground md:text-base">
            Topik yang sama, tiga gaya berbeda. Cukup satu klik untuk beralih.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {styles.map((style) => (
            <div
              key={style.name}
              className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
            >
              <div className={`bg-gradient-to-br ${style.bg} p-6 md:p-8`}>
                <div className="rounded-2xl bg-card/80 p-5 shadow-sm backdrop-blur-sm">
                  <p className="text-sm leading-relaxed text-foreground/80 md:text-base">
                    {style.preview}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {["#fyp", "#instagram", "#content"].map((tag) => (
                      <span key={tag} className="text-xs text-sky-600 dark:text-sky-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t border-border px-5 py-4">
                <p className="text-sm font-semibold text-foreground">{style.name}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-border bg-card p-2 shadow-sm">
            <div className="rounded-2xl bg-muted/50 p-6 md:p-8">
              <div className="mb-4 inline-flex rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-700 dark:bg-pink-950/50 dark:text-pink-400">
                Hook + Body + CTA
              </div>
              <div className="space-y-3">
                <div className="h-3 w-3/4 rounded-full bg-muted-foreground/20" />
                <div className="h-3 w-full rounded-full bg-muted-foreground/20" />
                <div className="h-3 w-5/6 rounded-full bg-muted-foreground/20" />
                <div className="h-3 w-2/3 rounded-full bg-muted-foreground/30" />
              </div>
              <div className="mt-6 flex gap-2">
                {["#bisnis", "#tips", "#fyp"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-sky-50 px-2.5 py-1 text-xs text-sky-700 dark:bg-sky-950/50 dark:text-sky-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border bg-card p-2 shadow-sm">
            <div className="rounded-2xl bg-gradient-to-br from-sky-50 to-blue-100 p-6 dark:from-sky-950/40 dark:to-blue-950/30 md:p-8">
              <div className="mb-4 inline-flex rounded-full bg-card px-3 py-1 text-xs font-medium text-foreground shadow-sm">
                Ganti gaya
              </div>
              <div className="grid grid-cols-2 gap-3">
                {["Edukatif", "Promosi", "Story", "Tips"].map((label) => (
                  <div
                    key={label}
                    className="rounded-xl bg-card/70 p-3 text-center text-xs font-medium text-foreground shadow-sm"
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
