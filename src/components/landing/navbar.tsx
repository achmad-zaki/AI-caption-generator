"use client";

import { authClient } from "@/lib/auth-client";
import { RiCloseLine, RiMenuLine } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "../theme-toggle";
import { Button, buttonVariants } from "../ui/button";
import { UserMenu } from "../user-menu";
import DialogAuth from "./dialog-auth";

const navLinks = [
  { label: "Fitur", href: "#fitur" },
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "Statistik", href: "#statistik" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = authClient.useSession();

  return (
    <>
      <header className="fixed top-0 z-50 w-full px-4 pt-4 md:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-border
         bg-background/70 px-4 py-3 shadow-lg backdrop-blur-md md:px-6">
          <Link href="/">
            <div className="flex items-center gap-1.5">
              <Image
                src="/images/logo.svg"
                alt="Logo"
                width={100}
                height={100}
                className="h-auto w-6"
              />
              <span className="text-lg font-semibold tracking-tight text-foreground">
                Caption<span className="text-primary">AI</span>
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />

            <UserMenu />

            <Button
              size="icon-lg"
              variant="outline"
              className="md:hidden rounded-full"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              {mobileOpen ? (
                <RiCloseLine className="size-4" />
              ) : (
                <RiMenuLine className="size-4" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <>
          <button
            type="button"
            aria-label="Tutup menu"
            className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-[2px] md:hidden"
            onClick={() => setMobileOpen(false)}
          />

          <div className="fixed inset-x-4 top-21 z-50 rounded-2xl border border-border bg-background/95 p-4 shadow-xl backdrop-blur-md md:hidden">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-4 py-3 text-sm text-foreground transition-colors hover:bg-muted"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#generator"
                className="mt-1 rounded-full border border-foreground px-4 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-muted"
                onClick={() => setMobileOpen(false)}
              >
                Mulai gratis
              </Link>
              {!session && (
                <div className="mt-2" onClick={() => setMobileOpen(false)}>
                  <DialogAuth triggerClassName="w-full rounded-full" />
                </div>
              )}
              {session?.user.role === "superadmin" && (
                <Link
                  href="/admin"
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                    className: "mt-2 w-full rounded-full",
                  })}
                  onClick={() => setMobileOpen(false)}
                >
                  Panel Admin
                </Link>
              )}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
