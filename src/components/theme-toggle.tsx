"use client";

import { Button } from "@/components/ui/button";
import { RiMoonLine, RiSunLine } from "@remixicon/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button size="icon-sm" variant="outline" aria-label="Ganti tema" disabled />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      size="icon-lg"
      variant="outline"
      className="rounded-full"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <RiSunLine className="size-4" /> : <RiMoonLine className="size-4" />}
    </Button>
  );
}
