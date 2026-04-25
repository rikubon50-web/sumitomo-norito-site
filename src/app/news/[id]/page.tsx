import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostById, getPosts } from "@/lib/microcms";
import RichTextRenderer from "@/components/ui/RichTextRenderer";
import { formatDate } from "@/lib/utils";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostById(params.id);
  if (!post) return { title: "Not Found" };

  return {
    title: post.title,
    description: post.excerpt || `${post.title} - お知らせ`,
  };
}

export async function generateStaticParams() {
  try {
    const res = await getPosts("news", { limit: 100 });
    return res.contents.map((post) => ({ id: post.id }));
  } catch {
    return [];
  }
}

export const revalidate = 60;

export default async function NewsDetailPage({ params }: Props) {
  const post = await getPostById(params.id);
  if (!post) notFound();

  const dateStr = post.publishedAt || post.createdAt;

  return (
    <article className="pt-12 lg:pt-16 pb-section-sm lg:pb-section">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <header>
          <time className="text-sm text-primary-500">{formatDate(dateStr)}</time>
          <h1 className="mt-3 font-display text-display-sm lg:text-display-md text-white tracking-wide leading-tight">
            {post.title}
          </h1>
          <div className="mt-8 h-px w-full bg-white/5" />
        </header>

        {post.body && (
          <div className="mt-10">
            <RichTextRenderer html={post.body} />
          </div>
        )}

        {post.externalUrl && (
          <div className="mt-8 p-6 border border-white/10 bg-primary-900/30">
            <p className="text-xs uppercase tracking-wider text-primary-500 mb-2">
              External Link
            </p>
            <a
              href={post.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-200 hover:text-white underline underline-offset-4 transition-colors break-all"
            >
              {post.externalUrl}
            </a>
          </div>
        )}

        <div className="mt-16">
          <Link
            href="/news"
            className="text-sm text-primary-500 hover:text-white transition-colors tracking-wider uppercase"
          >
            ← Back to News
          </Link>
        </div>
      </div>
    </article>
  );
}
