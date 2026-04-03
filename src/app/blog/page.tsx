import type { Metadata } from "next";
import { getPosts } from "@/lib/microcms";
import PostCard from "@/components/ui/PostCard";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Blog",
  description: "住友紀人のブログ記事一覧",
};

export const revalidate = 60;

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof getPosts>>["contents"] = [];

  try {
    const res = await getPosts("blog", { limit: 30 });
    posts = res.contents;
  } catch {
    // fallback
  }

  return (
    <>
      <PageHeader
        title="Blog"
        subtitle="Articles"
        description="日々の考えや活動について。"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-section-sm lg:py-section">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} basePath="blog" />
            ))}
          </div>
        ) : (
          <p className="text-primary-500 text-center py-16">
            記事は準備中です。
          </p>
        )}
      </div>
    </>
  );
}
