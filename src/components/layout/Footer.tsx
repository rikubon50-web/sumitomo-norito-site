import Link from "next/link";
import type { SiteSettings } from "@/types/microcms";

type Props = {
  settings?: SiteSettings | null;
};

const FOOTER_NAV = [
  { href: "/profile", label: "Profile" },
  { href: "/works", label: "Works" },
  { href: "/schedule", label: "Schedule" },
  { href: "/blog", label: "Blog" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export default function Footer({ settings }: Props) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-primary-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Branding */}
          <div>
            <Link
              href="/"
              className="font-display text-xl text-white tracking-wider"
            >
              Norihito Sumitomo
            </Link>
            {settings?.footerText && (
              <p className="mt-4 text-sm text-primary-500 leading-relaxed">
                {settings.footerText}
              </p>
            )}
          </div>

          {/* Navigation */}
          <nav>
            <h3 className="text-xs uppercase tracking-[0.2em] text-primary-500 mb-4">
              Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-primary-600">
            &copy; {currentYear} Norihito Sumitomo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
