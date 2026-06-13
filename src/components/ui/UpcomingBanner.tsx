"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Schedule } from "@/types/microcms";
import { formatDateShort } from "@/lib/utils";

type Props = {
  items: Schedule[];
};

const AUTO_ADVANCE_MS = 6000;

export default function UpcomingBanner({ items }: Props) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (items.length <= 1 || isPaused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [items.length, isPaused]);

  if (items.length === 0) return null;

  const goPrev = () =>
    setIndex((i) => (i - 1 + items.length) % items.length);
  const goNext = () => setIndex((i) => (i + 1) % items.length);

  return (
    <div
      className="relative bg-white text-primary-950 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 左のアクセントライン */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-950" />

      <div className="max-w-7xl mx-auto pl-3 pr-3 sm:px-6 lg:px-12">
        <div className="flex items-stretch">

          {/* ラベル */}
          <div className="shrink-0 flex flex-col justify-center pr-3 sm:pr-8 py-4 sm:py-6 border-r border-primary-200">
            <span className="text-[9px] uppercase tracking-[0.35em] text-primary-500 mb-1">
              Next Live
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-primary-950">
              Upcoming
            </span>
          </div>

          {/* スライダー本体 */}
          <div className="flex-1 min-w-0 relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  className="w-full shrink-0 px-3 sm:px-8 py-4 sm:py-6 flex items-center"
                >
                  <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap min-w-0">
                    <time className="text-xs font-semibold tracking-wider text-primary-950 whitespace-nowrap">
                      {formatDateShort(item.date)}
                    </time>
                    <span className="text-sm text-primary-800 font-light truncate max-w-full">
                      {item.title}
                    </span>
                    {item.venue && (
                      <span className="text-xs text-primary-400 whitespace-nowrap">
                        @ {item.venue}
                      </span>
                    )}
                    {item.ticketUrl && (
                      <a
                        href={item.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] uppercase tracking-wider bg-primary-950 text-white hover:bg-primary-700 transition-colors px-3 py-1 whitespace-nowrap"
                      >
                        Ticket →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ナビゲーション */}
          {items.length > 1 && (
            <div className="shrink-0 flex items-center gap-0.5 sm:gap-1 pl-1 sm:pl-3 pr-1">
              <button
                type="button"
                onClick={goPrev}
                aria-label="前のイベント"
                className="w-7 h-7 flex items-center justify-center text-base leading-none text-primary-400 hover:text-primary-950 transition-colors"
              >
                ‹
              </button>
              <span className="text-[10px] text-primary-500 tabular-nums whitespace-nowrap min-w-[2.5em] text-center select-none">
                {index + 1} / {items.length}
              </span>
              <button
                type="button"
                onClick={goNext}
                aria-label="次のイベント"
                className="w-7 h-7 flex items-center justify-center text-base leading-none text-primary-400 hover:text-primary-950 transition-colors"
              >
                ›
              </button>
            </div>
          )}

          {/* Schedule リンク（モバイルではヘッダーから遷移できるため非表示） */}
          <div className="hidden sm:flex shrink-0 items-center pl-4 sm:pl-8 py-6 border-l border-primary-200">
            <Link
              href="/schedule"
              className="text-[10px] uppercase tracking-[0.25em] text-primary-500 hover:text-primary-950 transition-colors whitespace-nowrap font-medium"
            >
              All Schedule →
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
