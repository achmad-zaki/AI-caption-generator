import { CaptionGenerator } from "./caption-generator";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-4 pb-16 pt-32 md:px-6 md:pb-24 md:pt-36 lg:px-8">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h1 className="font-heading text-4xl leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl font-medium">
          AI yang menulis caption
          <br className="hidden sm:block" />
          {" "}seperti copywriter profesional.
        </h1>

        <p className="mx-auto mt-5 max-w-xl tracking-tighter text-base text-muted-foreground md:text-lg">
          Buat caption Instagram yang engaging dalam hitungan detik. Hook yang kuat,
          CTA yang tepat, dan hashtag relevan — semua otomatis.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl md:mt-14">
        <CaptionGenerator />
      </div>
    </section>
  );
}
