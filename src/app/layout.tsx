import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/microcms";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSiteSettings();
    return {
      title: {
        default: settings.siteTitle || "Norihito Sumitomo",
        template: `%s | ${settings.siteTitle || "Norihito Sumitomo"}`,
      },
      description: settings.siteDescription || "住友紀人 オフィシャルサイト",
      openGraph: {
        title: settings.siteTitle || "Norihito Sumitomo",
        description: settings.siteDescription || "住友紀人 オフィシャルサイト",
        images: settings.ogImage ? [{ url: settings.ogImage.url }] : [],
        type: "website",
      },
    };
  } catch {
    return {
      title: {
        default: "Norihito Sumitomo",
        template: "%s | Norihito Sumitomo",
      },
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
    <html lang="ja">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16 lg:pt-20">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
