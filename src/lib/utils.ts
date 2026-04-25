/**
 * 日付文字列をフォーマットする
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * 日付文字列を短縮フォーマットする
 */
export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

/**
 * YouTube URLを埋め込み用URLに変換する
 */
export function toYouTubeEmbedUrl(url: string): string {
  const watchMatch = url.match(/youtube\.com\/watch\?.*v=([^&]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;

  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

  return url;
}

/**
 * SNSプラットフォーム名からアイコンラベルを返す
 */
export function getSnsIcon(platform: string): string {
  const map: Record<string, string> = {
    twitter: "X",
    x: "X",
    instagram: "Instagram",
    youtube: "YouTube",
    facebook: "Facebook",
    note: "note",
    linkedin: "LinkedIn",
    github: "GitHub",
  };
  return map[platform.toLowerCase()] ?? platform;
}
