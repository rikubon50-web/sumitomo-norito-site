import { createClient } from "microcms-js-sdk";
import type { MicroCMSQueries, MicroCMSListResponse } from "microcms-js-sdk";
import type {
  SiteSettings,
  Profile,
  Work,
  Post,
  PostType,
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

export async function getWorkBySlug(slug: string): Promise<Work | null> {
  const res = await client.getList<Work>({
    endpoint: "works",
    queries: {
      filters: `slug[equals]${slug}`,
      limit: 1,
    },
  });
  return res.contents[0] ?? null;
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
// posts（Blog / News 統合）
// ============================================================

export async function getPosts(
  postType?: PostType,
  queries?: MicroCMSQueries
): Promise<MicroCMSListResponse<Post>> {
  const filters = postType
    ? `postType[contains]${postType}`
    : undefined;

  return client.getList<Post>({
    endpoint: "posts",
    queries: {
      orders: "-publishedAt",
      filters,
      ...queries,
    },
  });
}

export async function getPostBySlug(
  slug: string,
  postType?: PostType
): Promise<Post | null> {
  let filters = `slug[equals]${slug}`;
  if (postType) {
    filters += `[and]postType[contains]${postType}`;
  }

  const res = await client.getList<Post>({
    endpoint: "posts",
    queries: {
      filters,
      limit: 1,
    },
  });
  return res.contents[0] ?? null;
}
