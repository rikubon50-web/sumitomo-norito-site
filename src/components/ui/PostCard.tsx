import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/types/microcms";
import { formatDate } from "@/lib/utils";

type Props = {
  post: Post;
  basePath: "blog" | "news";
};

export default function PostCard({ post, basePath }: Props) {
  const href = `/${basePath}/${post.slug}`;
  const dateStr = post.publishedAt || post.createdAt;

  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[16/9] overflow-hidden bg-primary-900">
        {post.thumbnail ? (
          <Image
            src={post.thumbnail.url}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-primary-700">
            <span className="text-sm">No Image</span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <time className="text-xs text-primary-500">{formatDate(dateStr)}</time>
        <h3 className="mt-1 text-white font-light tracking-wide group-hover:text-primary-200 transition-colors line-clamp-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-2 text-sm text-primary-500 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
