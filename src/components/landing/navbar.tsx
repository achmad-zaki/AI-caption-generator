"use client";

import { RiCloseLine, RiMenuLine } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";

const navLinks = [
  { label: "Generator", href: "#generator" },
  { label: "Cara Kerja", href: "#cara-kerja" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMobileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 z-50 w-full px-4 pt-4 md:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-border bg-background/70 px-4 py-3 shadow-lg backdrop-blur-md md:px-6">
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

          <div ref={menuRef} className="relative md:hidden">
            <Button
              size="icon-lg"
              variant="outline"
              className="rounded-full"
              aria-expanded={mobileOpen}
              aria-haspopup="menu"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              {mobileOpen ? (
                <RiCloseLine className="size-4" />
              ) : (
                <RiMenuLine className="size-4" />
              )}
            </Button>

            {mobileOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 min-w-44 rounded-xl border border-border bg-background p-1.5 shadow-lg"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    role="menuitem"
                    className="block rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
