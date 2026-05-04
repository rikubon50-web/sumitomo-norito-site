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

// ============================================================
// 1. profile（単一コンテンツ）※ siteSettings を統合済み
// ============================================================

export type Profile = {
  // プロフィール
  name: string;
  englishName?: string;
  mainVisual?: MicroCMSImage;
  profileImage?: MicroCMSImage;
  shortBio?: string;
  longBio?: string;
  career?: string;        // リッチテキスト
  achievements?: string;  // リッチテキスト
  socialLinks?: SnsLink[];
  // サイト設定（旧 siteSettings）
  siteTitle?: string;
  siteDescription?: string;
  ogImage?: MicroCMSImage;
  heroCatch?: string;
  heroSubCatch?: string;
  contactEmail?: string;
  snsLinks?: SnsLink[];
  footerText?: string;
} & MicroCMSDate;

// 後方互換のためのエイリアス
export type SiteSettings = Profile;

// ============================================================
// 3. works（リスト型）
// ============================================================

export type Work = {
  title: string;
  thumbnail?: MicroCMSImage;
  excerpt?: string;
  body?: string;            // リッチテキスト
  year?: string;
  role?: string;
  galleryImages?: MicroCMSImage[];
  videoUrl?: string;
  isFeatured?: boolean;
} & MicroCMSListContent;

// ============================================================
// 4. blog（リスト型）
// ============================================================

export type BlogPost = {
  title: string;
  thumbnail?: MicroCMSImage;
  excerpt?: string;
  body?: string;
  isFeatured?: boolean;
} & MicroCMSListContent;

// ============================================================
// 5. schedule（リスト型）
// ============================================================

export type Schedule = {
  title: string;
  date: string;      // "YYYY.MM.DD" 形式
  venue?: string;
  time?: string;
  detail?: string;
  ticketUrl?: string;
} & MicroCMSListContent;

// ============================================================
// 6. news（リスト型）
// ============================================================

export type NewsPost = {
  title: string;
  date?: string;
  body?: string;
  externalUrl?: string;
} & MicroCMSListContent;

