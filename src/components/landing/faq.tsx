"use client";

import { cn } from "@/lib/utils";
import { RiAddLine, RiSubtractLine } from "@remixicon/react";
import { useState } from "react";

const faqs = [
  {
    question: "Apa itu CaptionAI?",
    answer:
      "CaptionAI adalah generator caption Instagram berbasis AI. Anda cukup memasukkan topik, dan AI akan menghasilkan caption lengkap dengan hook, body, CTA, serta hashtag yang relevan — semuanya dalam Bahasa Indonesia yang natural.",
  },
  {
    question: "Bagaimana cara menggunakan CaptionAI?",
    answer:
      "Ketik topik caption di kotak input di halaman utama, lalu klik 'Buat Caption'. Hasil akan muncul dalam beberapa detik. Anda bisa langsung menyalin caption beserta hashtag-nya.",
  },
  {
    question: "Apakah CaptionAI gratis?",
    answer:
      "Ya, Anda bisa menggunakan CaptionAI secara gratis. Cukup masukkan topik dan dapatkan caption siap pakai tanpa perlu mendaftar.",
  },
  {
    question: "Topik apa saja yang bisa digunakan?",
    answer:
      "Topik yang valid meliputi produk, jasa, bisnis, edukasi, pengalaman, promosi, tips, atau ide konten. Topik seperti kode program, karakter acak, atau spam tidak akan diproses.",
  },
  {
    question: "Apakah caption-nya terdengar natural?",
    answer:
      "Ya. AI kami dirancang khusus untuk menghasilkan caption dalam Bahasa Indonesia yang santai dan relatable — tidak kaku seperti template, dan tidak berlebihan seperti clickbait.",
  },
  {
    question: "Bisakah saya edit caption setelah dihasilkan?",
    answer:
      "Tentu! Caption yang dihasilkan adalah titik awal yang solid. Anda bebas menyesuaikan tone, menambah detail, atau mengubah CTA sesuai kebutuhan brand Anda.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 bg-muted/50 px-4 py-16 md:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-serif-display text-3xl tracking-tight text-foreground md:text-4xl">
          Pertanyaan yang sering diajukan
        </h2>

        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-medium text-foreground md:text-base">
                    {faq.question}
                  </span>
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border">
                    {isOpen ? (
                      <RiSubtractLine className="size-4 text-muted-foreground" />
                    ) : (
                      <RiAddLine className="size-4 text-muted-foreground" />
                    )}
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-200",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground md:px-6 md:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
