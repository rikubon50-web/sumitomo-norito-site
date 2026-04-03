import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@/lib/microcms";
import RichTextRenderer from "@/components/ui/RichTextRenderer";
import { formatDate } from "@/lib/utils";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug, "blog");
  if (!post) return { title: "Not Found" };

  return {
    title: post.title,
    description: post.excerpt || `${post.title} - 住友紀人`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `${post.title} - 住友紀人`,
      images: post.thumbnail ? [{ url: post.thumbnail.url }] : [],
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  try {
    const res = await getPosts("blog", { limit: 100, fields: "slug" });
    return res.contents.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export const revalidate = 60;

export default async function BlogDetailPage({ params }: Props) {
  const post = await getPostBySlug(params.slug, "blog");
  if (!post) notFound();

  const dateStr = post.publishedAt || post.createdAt;

  return (
    <article className="pt-32 lg:pt-40 pb-section-sm lg:pb-section">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <header>
          <time className="text-sm text-primary-500">{formatDate(dateStr)}</time>
          <h1 className="mt-3 font-display text-display-sm lg:text-display-md text-white tracking-wide leading-tight">
            {post.title}
          </h1>
          {post.category && post.category.length > 0 && (
            <div className="mt-4 flex gap-2">
              {post.category.map((cat, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs text-primary-400 border border-white/10 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
          <div className="mt-8 h-px w-full bg-white/5" />
        </header>

        {/* Thumbnail */}
        {post.thumbnail && (
          <div className="mt-8 relative aspect-[16/9] overflow-hidden bg-primary-900">
            <Image
              src={post.thumbnail.url}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        {/* Body */}
        {post.body && (
          <div className="mt-10">
            <RichTextRenderer html={post.body} />
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap gap-2">
            {post.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs text-primary-500 border border-white/10 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Back */}
        <div className="mt-16">
          <Link
            href="/blog"
            className="text-sm text-primary-500 hover:text-white transition-colors tracking-wider uppercase"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    </article>
  );
}
