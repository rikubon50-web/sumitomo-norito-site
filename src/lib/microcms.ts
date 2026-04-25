import { createClient } from "microcms-js-sdk";
import type { MicroCMSQueries, MicroCMSListResponse } from "microcms-js-sdk";
import type {
  SiteSettings,
  Profile,
  Work,
  BlogPost,
  NewsPost,
} from "@/types/microcms";

// ============================================================
// クライアント初期化
// ============================================================

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}
if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// ============================================================
// siteSettings
// ============================================================

export async function getSiteSettings(): Promise<SiteSettings> {
  return client.get<SiteSettings>({
    endpoint: "siteSettings",
  });
}

// ============================================================
// profile
// ============================================================

export async function getProfile(): Promise<Profile> {
  return client.get<Profile>({
    endpoint: "profile",
  });
}

// ============================================================
// works
// ============================================================

export async function getWorks(
  queries?: MicroCMSQueries
): Promise<MicroCMSListResponse<Work>> {
  return client.getList<Work>({
    endpoint: "works",
    queries: {
      orders: "-publishedAt",
      ...queries,
    },
  });
}

export async function getWorkById(id: string): Promise<Work | null> {
  try {
    return await client.get<Work>({
      endpoint: "works",
      contentId: id,
    });
  } catch {
    return null;
  }
}

export async function getFeaturedWorks(
  limit = 6
): Promise<MicroCMSListResponse<Work>> {
  return client.getList<Work>({
    endpoint: "works",
    queries: {
      filters: "isFeatured[equals]true",
      limit,
      orders: "-publishedAt",
    },
  });
}

// ============================================================
// blog
// ============================================================

export async function getBlogPosts(
  queries?: MicroCMSQueries
): Promise<MicroCMSListResponse<BlogPost>> {
  return client.getList<BlogPost>({
    endpoint: "blog",
    queries: {
      orders: "-publishedAt",
      ...queries,
    },
  });
}

export async function getFeaturedBlogPosts(
  limit = 5
): Promise<MicroCMSListResponse<BlogPost>> {
  return client.getList<BlogPost>({
    endpoint: "blog",
    queries: {
      filters: "isFeatured[equals]true",
      limit,
      orders: "-publishedAt",
    },
  });
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    return await client.get<BlogPost>({
      endpoint: "blog",
      contentId: id,
    });
  } catch {
    return null;
  }
}

// ============================================================
// news
// ============================================================

export async function getNewsPosts(
  queries?: MicroCMSQueries
): Promise<MicroCMSListResponse<NewsPost>> {
  return client.getList<NewsPost>({
    endpoint: "news",
    queries: {
      orders: "-publishedAt",
      ...queries,
    },
  });
}

export async function getNewsPostById(id: string): Promise<NewsPost | null> {
  try {
    return await client.get<NewsPost>({
      endpoint: "news",
      contentId: id,
    });
  } catch {
    return null;
  }
}
