import type { Metadata } from "next";
import Image from "next/image";
import { getProfile } from "@/lib/microcms";
import RichTextRenderer from "@/components/ui/RichTextRenderer";
import PageHeader from "@/components/ui/PageHeader";
import ContactCTA from "@/components/ui/ContactCTA";

export const metadata: Metadata = {
  title: "Profile",
  description: "住友紀人のプロフィール・経歴・実績",
};

export const revalidate = 60;

export default async function ProfilePage() {
  let profile = null;
  try {
    profile = await getProfile();
  } catch {
    // fallback
  }

  if (!profile) {
    return (
      <>
        <PageHeader title="Profile" subtitle="About" />
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-section-sm">
          <p className="text-primary-500">プロフィール情報は準備中です。</p>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Profile"
        subtitle="About"
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-section-sm lg:py-section">
        {/* Main Visual + Short Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Photo */}
          {profile.profileImage && (
            <Image
              src={profile.profileImage.url}
              alt={profile.name}
              width={profile.profileImage.width ?? 800}
              height={profile.profileImage.height ?? 1000}
              className="w-full h-auto"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          )}

          {/* Bio */}
          <div className="lg:pt-8">
            <p className="text-xs uppercase tracking-[0.3em] text-primary-500 mb-3">
              {profile.englishName || "Norihito Sumitomo"}
            </p>
            <h2 className="font-display text-display-sm text-white mb-8">
              {profile.name}
            </h2>

            {profile.longBio && (
              <div className="text-primary-400 leading-relaxed whitespace-pre-wrap">
                {profile.longBio}
              </div>
            )}
          </div>
        </div>

        {/* Career */}
        {profile.career && (
          <section className="mt-section-sm lg:mt-section pt-section-sm border-t border-white/5">
            <h2 className="font-display text-display-sm text-white mb-8 tracking-wide">
              Career
            </h2>
            <RichTextRenderer html={profile.career} />
          </section>
        )}

        {/* Achievements */}
        {profile.achievements && (
          <section className="mt-section-sm lg:mt-section pt-section-sm border-t border-white/5">
            <h2 className="font-display text-display-sm text-white mb-8 tracking-wide">
              Achievements
            </h2>
            <RichTextRenderer html={profile.achievements} />
          </section>
        )}
      </div>

      <div className="border-t border-white/5">
        <ContactCTA />
      </div>
    </>
  );
}
