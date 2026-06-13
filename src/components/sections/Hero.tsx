import Image from "next/image";

type Props = {
  imageUrl?: string;
  catchCopy: string;
  name?: string;
  englishName?: string;
  photoCredit?: string;
};

export default function Hero({
  imageUrl,
  catchCopy,
  name,
  englishName,
  photoCredit,
}: Props) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "calc(100svh - 64px)" }}
    >
      {/* 背景画像 */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt=""
          fill
          className="object-cover object-[40%_top] lg:object-contain lg:object-center"
          priority
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-primary-900" />
      )}

      {/* 暗幕オーバーレイ */}
      <div className="absolute inset-0 bg-black/60" />

      {/* テキストコンテンツ */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-4xl w-full">
          {englishName && (
            <p className="text-xs lg:text-sm uppercase tracking-[0.3em] text-primary-400 mb-4 animate-fade-in">
              {englishName}
            </p>
          )}
          {name && (
            <h1
              className="font-display text-display-md lg:text-display-lg text-white mb-6 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              {name}
            </h1>
          )}
          {catchCopy && (
            <p
              className="text-lg lg:text-xl text-primary-200 leading-relaxed font-light animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              {catchCopy}
            </p>
          )}
        </div>
      </div>

      {/* スクロール誘導 */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-fade-in"
        style={{ animationDelay: "1s" }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-primary-500">
            Scroll
          </span>
          <div className="w-px h-8 bg-primary-600 animate-pulse" />
        </div>
      </div>

      {/* フォトクレジット */}
      {photoCredit && (
        <p
          className="absolute bottom-3 right-4 z-10 text-[10px] tracking-wider text-white/40 animate-fade-in"
          style={{ animationDelay: "1.2s" }}
        >
          © {photoCredit}
        </p>
      )}
    </section>
  );
}
