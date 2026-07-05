import {
  RiInstagramLine,
  RiLinkedinBoxLine,
  RiTiktokLine,
  RiTwitterXLine,
  RiYoutubeLine,
} from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  product: {
    title: "Product",
    sections: [
      {
        heading: "FITUR",
        links: [
          "Buat caption",
          "Hashtag otomatis",
          "Hook generator",
          "CTA builder",
        ],
      },
      {
        heading: "MULAI",
        links: ["Gratis", "Coba sekarang", "Dokumentasi"],
      },
    ],
  },
  company: {
    title: "Company",
    sections: [
      {
        heading: "RESOURCES",
        links: ["Blog", "Pusat bantuan", "Tentang kami", "Kontak"],
      },
    ],
  },
  solutions: {
    title: "Solutions",
    sections: [
      {
        heading: "BISNIS",
        links: ["E-commerce", "UMKM", "Marketer", "Entrepreneur"],
      },
      {
        heading: "KREATOR",
        links: ["Beauty", "Edukasi", "Food", "Fitness", "Fashion"],
      },
    ],
  },
  useCases: {
    title: "Use Cases",
    sections: [
      {
        heading: "FORMAT",
        links: ["Feed post", "Reels caption", "Carousel", "Story text"],
      },
      {
        heading: "PLATFORM",
        links: ["Instagram", "TikTok", "Facebook", "LinkedIn"],
      },
    ],
  },
};

const socialLinks = [
  { icon: RiLinkedinBoxLine, label: "LinkedIn", href: "#" },
  { icon: RiTwitterXLine, label: "X", href: "#" },
  { icon: RiTiktokLine, label: "TikTok", href: "#" },
  { icon: RiInstagramLine, label: "Instagram", href: "#" },
  { icon: RiYoutubeLine, label: "YouTube", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-16 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div>
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={100}
              height={100}
              className="w-10 h-auto"
            />
            <div className="mt-6 flex gap-4">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="size-5" />
                </Link>
              ))}
            </div>
          </div>

          {Object.values(footerLinks).map((column) => (
            <div key={column.title}>
              <h3 className="font-serif-display text-lg text-foreground">{column.title}</h3>
              <div className="mt-4 space-y-5">
                {column.sections.map((section) => (
                  <div key={section.heading}>
                    <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                      {section.heading}
                    </p>
                    <ul className="mt-2 space-y-2">
                      {section.links.map((link) => (
                        <li key={link}>
                          <Link
                            href="#"
                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {link}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 CaptionAI. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
