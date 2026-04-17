import type { MicroCMSImage, MicroCMSListContent, MicroCMSDate } from "microcms-js-sdk";

// ============================================================
// 共通型
// ============================================================

/** SNSリンク（繰り返しフィールド想定） */
export type SnsLink = {
  platform: string;
  url: string;
  label?: string;
};

/** 関連リンク（繰り返しフィールド想定） */
export type RelatedLink = {
  label: string;
  url: string;
};

// ============================================================
// 1. siteSettings（単一コンテンツ）
// ============================================================

export type SiteSettings = {
  siteTitle: string;
  siteDescription: string;
  ogImage?: MicroCMSImage;
  heroCatch: string;
  heroSubCatch?: string;
  contactEmail: string;
  snsLinks?: SnsLink[];
  footerText?: string;
} & MicroCMSDate;

// ============================================================
// 2. profile（単一コンテンツ）
// ============================================================

export type Profile = {
  name: string;
  englishName?: string;
  mainVisual?: MicroCMSImage;
  profileImage?: MicroCMSImage;
  shortBio?: string;
  longBio?: string;
  career?: string;        // リッチテキスト
  achievements?: string;  // リッチテキスト
  socialLinks?: SnsLink[];
} & MicroCMSDate;

// ============================================================
// 3. works（リスト型）
// ============================================================

export type Work = {
  title: string;
  slug: string;
  thumbnail?: MicroCMSImage;
  coverImage?: MicroCMSImage;
  excerpt?: string;
  body?: string;            // リッチテキスト
  year?: string;
  role?: string;
  category?: string[];
  tags?: string[];
  relatedLinks?: RelatedLink[];
  galleryImages?: MicroCMSImage[];
  videoUrl?: string;
  isFeatured?: boolean;
} & MicroCMSListContent;

// ============================================================
// 4. posts（リスト型 - Blog/News 統合）
// ============================================================

export type PostType = "blog" | "news";

export type Post = {
  title: string;
  slug: string;
  thumbnail?: MicroCMSImage;
  excerpt?: string;
  body?: string;           // リッチテキスト
  postType: PostType[];    // microCMSのセレクトフィールド（配列）
  category?: string[];
  tags?: string[];
  publishedAt?: string;
  isFeatured?: boolean;
  externalUrl?: string;
} & MicroCMSListContent;

