type Props = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionTitle({
  title,
  subtitle,
  align = "center",
}: Props) {
  return (
    <div className={`mb-12 lg:mb-16 ${align === "center" ? "text-center" : ""}`}>
      <h2 className="font-display text-display-sm lg:text-display-md text-white tracking-wide">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm text-primary-500 tracking-wider uppercase">
          {subtitle}
        </p>
      )}
      <div
        className={`mt-6 h-px w-16 bg-primary-600 ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
