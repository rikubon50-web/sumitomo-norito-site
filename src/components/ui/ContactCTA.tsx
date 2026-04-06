import Link from "next/link";

type Props = {
  heading?: string;
};

export default function ContactCTA({
  heading = "Get in Touch",
}: Props) {
  return (
    <section className="py-section-sm lg:py-section">
      <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="font-display text-display-sm lg:text-display-md text-white tracking-wide">
          {heading}
        </h2>
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
