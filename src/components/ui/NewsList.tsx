import Link from "next/link";
import type { NewsPost } from "@/types/microcms";
import { formatDateShort } from "@/lib/utils";

type Props = {
  posts: NewsPost[];
  showMore?: boolean;
};

export default function NewsList({ posts, showMore = false }: Props) {
  if (posts.length === 0) {
    return (
      <p className="text-primary-500 text-sm text-center py-8">
        お知らせはありません。
      </p>
    );
  }

  return (
    <div>
      <ul className="divide-y divide-white/5">
        {posts.map((post) => {
          const dateStr = post.date || post.publishedAt || post.createdAt;
          return (
            <li key={post.id}>
              <Link
                href={`/news/${post.id}`}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-5 group"
              >
                <time className="text-xs text-primary-500 shrink-0 w-28">
                  {formatDateShort(dateStr)}
                </time>
                <span className="text-primary-200 group-hover:text-white transition-colors leading-relaxed">
                  {post.title}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {showMore && (
        <div className="mt-8 text-center">
          <Link
            href="/news"
            className="text-sm text-primary-400 hover:text-white transition-colors tracking-wider uppercase"
          >
            View All News →
          </Link>
        </div>
      )}
    </div>
  );
}
