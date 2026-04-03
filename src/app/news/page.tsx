import type { Metadata } from "next";
import { getPosts } from "@/lib/microcms";
import NewsList from "@/components/ui/NewsList";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "News",
  description: "住友紀人からのお知らせ",
};

export const revalidate = 60;

export default async function NewsPage() {
  let posts: Awaited<ReturnType<typeof getPosts>>["contents"] = [];

  try {
    const res = await getPosts("news", { limit: 50 });
    posts = res.contents;
  } catch {
    // fallback
  }

  return (
    <>
      <PageHeader
        title="News"
        subtitle="Information"
        description="お知らせ・最新情報。"
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-section-sm lg:py-section">
        <NewsList posts={posts} />
      </div>
    </>
  );
}
