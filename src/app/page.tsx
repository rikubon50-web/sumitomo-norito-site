import Link from "next/link";
import Hero from "@/components/sections/Hero";
import SectionTitle from "@/components/ui/SectionTitle";
import WorkCard from "@/components/ui/WorkCard";
import NewsList from "@/components/ui/NewsList";
import ContactCTA from "@/components/ui/ContactCTA";
import {
  getSiteSettings,
  getProfile,
  getFeaturedWorks,
  getPosts,
} from "@/lib/microcms";
import type { Post } from "@/types/microcms";
import { formatDateShort } from "@/lib/utils";

export const revalidate = 60;

export default async function HomePage() {
  const [settings, profile, worksRes, blogRes, newsRes] =
    await Promise.allSettled([
      getSiteSettings(),
      getProfile(),
      getFeaturedWorks(6),
      getPosts("blog", { limit: 5 }),
      getPosts("news", { limit: 5 }),
    ]);

  const siteSettings =
    settings.status === "fulfilled" ? settings.value : null;
  const profileData =
    profile.status === "fulfilled" ? profile.value : null;
  const featuredWorks =
    worksRes.status === "fulfilled" ? worksRes.value.contents : [];
  const latestBlog =
    blogRes.status === "fulfilled" ? blogRes.value.contents : [];
  const latestNews =
    newsRes.status === "fulfilled" ? newsRes.value.contents : [];

  return (
    <>
      {/* Hero */}
      <Hero
        imageUrl={profileData?.mainVisual?.url}
        catchCopy={siteSettings?.heroCatch || ""}
        name={profileData?.name}
        englishName={profileData?.englishName}
      />

      {/* Featured Works */}
      {featuredWorks.length > 0 && (
        <section className="py-section-sm lg:py-section border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <SectionTitle title="Works" subtitle="Selected Projects" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {featuredWorks.map((work) => (
                <WorkCard key={work.id} work={work} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/works"
                className="inline-block px-10 py-4 border border-white/20 text-white text-sm tracking-wider uppercase hover:bg-white hover:text-primary-950 transition-all duration-500"
              >
                View All Works
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Blog */}
      {latestBlog.length > 0 && (
        <section className="py-section-sm lg:py-section border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <SectionTitle title="Blog" subtitle="Latest Articles" />
            <BlogList posts={latestBlog} />
            <div className="mt-8 text-center">
              <Link
                href="/blog"
                className="text-sm text-primary-400 hover:text-white transition-colors tracking-wider uppercase"
              >
                View All Articles →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* News */}
      {latestNews.length > 0 && (
        <section className="py-section-sm lg:py-section border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <SectionTitle title="News" subtitle="Information" />
            <NewsList posts={latestNews} showMore />
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <div className="border-t border-white/5">
        <ContactCTA />
      </div>
    </>
  );
}

/** News と同じリスト形式の Blog 一覧 */
function BlogList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  return (
    <ul className="divide-y divide-white/5">
      {posts.map((post) => {
        const dateStr = post.publishedAt || post.createdAt;
        return (
          <li key={post.id}>
            <Link
              href={`/blog/${post.slug}`}
              className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-5 group"
            >
              <time className="text-xs text-primary-500 shrink-0 w-28">
                {formatDateShort(dateStr)}
              </time>
              <span className="text-primary-200 group-hover:text-white transition-colors leading-relaxed">
                {post.title}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
