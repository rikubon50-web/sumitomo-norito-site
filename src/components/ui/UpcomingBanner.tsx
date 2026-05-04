import Link from "next/link";
import type { Schedule } from "@/types/microcms";
import { formatDateShort } from "@/lib/utils";

type Props = {
  items: Schedule[];
};

export default function UpcomingBanner({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <div className="relative bg-white text-primary-950 overflow-hidden">
      {/* 左のアクセントライン */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-950" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-stretch">

          {/* ラベル */}
          <div className="shrink-0 flex flex-col justify-center pr-8 py-6 border-r border-primary-200">
            <span className="text-[9px] uppercase tracking-[0.35em] text-primary-500 mb-1">
              Next Live
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-primary-950">
              Upcoming
            </span>
          </div>

          {/* イベント一覧 */}
          <ul className="flex items-center gap-10 px-8 py-6 overflow-x-auto scrollbar-none flex-1">
            {items.map((item, i) => (
              <li key={item.id} className="shrink-0 flex items-center gap-5">
                {i > 0 && (
                  <span className="text-primary-300 text-lg font-thin select-none">／</span>
                )}
                <div className="flex items-baseline gap-3">
                  <time className="text-xs font-semibold tracking-wider text-primary-950 whitespace-nowrap">
                    {formatDateShort(item.date)}
                  </time>
                  <span className="text-sm text-primary-800 whitespace-nowrap font-light">
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
              </li>
            ))}
          </ul>

          {/* Schedule リンク */}
          <div className="shrink-0 flex items-center pl-8 py-6 border-l border-primary-200">
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
