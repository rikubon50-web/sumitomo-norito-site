// サイト全体で共有する定数（SEO / メタデータ用）

/** 本番サイトの正規URL（末尾スラッシュ無し）。プレビュー等は NEXT_PUBLIC_SITE_URL で上書き可。 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.norihito-mimi-sumitomo.com"
).replace(/\/+$/, "");

/** サイト名（OGP / 構造化データ用） */
export const SITE_NAME = "住友紀人 Official Site";
export const SITE_NAME_EN = "Norihito Sumitomo";

/** 絶対URLを組み立てる（path は "/works" のように先頭スラッシュ付き or "" ） */
export function absoluteUrl(path = ""): string {
  if (!path) return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
