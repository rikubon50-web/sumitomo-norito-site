import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/microcms";
import PageHeader from "@/components/ui/PageHeader";
import { getSnsIcon } from "@/lib/utils";
import ContactForm from "@/components/ui/ContactForm";

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
      <PageHeader title="Contact" subtitle="Get in Touch" />

      <div className="max-w-3xl mx-auto px-6 lg:px-12 py-section-sm lg:py-section">
        <div className="space-y-20">
          {/* Contact Form */}
          <ContactForm />

          {/* Email */}
          <div className="border-t border-white/5 pt-16">
            <h2 className="text-xs uppercase tracking-[0.2em] text-primary-500 mb-4">
              Direct Email
            </h2>
            <a
              href={`mailto:${settings?.contactEmail || "noripiton@gmail.com"}`}
              className="text-lg text-white hover:text-primary-300 transition-colors font-light tracking-wide"
            >
              {settings?.contactEmail || "noripiton@gmail.com"}
            </a>
            <p className="mt-3 text-sm text-primary-500 leading-relaxed">
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
          <div className="border-t border-white/5 pt-8">
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
