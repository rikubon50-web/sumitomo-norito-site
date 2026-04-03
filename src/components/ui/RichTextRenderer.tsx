type Props = {
  html: string;
  className?: string;
};

/**
 * microCMS のリッチテキストを安全に描画するコンポーネント。
 * Tailwind の prose クラスでタイポグラフィを制御する。
 */
export default function RichTextRenderer({ html, className = "" }: Props) {
  return (
    <div
      className={`
        prose prose-invert prose-lg max-w-none
        prose-headings:font-display prose-headings:text-white prose-headings:tracking-wide
        prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
        prose-p:text-primary-300 prose-p:leading-relaxed
        prose-a:text-primary-200 prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-white
        prose-strong:text-white
        prose-ul:text-primary-300 prose-ol:text-primary-300
        prose-li:marker:text-primary-600
        prose-blockquote:border-primary-700 prose-blockquote:text-primary-400
        prose-img:rounded-lg
        prose-hr:border-primary-800
        ${className}
      `}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
