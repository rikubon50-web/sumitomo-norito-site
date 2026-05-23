import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/microcms";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { Cormorant_Garamond, Noto_Sans_JP } from "next/font/google";

// フォントを self-host（render-blocking な Google Fonts @import を排除）
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
  preload: false, // CJKの大容量フォントの過剰preloadを避ける
});

export async function generateMetadata(): Promise<Metadata> {
  // 全ページ共通の土台（OGP・canonical の絶対URL化、Search Console 認証など）
  const base: Metadata = {
    metadataBase: new URL(SITE_URL),
    verification: {
      // Search Console の「HTMLタグ」認証コードを環境変数で設定
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
    openGraph: {
      siteName: SITE_NAME,
      locale: "ja_JP",
      type: "website",
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };

  try {
    const settings = await getSiteSettings();
    const title = settings.siteTitle || "Norihito Sumitomo";
    const description = settings.siteDescription || "住友紀人 オフィシャルサイト";
    return {
      ...base,
      title: { default: title, template: `%s | ${title}` },
      description,
      openGraph: {
        ...base.openGraph,
        title,
        description,
        url: SITE_URL,
        images: settings.ogImage ? [{ url: settings.ogImage.url }] : undefined,
      },
    };
  } catch {
    return {
      ...base,
      title: { default: "Norihito Sumitomo", template: "%s | Norihito Sumitomo" },
      description: "住友紀人 オフィシャルサイト",
    };
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let settings = null;
  try {
    settings = await getSiteSettings();
  } catch {
    // CMS 未設定時はフォールバック
  }

  return (
    <html lang="ja" className={`${notoSansJP.variable} ${cormorant.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
