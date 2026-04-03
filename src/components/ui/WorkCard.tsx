import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/types/microcms";

type Props = {
  work: Work;
};

export default function WorkCard({ work }: Props) {
  return (
    <Link
      href={`/works/${work.slug}`}
      className="group block"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-primary-900">
        {work.thumbnail ? (
          <Image
            src={work.thumbnail.url}
            alt={work.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-primary-700">
            <span className="text-sm">No Image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-3 mb-2">
          {work.year && (
            <span className="text-xs text-primary-500">{work.year}</span>
          )}
          {work.category && work.category.length > 0 && (
            <span className="text-xs text-primary-600">
              {work.category[0]}
            </span>
          )}
        </div>
        <h3 className="text-white text-lg font-light tracking-wide group-hover:text-primary-200 transition-colors">
          {work.title}
        </h3>
        {work.excerpt && (
          <p className="mt-2 text-sm text-primary-500 line-clamp-2 leading-relaxed">
            {work.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
