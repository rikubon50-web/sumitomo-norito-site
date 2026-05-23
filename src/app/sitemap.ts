import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getWorks, getBlogPosts, getNewsPosts } from "@/lib/microcms";

// 1時間ごとに sitemap を再生成（新規記事の反映）
export const revalidate = 3600;

type ListEntry = { id: string; updatedAt?: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // --- 静的ページ ---
  const staticPaths: { path: string; priority: number; changeFrequency: "daily" | "weekly" }[] = [
    { path: "", priority: 1.0, changeFrequency: "daily" },
    { path: "/profile", priority: 0.8, changeFrequency: "weekly" },
    { path: "/works", priority: 0.9, changeFrequency: "weekly" },
    { path: "/schedule", priority: 0.8, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/news", priority: 0.7, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.5, changeFrequency: "weekly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((s) => ({
    url: `${SITE_URL}${s.path}`,
    lastModified: new Date(),
    changeFrequency: s.changeFrequency,
    priority: s.priority,
  }));

  // --- 動的ページ（works / blog / news の各詳細） ---
  const [works, blog, news] = await Promise.allSettled([
    getWorks({ limit: 100, fields: "id,updatedAt" }),
    getBlogPosts({ limit: 100, fields: "id,updatedAt" }),
    getNewsPosts({ limit: 100, fields: "id,updatedAt" }),
  ]);

  const toEntries = (
    res: PromiseSettledResult<{ contents: ListEntry[] }>,
    base: string
  ): MetadataRoute.Sitemap =>
    res.status === "fulfilled"
      ? res.value.contents.map((c) => ({
          url: `${SITE_URL}${base}/${c.id}`,
          lastModified: c.updatedAt ? new Date(c.updatedAt) : new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }))
      : [];

  return [
    ...staticEntries,
    ...toEntries(works, "/works"),
    ...toEntries(blog, "/blog"),
    ...toEntries(news, "/news"),
  ];
}
