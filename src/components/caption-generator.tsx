"use client";

import { cn } from "@/lib/utils";
import {
  RiAlertLine,
  RiCheckLine,
  RiFileCopyLine,
  RiRefreshLine,
} from "@remixicon/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { BsArrowRightShort } from "react-icons/bs";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";
import { Textarea } from "./ui/textarea";

export type GenerateResult = {
  caption: string;
  hashtags: string[];
};

export function CaptionGenerator() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const STYLE_PRESETS = [
    { label: "Casual", value: "casual dan santai" },
    { label: "Lucu", value: "lucu dan humoris" },
    { label: "Inspiratif", value: "inspiratif dan memotivasi" },
    { label: "Profesional", value: "profesional dan formal" },
    { label: "Storytelling", value: "storytelling yang mengalir" },
    { label: "Promosi", value: "promosi produk yang menarik" },
  ];

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [customStyle, setCustomStyle] = useState("");
  const [additionalText, setAdditionalText] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!imageFile) return;
    const url = URL.createObjectURL(imageFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const handleFile = useCallback((file: File | null) => {
    setImageFile(file);
    setError(null);
    setResult(null);
  }, []);

  const combinedStyle = [selectedStyle, customStyle.trim()].filter(Boolean).join(", ");

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      handleFile(file ?? null);
    },
    [handleFile]
  );

  const generateCaption = useCallback(async () => {
    if (!imageFile) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setCopied(false);

    try {
      const imageBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result !== "string") {
            reject(new Error("Gagal membaca gambar"));
            return;
          }
          resolve(reader.result);
        };
        reader.onerror = () => reject(new Error("Gagal membaca gambar"));
        reader.readAsDataURL(imageFile);
      });

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64,
          ...(combinedStyle && { style: combinedStyle }),
          ...(additionalText.trim() && { additionalText: additionalText.trim() }),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Terjadi kesalahan. Coba lagi.");
        return;
      }

      const content = data.content;
      setResult(
        typeof content === "string"
          ? { caption: content, hashtags: [] }
          : content
      );
    } catch {
      setError("Gagal terhubung ke server. Periksa koneksi Anda.");
    } finally {
      setLoading(false);
    }
  }, [imageFile, combinedStyle, additionalText]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await generateCaption();
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
        <div className="rounded-3xl border dark:border-zinc-800 border-zinc-300 bg-card shadow-[0_0_90px_rgba(0,0,0,0.8)] shadow-primary/30 p-3">
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
              "relative flex min-h-[220px] cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden px-6 py-12 transition-colors md:min-h-[260px]",
              "rounded-2xl border border-dashed bg-muted/40",
              "border-zinc-400 dark:border-zinc-700",
              !previewUrl && "hover:bg-muted",
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
            {previewUrl ? (
              <>
                <img
                  src={previewUrl}
                  alt="Preview gambar"
                  className="absolute inset-0 size-full object-contain p-4"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/60 opacity-0 transition-opacity hover:opacity-100">
                  <p className="text-sm font-medium text-foreground">
                    Klik untuk ganti gambar
                  </p>
                  {imageFile && (
                    <p className="max-w-[80%] truncate text-xs text-muted-foreground">
                      {imageFile.name}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="relative flex flex-col items-center justify-center gap-2">
                <svg className="text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="50" height="50" fill="none"><path fill="currentColor" fillRule="evenodd" d="m9.91 16.88 3.136-.553a4.375 4.375 0 0 0 3.549-5.068l-1.15-6.519.774.137c1.7.3 2.835 1.92 2.535 3.62l-1.158 6.566a3.125 3.125 0 0 1-3.62 2.534z" clipRule="evenodd"></path><rect width="11.667" height="11.667" x="1.25" y="4.318" stroke="currentColor" strokeWidth="1.25" rx="2.5" transform="rotate(-10 1.25 4.318)"></rect><path fill="currentColor" d="M6.976 6.489a.417.417 0 0 1 .744-.131l.84 1.198c.056.08.138.138.233.164l1.414.38c.341.09.42.54.13.743l-1.198.84a.42.42 0 0 0-.163.233l-.38 1.414a.417.417 0 0 1-.743.13l-.84-1.198a.42.42 0 0 0-.234-.163l-1.413-.38a.417.417 0 0 1-.131-.743l1.198-.84a.42.42 0 0 0 .164-.233z"></path></svg>
                <p className="text-sm font-medium text-muted-foreground">
                  Masukkan gambar konten
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 mt-3">
            {showOptions && (
              <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-muted/30 p-3">
                <div>
                  <p className="mb-2 text-[11px] font-medium text-muted-foreground">Gaya penulisan</p>
                  <div className="flex flex-wrap gap-1">
                    {STYLE_PRESETS.map((preset) => (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() =>
                          setSelectedStyle((prev) =>
                            prev === preset.value ? "" : preset.value
                          )
                        }
                        className={cn(
                          "rounded-full border px-3 py-1 text-[11px] font-medium transition-colors",
                          selectedStyle === preset.value
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground hover:bg-muted"
                        )}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                  <Input
                    type="text"
                    placeholder="Atau tulis gaya sendiri, contoh: puitis, minimalis..."
                    value={customStyle}
                    onChange={(e) => setCustomStyle(e.target.value)}
                    disabled={!!selectedStyle}
                    className={cn(
                      "mt-2 transition-opacity",
                      selectedStyle && "cursor-not-allowed opacity-40"
                    )}
                  />
                </div>
                <div>
                  <p className="mb-2 text-[11px] font-medium text-muted-foreground">Konteks tambahan <span className="font-normal">(opsional)</span></p>
                  <Textarea
                    rows={2}
                    placeholder="Contoh: foto produk baru kami, liburan ke Bali, acara ulang tahun sahabat..."
                    value={additionalText}
                    onChange={(e) => setAdditionalText(e.target.value)}
                    className="placeholder:text-xs text-xs"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between gap-2">
              <Button
                size="sm"
                variant="secondary"
                type="button"
                onClick={() => setShowOptions((prev) => !prev)}
                className={cn(
                  "rounded-full text-[10px] py-3.5 border border-border",
                  showOptions && "bg-muted"
                )}
              >
                <BiAddToQueue />
                {showOptions ? "Sembunyikan opsi" : "Tambah konteks"}
              </Button>

              <Button
                type="submit"
                size="sm"
                disabled={!imageFile || loading}
                className="rounded-full py-3.5 text-[10px]"
              >
                {loading && <Spinner />}
                {loading ? "Memproses..." : "Buat Caption"}
                {!loading && <BsArrowRightShort className="size-4" />}
              </Button>
            </div>
          </div>
        </div>
        {error && (
          <Alert variant="destructive" className="mt-3">
            <RiAlertLine />
            <AlertTitle>Terjadi kesalahan</AlertTitle>
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}
      </form>

      {loading && (
        <div
          className="mx-auto mt-6 max-w-2xl rounded-3xl border border-border bg-card p-6 md:p-8"
          aria-busy="true"
          aria-label="Sedang membuat caption"
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="h-4 w-28 animate-pulse rounded-md bg-muted" />
            <div className="h-8 w-20 animate-pulse rounded-full bg-muted" />
          </div>

          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-[92%] animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-[85%] animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-[70%] animate-pulse rounded-md bg-muted" />
            <div className="mt-2 h-4 w-full animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-[88%] animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-[60%] animate-pulse rounded-md bg-muted" />
          </div>

          <div className="mt-14 flex flex-wrap gap-2.5">
            {[72, 96, 64, 88, 56, 80].map((width) => (
              <div
                key={width}
                className="h-7 animate-pulse rounded-full bg-muted"
                style={{ width }}
              />
            ))}
          </div>
        </div>
      )}

      {result && !loading && (
        <div className="mx-auto mt-6 max-w-2xl rounded-3xl border border-border bg-card p-6 md:p-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h3 className="text-sm font-semibold text-foreground">Caption Anda</h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={generateCaption}
                disabled={!imageFile || loading}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
              >
                <RiRefreshLine className="size-3.5" />
                Generate ulang
              </button>
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
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-foreground/80 md:text-base">
            {result.caption.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap gap-2.5">
            {result.hashtags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
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
