const pressLogos = [
  "TechCrunch",
  "Forbes",
  "CNBC",
  "Bloomberg",
  "The New York Times",
];

const stats = [
  { value: "10K+", label: "caption dibuat" },
  { value: "50+", label: "niche konten" },
  { value: "100+", label: "gaya hashtag" },
];

export function Stats() {
  return (
    <section id="statistik" className="scroll-mt-24 px-4 py-16 md:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-medium tracking-widest text-muted-foreground uppercase">
          Dipercaya kreator
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-12">
          {pressLogos.map((logo) => (
            <span
              key={logo}
              className="text-sm font-bold tracking-tight text-foreground opacity-60 md:text-base"
            >
              {logo}
            </span>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
