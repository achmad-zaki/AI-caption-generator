"use client";

import { cn } from "@/lib/utils";
import {
  RiCheckLine,
  RiFileCopyLine,
  RiVideoLine
} from "@remixicon/react";
import { useCallback, useRef, useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { BsArrowRightShort } from "react-icons/bs";
import { Button } from "../ui/button";

type GenerateResult = {
  caption: string;
  hashtags: string[];
};

function UploadIllustration() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      aria-hidden
      className="text-muted-foreground/70"
    >
      <rect
        x="10"
        y="16"
        width="32"
        height="24"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="var(--card)"
      />
      <rect
        x="14"
        y="10"
        width="32"
        height="24"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="var(--card)"
      />
      <path
        d="M30 17v10M25 22h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CaptionGenerator() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [style, setStyle] = useState("");
  const [showStyleInput, setShowStyleInput] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [copied, setCopied] = useState(false);

  const canSubmit = Boolean(videoFile) && !loading;

  const handleFile = useCallback((file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      setError("Harap unggah file video yang valid.");
      return;
    }
    setVideoFile(file);
    setError(null);
    setResult(null);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      handleFile(file ?? null);
    },
    [handleFile]
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!videoFile) return;

    const topicFromFile = videoFile.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
    const topic = style.trim()
      ? `${topicFromFile}. Gaya: ${style.trim()}`
      : topicFromFile;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Terjadi kesalahan. Coba lagi.");
        return;
      }

      setResult(data.content);
    } catch {
      setError("Gagal terhubung ke server. Periksa koneksi Anda.");
    } finally {
      setLoading(false);
    }
  }

  async function copyToClipboard() {
    if (!result) return;
    const text = `${result.caption}\n\n${result.hashtags.join(" ")}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div id="generator" className="w-full scroll-mt-28">
      <form onSubmit={handleSubmit} className="mx-auto w-full max-w-2xl">
        <div className="rounded-3xl border dark:border-zinc-800 border-zinc-300 bg-card shadow-2xl shadow-primary/20 p-3">
          <div
            role="button"
            tabIndex={0}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            className={cn(
              "flex min-h-[220px] cursor-pointer flex-col items-center justify-center gap-4 px-6 py-12 transition-colors md:min-h-[260px]",
              "rounded-2xl border border-dashed bg-muted/40",
              "border-zinc-400 dark:border-zinc-700",
              "hover:border-primary hover:bg-primary/10",
              isDragging && "bg-muted/70"
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            />

            {videoFile ? (
              <>
                <div className="flex size-14 items-center justify-center rounded-2xl bg-background shadow-sm">
                  <RiVideoLine className="size-7 text-muted-foreground" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground md:text-base">
                    {videoFile.name}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground md:text-sm">
                    Klik atau seret untuk mengganti video
                  </p>
                </div>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="50" height="50" fill="none"><path fill="currentColor" fillRule="evenodd" d="m9.91 16.88 3.136-.553a4.375 4.375 0 0 0 3.549-5.068l-1.15-6.519.774.137c1.7.3 2.835 1.92 2.535 3.62l-1.158 6.566a3.125 3.125 0 0 1-3.62 2.534z" clipRule="evenodd"></path><rect width="11.667" height="11.667" x="1.25" y="4.318" stroke="currentColor" strokeWidth="1.25" rx="2.5" transform="rotate(-10 1.25 4.318)"></rect><path fill="currentColor" d="M6.976 6.489a.417.417 0 0 1 .744-.131l.84 1.198c.056.08.138.138.233.164l1.414.38c.341.09.42.54.13.743l-1.198.84a.42.42 0 0 0-.163.233l-.38 1.414a.417.417 0 0 1-.743.13l-.84-1.198a.42.42 0 0 0-.234-.163l-1.413-.38a.417.417 0 0 1-.131-.743l1.198-.84a.42.42 0 0 0 .164-.233z"></path></svg>
                <p className="text-sm font-medium text-foreground/80 md:text-base">
                  Masukkan gambar konten
                </p>
              </>
            )}
          </div>

          <div className="flex flex-col gap-1 mt-3">
            {showStyleInput && (
              <div>
                <label htmlFor="style" className="sr-only">
                  Keterangan tambahan
                </label>
                <textarea
                  id="style"
                  rows={3}
                  autoFocus
                  placeholder="Contoh: casual, lucu, profesional, storytelling..."
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
              </div>
            )}

            <div className="flex items-center justify-between gap-3">
              <Button
                size="xs"
                variant="secondary"
                type="button"
                onClick={() => setShowStyleInput((prev) => !prev)}
                className="rounded-full text-[10px] tracking-wide py-4 border border-border"
              >
                <BiAddToQueue className="size-4" />
                Tambah keterangan
              </Button>

              <Button
                type="submit"
                size="xs"
                // disabled={!canSubmit}
                className="rounded-full font-normal text-[10px] py-4"
              >
                Buat Caption
                <BsArrowRightShort className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </form>

      {error && (
        <div className="mx-auto mt-4 max-w-2xl rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {result && (
        <div className="mx-auto mt-6 max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h3 className="text-sm font-semibold text-foreground">Caption Anda</h3>
            <button
              type="button"
              onClick={copyToClipboard}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            >
              {copied ? (
                <>
                  <RiCheckLine className="size-3.5 text-green-600 dark:text-green-400" />
                  Tersalin
                </>
              ) : (
                <>
                  <RiFileCopyLine className="size-3.5" />
                  Salin
                </>
              )}
            </button>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-foreground/80 md:text-base">
            {result.caption.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {result.hashtags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 dark:bg-sky-950/50 dark:text-sky-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
