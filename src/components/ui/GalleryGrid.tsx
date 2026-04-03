"use client";

import Image from "next/image";
import { useState } from "react";
import type { GalleryItem } from "@/types/microcms";

type Props = {
  items: GalleryItem[];
};

export default function GalleryGrid({ items }: Props) {
  const [lightbox, setLightbox] = useState<{
    url: string;
    alt: string;
  } | null>(null);

  if (items.length === 0) {
    return (
      <p className="text-primary-500 text-sm text-center py-8">
        ギャラリーコンテンツはありません。
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {items.map((item) => {
          const isVideo =
            item.type && item.type.length > 0 && item.type[0] === "video";
          const thumbnailUrl = item.thumbnail?.url;

          return (
            <button
              key={item.id}
              onClick={() => {
                if (thumbnailUrl) {
                  setLightbox({ url: thumbnailUrl, alt: item.title });
                }
              }}
              className="group relative aspect-square overflow-hidden bg-primary-900 cursor-pointer"
            >
              {thumbnailUrl ? (
                <Image
                  src={thumbnailUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-primary-700">
                  <span className="text-sm">No Image</span>
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-end justify-start p-4 opacity-0 group-hover:opacity-100">
                <div>
                  <p className="text-white text-sm font-light">{item.title}</p>
                  {item.caption && (
                    <p className="text-primary-300 text-xs mt-1">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>

              {/* Video Badge */}
              {isVideo && (
                <div className="absolute top-3 right-3 bg-black/60 px-2 py-1 text-[10px] text-white uppercase tracking-wider">
                  Video
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white text-2xl hover:text-primary-400 transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="閉じる"
          >
            ✕
          </button>
          <div className="relative max-w-5xl max-h-[85vh] w-full h-full">
            <Image
              src={lightbox.url}
              alt={lightbox.alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
