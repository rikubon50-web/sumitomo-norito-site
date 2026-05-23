// 構造化データ(JSON-LD)のビルダー群
import { SITE_URL, SITE_NAME, SITE_NAME_EN, absoluteUrl } from "@/lib/site";
import type { Profile, Work, BlogPost, NewsPost } from "@/types/microcms";

const PERSON_NAME = "住友紀人";

function authorPerson() {
  return { "@type": "Person", name: PERSON_NAME, url: SITE_URL } as const;
}

/** サイト全体（トップに設置） */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: SITE_NAME_EN,
    url: SITE_URL,
    inLanguage: "ja",
  };
}

/** 人物（作曲家） */
export function personSchema(profile?: Profile | null) {
  const sns = profile?.socialLinks ?? profile?.snsLinks ?? [];
  const sameAs = sns.map((s) => s.url).filter(Boolean);
  const image = profile?.profileImage?.url ?? profile?.ogImage?.url;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile?.name ?? PERSON_NAME,
    alternateName: profile?.englishName ?? SITE_NAME_EN,
    jobTitle: "作曲家",
    url: SITE_URL,
    ...(image ? { image } : {}),
    ...(profile?.shortBio ? { description: profile.shortBio } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/** パンくず */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

/** 作品 */
export function creativeWorkSchema(work: Work) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: work.title,
    ...(work.excerpt ? { description: work.excerpt } : {}),
    ...(work.thumbnail ? { image: work.thumbnail.url } : {}),
    ...(work.year ? { dateCreated: work.year } : {}),
    url: absoluteUrl(`/works/${work.id}`),
    author: authorPerson(),
  };
}

/** ブログ記事 */
export function blogPostingSchema(post: BlogPost) {
  const published = post.publishedAt || post.createdAt;
  const url = absoluteUrl(`/blog/${post.id}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    ...(post.excerpt ? { description: post.excerpt } : {}),
    ...(post.thumbnail ? { image: post.thumbnail.url } : {}),
    ...(published ? { datePublished: published } : {}),
    ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
    url,
    mainEntityOfPage: url,
    author: authorPerson(),
  };
}

/** お知らせ */
export function newsArticleSchema(post: NewsPost) {
  const published = post.publishedAt || post.createdAt;
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    ...(published ? { datePublished: published } : {}),
    ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
    url: absoluteUrl(`/news/${post.id}`),
    author: authorPerson(),
  };
}
