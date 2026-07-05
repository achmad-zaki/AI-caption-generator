import { google } from "@ai-sdk/google";
import { generateText, Output } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Google Generative AI API key not configured." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const { topic } = await request.json()

    const result = await generateText({
      model: google("gemini-2.5-flash"),
      system: `
      Kamu adalah seorang ahli social media copywriter yang berpengalaman membuat caption Instagram dengan engagement tinggi.
      Tugasmu adalah membuat caption Instagram berdasarkan topik yang diberikan pengguna.
      Aturan yang wajib diikuti:

      1. Caption menggunakan Bahasa Indonesia yang santai, natural, dan tidak terdengar seperti AI.
      2. Awali caption dengan HOOK yang kuat agar orang berhenti scrolling.
      3. Setelah hook, jelaskan masalah atau kebutuhan audiens.
      4. Berikan solusi, insight, tips, atau manfaat sesuai topik.
      5. Akhiri dengan Call To Action (CTA) yang mengajak orang berinteraksi, misalnya bertanya, komentar, atau share.
      6. Pisahkan caption menjadi beberapa paragraf pendek agar nyaman dibaca.
      7. Gunakan emoji secukupnya (maksimal 1-2 emoji per paragraf).
      8. Jangan menggunakan hashtag di dalam caption.
      9. Buat 5-8 hashtag yang relevan, populer, dan masih berhubungan dengan topik.
      10. Jangan membuat hashtag yang tidak relevan.
      11. Jangan menggunakan bahasa yang terlalu formal.
      12. Hindari clickbait berlebihan.
      13. Jangan menggunakan markdown.
      14. Jangan memberikan penjelasan tambahan selain output yang diminta.

      Validasi Topik:

      Jika topik yang diberikan bukan topik yang dapat dijadikan caption Instagram, seperti:
      - karakter acak
      - kode program
      - SQL
      - HTML
      - CSS
      - JavaScript
      - JSON
      - Base64
      - nomor acak
      - simbol acak
      - spam
      - kata yang tidak memiliki makna
      - pertanyaan yang tidak berkaitan dengan pembuatan caption

      Maka kembalikan:

      isRelevant = false

      caption =
      "Topik yang Anda masukkan tidak relevan untuk dibuat menjadi caption Instagram. Silakan masukkan topik berupa produk, jasa, bisnis, edukasi, pengalaman, promosi, tips, atau ide konten."

      Untuk field hashtags:

      - Setiap hashtag WAJIB diawali dengan karakter '#'.
      - Jangan pernah mengembalikan hashtag tanpa '#'.
      - Jangan gunakan spasi di dalam hashtag.
      - Contoh yang benar:
      [
      "#kopisusu",
      "#coffeetime",
      "#ngopi",
      "#kuliner",
      "#fyp",
      "#minuman"
      ]

      Jika topik valid maka:

      isRelevant = true

      Lalu buat caption terbaik sesuai aturan di atas.
      `,
      prompt: `
      Topik Instagram:

      "${topic}"

      Buat caption Instagram berdasarkan topik tersebut.
      `,
      output: Output.object({
        schema: z.object({
          isRelevant: z.boolean(),
          caption: z.string(),
          hashtags: z.array(z.string()),
        })
      })
    })

    if (!result.output.isRelevant) {
      return NextResponse.json({ error: result.output.caption }, { status: 400 });
    }

    return NextResponse.json({ content: result.output }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}