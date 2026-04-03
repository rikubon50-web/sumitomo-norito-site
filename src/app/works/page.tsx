import type { Metadata } from "next";
import { getWorks } from "@/lib/microcms";
import WorkCard from "@/components/ui/WorkCard";
import PageHeader from "@/components/ui/PageHeader";
import ContactCTA from "@/components/ui/ContactCTA";

export const metadata: Metadata = {
  title: "Works",
  description: "住友紀人の実績・作品一覧",
};

export const revalidate = 60;

export default async function WorksPage() {
  let works: Awaited<ReturnType<typeof getWorks>>["contents"] = [];

  try {
    const res = await getWorks({ limit: 50 });
    works = res.contents;
  } catch {
    // fallback
  }

  return (
    <>
      <PageHeader
        title="Works"
        subtitle="Projects"
        description="これまでの実績・作品をご紹介します。"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-section-sm lg:py-section">
        {works.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {works.map((work) => (
              <WorkCard key={work.id} work={work} />
            ))}
          </div>
        ) : (
          <p className="text-primary-500 text-center py-16">
            作品は準備中です。
          </p>
        )}
      </div>

      <div className="border-t border-white/5">
        <ContactCTA />
      </div>
    </>
  );
}
