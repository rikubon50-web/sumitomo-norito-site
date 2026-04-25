import type { Metadata } from "next";
import { getNewsPosts } from "@/lib/microcms";
import NewsList from "@/components/ui/NewsList";
import PageHeader from "@/components/ui/PageHeader";
import ContactCTA from "@/components/ui/ContactCTA";

export const metadata: Metadata = {
  title: "News",
  description: "住友紀人からのお知らせ",
};

export const revalidate = 60;

export default async function NewsPage() {
  let posts: Awaited<ReturnType<typeof getNewsPosts>>["contents"] = [];

  try {
    const res = await getNewsPosts({ limit: 50 });
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

      <div className="border-t border-white/5">
        <ContactCTA />
      </div>
    </>
  );
}
