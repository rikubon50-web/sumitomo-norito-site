import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWorkById, getWorks } from "@/lib/microcms";
import { toYouTubeEmbedUrl } from "@/lib/utils";
import RichTextRenderer from "@/components/ui/RichTextRenderer";
import ContactCTA from "@/components/ui/ContactCTA";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const work = await getWorkById(params.id);
  if (!work) return { title: "Not Found" };

  return {
    title: work.title,
    description: work.excerpt || `${work.title} - 住友紀人`,
    openGraph: {
      title: work.title,
      description: work.excerpt || `${work.title} - 住友紀人`,
      images: work.thumbnail ? [{ url: work.thumbnail.url }] : [],
    },
  };
}

export async function generateStaticParams() {
  try {
    const res = await getWorks({ limit: 100 });
    return res.contents.map((work) => ({ id: work.id }));
  } catch {
    return [];
  }
}

export const revalidate = 60;

export default async function WorkDetailPage({ params }: Props) {
  const work = await getWorkById(params.id);
  if (!work) notFound();

  return (
    <>
      {work.thumbnail && (
        <div className="relative w-full h-[50vh] lg:h-[60vh] mt-16 lg:mt-20">
          <Image
            src={work.thumbnail.url}
            alt={work.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-transparent to-transparent" />
        </div>
      )}

      <article className="max-w-4xl mx-auto px-6 lg:px-12 py-section-sm lg:py-section">
        <header className={work.thumbnail ? "" : "pt-12 lg:pt-16"}>
          <div className="flex items-center gap-4 mb-4">
            {work.year && (
              <span className="text-sm text-primary-500">{work.year}</span>
            )}
          </div>
          <h1 className="font-display text-display-sm lg:text-display-md text-white tracking-wide">
            {work.title}
          </h1>
          {work.role && (
            <p className="mt-4 text-primary-400">
              <span className="text-xs uppercase tracking-wider text-primary-600 mr-3">
                Role
              </span>
              {work.role}
            </p>
          )}
          <div className="mt-8 h-px w-16 bg-primary-600" />
        </header>

        {work.body && (
          <div className="mt-12">
            <RichTextRenderer html={work.body} />
          </div>
        )}

        {work.videoUrl && (
          <div className="mt-12">
            <h2 className="font-display text-xl text-white mb-6">Video</h2>
            <div className="aspect-video bg-primary-900 overflow-hidden rounded-lg">
              <iframe
                src={toYouTubeEmbedUrl(work.videoUrl)}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={work.title}
              />
            </div>
          </div>
        )}

        {work.galleryImages && work.galleryImages.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-xl text-white mb-6">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {work.galleryImages.map((img, i) => (
                <Image
                  key={i}
                  src={img.url}
                  alt={`${work.title} ${i + 1}`}
                  width={img.width ?? 800}
                  height={img.height ?? 600}
                  className="w-full h-auto"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-16">
          <Link
            href="/works"
            className="text-sm text-primary-500 hover:text-white transition-colors tracking-wider uppercase"
          >
            ← Back to Works
          </Link>
        </div>
      </article>

      <div className="border-t border-white/5">
        <ContactCTA />
      </div>
    </>
  );
}
