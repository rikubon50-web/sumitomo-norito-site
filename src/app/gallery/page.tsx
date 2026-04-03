import type { Metadata } from "next";
import { getGalleryItems } from "@/lib/microcms";
import GalleryGrid from "@/components/ui/GalleryGrid";
import PageHeader from "@/components/ui/PageHeader";
import ContactCTA from "@/components/ui/ContactCTA";

export const metadata: Metadata = {
  title: "Gallery",
  description: "住友紀人のフォト・ビジュアルギャラリー",
};

export const revalidate = 60;

export default async function GalleryPage() {
  let items: Awaited<ReturnType<typeof getGalleryItems>>["contents"] = [];

  try {
    const res = await getGalleryItems({ limit: 50 });
    items = res.contents;
  } catch {
    // fallback
  }

  return (
    <>
      <PageHeader
        title="Gallery"
        subtitle="Visual Archive"
        description="写真・映像のアーカイブ。"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-section-sm lg:py-section">
        {items.length > 0 ? (
          <GalleryGrid items={items} />
        ) : (
          <p className="text-primary-500 text-center py-16">
            ギャラリーは準備中です。
          </p>
        )}
      </div>

      <div className="border-t border-white/5">
        <ContactCTA />
      </div>
    </>
  );
}
