import Link from "next/link";

type Props = {
  heading?: string;
  description?: string;
};

export default function ContactCTA({
  heading = "Get in Touch",
  description = "お仕事のご相談・ご依頼はお気軽にお問い合わせください。",
}: Props) {
  return (
    <section className="py-section-sm lg:py-section">
      <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="font-display text-display-sm lg:text-display-md text-white tracking-wide">
          {heading}
        </h2>
        <p className="mt-4 text-primary-400 leading-relaxed">{description}</p>
        <Link
          href="/contact"
          className="
            inline-block mt-8 px-10 py-4
            border border-white/20 text-white text-sm tracking-wider uppercase
            hover:bg-white hover:text-primary-950
            transition-all duration-500
          "
        >
          Contact
        </Link>
      </div>
    </section>
  );
}
