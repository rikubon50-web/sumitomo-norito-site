type Props = {
  title: string;
  subtitle?: string;
  description?: string;
};

/**
 * 下層ページ共通のヘッダー。
 * Hero ほど大きくないが、ページタイトルを印象的に見せる。
 */
export default function PageHeader({ title, subtitle, description }: Props) {
  return (
    <section className="pt-16 pb-16 lg:pt-20 lg:pb-24 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {subtitle && (
          <p className="text-xs uppercase tracking-[0.3em] text-primary-500 mb-3 pt-2">
            {subtitle}
          </p>
        )}
        <h1 className="font-display text-display-sm lg:text-display-md text-white tracking-wide">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-primary-400 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
        <div className="mt-8 h-px w-16 bg-primary-600" />
      </div>
    </section>
  );
}
