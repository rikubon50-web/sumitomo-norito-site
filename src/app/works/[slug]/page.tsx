import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWorkBySlug, getWorks } from "@/lib/microcms";
import RichTextRenderer from "@/components/ui/RichTextRenderer";
import ContactCTA from "@/components/ui/ContactCTA";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const work = await getWorkBySlug(params.slug);
  if (!work) return { title: "Not Found" };

  return {
    title: work.title,
    description: work.excerpt || `${work.title} - 住友紀人`,
    openGraph: {
      title: work.title,
      description: work.excerpt || `${work.title} - 住友紀人`,
      images: work.coverImage
        ? [{ url: work.coverImage.url }]
        : work.thumbnail
          ? [{ url: work.thumbnail.url }]
          : [],
    },
  };
}

export async function generateStaticParams() {
  try {
    const res = await getWorks({ limit: 100, fields: "slug" });
    return res.contents.map((work) => ({ slug: work.slug }));
  } catch {
    return [];
  }
}

export const revalidate = 60;

export default async function WorkDetailPage({ params }: Props) {
  const work = await getWorkBySlug(params.slug);
  if (!work) notFound();

  return (
    <>
      {/* Cover Image */}
      {work.coverImage && (
        <div className="relative w-full h-[50vh] lg:h-[60vh] mt-16 lg:mt-20">
          <Image
            src={work.coverImage.url}
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
        {/* Header */}
        <header className={work.coverImage ? "" : "pt-12 lg:pt-16"}>
          <div className="flex items-center gap-4 mb-4">
            {work.year && (
              <span className="text-sm text-primary-500">{work.year}</span>
            )}
            {work.category && work.category.length > 0 && (
              <span className="text-sm text-primary-500">
                {work.category.join(", ")}
              </span>
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

        {/* Body */}
        {work.body && (
          <div className="mt-12">
            <RichTextRenderer html={work.body} />
          </div>
        )}

        {/* Video */}
        {work.videoUrl && (
          <div className="mt-12">
            <h2 className="font-display text-xl text-white mb-6">Video</h2>
            <div className="aspect-video bg-primary-900 overflow-hidden rounded-lg">
              <iframe
                src={work.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={work.title}
              />
            </div>
          </div>
        )}

        {/* Gallery Images */}
        {work.galleryImages && work.galleryImages.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-xl text-white mb-6">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {work.galleryImages.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-[3/2] overflow-hidden bg-primary-900"
                >
                  <Image
                    src={img.url}
                    alt={`${work.title} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Links */}
        {work.relatedLinks && work.relatedLinks.length > 0 && (
          <div className="mt-12 pt-8 border-t border-white/5">
            <h2 className="font-display text-xl text-white mb-4">Links</h2>
            <ul className="flex flex-col gap-3">
              {work.relatedLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-300 hover:text-white transition-colors underline underline-offset-4"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        {work.tags && work.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {work.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs text-primary-400 border border-white/10 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Back */}
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
