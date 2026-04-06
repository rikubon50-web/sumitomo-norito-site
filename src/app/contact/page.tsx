import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/microcms";
import PageHeader from "@/components/ui/PageHeader";
import { getSnsIcon } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: "住友紀人へのお問い合わせ",
};

export const revalidate = 60;

export default async function ContactPage() {
  let settings = null;
  try {
    settings = await getSiteSettings();
  } catch {
    // fallback
  }

  return (
    <>
      <PageHeader
        title="Contact"
        subtitle="Get in Touch"
      />

      <div className="max-w-3xl mx-auto px-6 lg:px-12 py-section-sm lg:py-section">
        <div className="space-y-16">
          {/* Email */}
          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] text-primary-500 mb-4">
              Email
            </h2>
            <a
              href={`mailto:${settings?.contactEmail || "noripiton@gmail.com"}`}
              className="text-xl lg:text-2xl text-white hover:text-primary-300 transition-colors font-light tracking-wide"
            >
              {settings?.contactEmail || "noripiton@gmail.com"}
            </a>
            <p className="mt-4 text-sm text-primary-500 leading-relaxed">
              メールにてお気軽にお問い合わせください。
              <br />
              通常、3営業日以内にご返信いたします。
            </p>
          </div>

          {/* SNS */}
          {settings?.snsLinks && settings.snsLinks.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-[0.2em] text-primary-500 mb-6">
                Social
              </h2>
              <ul className="flex flex-col gap-4">
                {settings.snsLinks.map((sns, i) => (
                  <li key={i}>
                    <a
                      href={sns.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-primary-300 hover:text-white transition-colors group"
                    >
                      <span className="text-sm text-primary-500 w-24">
                        {getSnsIcon(sns.platform)}
                      </span>
                      <span className="text-sm group-hover:underline underline-offset-4">
                        {sns.label || sns.url}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Note */}
          <div className="pt-8 border-t border-white/5">
            <p className="text-xs text-primary-600 leading-relaxed">
              ご依頼内容により、お引き受けできない場合がございます。
              <br />
              あらかじめご了承ください。
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
