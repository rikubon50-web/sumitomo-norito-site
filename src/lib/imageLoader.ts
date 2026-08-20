"use client";

// microCMS(imgix) の画像変換APIでリサイズする next/image 用カスタムローダー。
// Vercel 側の画像最適化(月間上限あり)を経由しないための構成。
export default function microCMSImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  // ローカル画像(/public 配下)はそのまま返す
  if (src.startsWith("/")) return src;

  try {
    const url = new URL(src);
    if (url.hostname === "images.microcms-assets.io") {
      url.searchParams.set("w", String(width));
      url.searchParams.set("q", String(quality ?? 75));
      url.searchParams.set("fm", "webp");
      return url.href;
    }
    return src;
  } catch {
    return src;
  }
}
