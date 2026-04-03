import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/sections/Hero";
import SectionTitle from "@/components/ui/SectionTitle";
import WorkCard from "@/components/ui/WorkCard";
import PostCard from "@/components/ui/PostCard";
import NewsList from "@/components/ui/NewsList";
import ContactCTA from "@/components/ui/ContactCTA";
import {
  getSiteSettings,
  getProfile,
  getFeaturedWorks,
  getPosts,
  getFeaturedGalleryItems,
} from "@/lib/microcms";

export const revalidate = 60;

export default async function HomePage() {
  // 並列でデータ取得
  const [settings, profile, worksRes, blogRes, newsRes, galleryRes] =
    await Promise.allSettled([
      getSiteSettings(),
      getProfile(),
      getFeaturedWorks(6),
      getPosts("blog", { limit: 3 }),
      getPosts("news", { limit: 5 }),
      getFeaturedGalleryItems(8),
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
  const galleryItems =
    galleryRes.status === "fulfilled" ? galleryRes.value.contents : [];

  return (
    <>
      {/* ========================================
          Hero Section
          ======================================== */}
      <Hero
        imageUrl={profileData?.mainVisual?.url}
        catchCopy={siteSettings?.heroCatch || ""}
        subCatch={siteSettings?.heroSubCatch}
        name={profileData?.name}
        englishName={profileData?.englishName}
      />

      {/* ========================================
          Intro Section
          ======================================== */}
      {profileData?.shortBio && (
        <section className="py-section-sm lg:py-section">
          <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
            <p className="text-lg lg:text-xl text-primary-300 leading-relaxed font-light">
              {profileData.shortBio}
            </p>
            <Link
              href="/profile"
              className="inline-block mt-8 text-sm text-primary-500 hover:text-white transition-colors tracking-wider uppercase"
            >
              Read More →
            </Link>
          </div>
        </section>
      )}

      {/* ========================================
          Featured Works
          ======================================== */}
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
                className="
                  inline-block px-10 py-4
                  border border-white/20 text-white text-sm tracking-wider uppercase
                  hover:bg-white hover:text-primary-950
                  transition-all duration-500
                "
              >
                View All Works
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ========================================
          Gallery Preview
          ======================================== */}
      {galleryItems.length > 0 && (
        <section className="py-section-sm lg:py-section border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <SectionTitle title="Gallery" subtitle="Visual Archive" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="relative aspect-square overflow-hidden bg-primary-900"
                >
                  {item.thumbnail && (
                    <Image
                      src={item.thumbnail.url}
                      alt={item.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/gallery"
                className="text-sm text-primary-400 hover:text-white transition-colors tracking-wider uppercase"
              >
                View Gallery →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ========================================
          Latest Blog
          ======================================== */}
      {latestBlog.length > 0 && (
        <section className="py-section-sm lg:py-section border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <SectionTitle title="Blog" subtitle="Latest Articles" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {latestBlog.map((post) => (
                <PostCard key={post.id} post={post} basePath="blog" />
              ))}
            </div>
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

      {/* ========================================
          Latest News
          ======================================== */}
      {latestNews.length > 0 && (
        <section className="py-section-sm lg:py-section border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <SectionTitle title="News" subtitle="Information" />
            <NewsList posts={latestNews} showMore />
          </div>
        </section>
      )}

      {/* ========================================
          Contact CTA
          ======================================== */}
      <div className="border-t border-white/5">
        <ContactCTA />
      </div>
    </>
  );
}
