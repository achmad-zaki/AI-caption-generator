import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
        <p>© 2026 CaptionAI. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-foreground">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-foreground">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
