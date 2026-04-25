import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types/microcms";
import { formatDate } from "@/lib/utils";

type Props = {
  post: BlogPost;
};

export default function PostCard({ post }: Props) {
  const dateStr = post.publishedAt || post.createdAt;

  return (
    <li className="border-b border-white/5 last:border-0">
      <Link
        href={`/blog/${post.id}`}
        className="flex gap-5 lg:gap-8 py-7 group"
      >
        {post.thumbnail && (
          <div className="relative w-28 lg:w-44 shrink-0 aspect-[4/3] overflow-hidden bg-primary-900">
            <Image
              src={post.thumbnail.url}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 112px, 176px"
            />
          </div>
        )}
        <div className="flex flex-col justify-center min-w-0">
          <time className="text-xs text-primary-500 mb-2">
            {formatDate(dateStr)}
          </time>
          <h3 className="text-white font-light tracking-wide group-hover:text-primary-200 transition-colors line-clamp-2">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="mt-2 text-sm text-primary-500 line-clamp-2 leading-relaxed hidden sm:block">
              {post.excerpt}
            </p>
          )}
        </div>
      </Link>
    </li>
  );
}
