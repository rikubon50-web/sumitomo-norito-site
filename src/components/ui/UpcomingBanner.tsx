import Link from "next/link";
import type { Schedule } from "@/types/microcms";
import { formatDateShort } from "@/lib/utils";

type Props = {
  items: Schedule[];
};

export default function UpcomingBanner({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <div className="bg-primary-900 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-stretch gap-0 overflow-x-auto scrollbar-none">

          {/* ラベル */}
          <div className="shrink-0 flex items-center pr-8 py-5 border-r border-white/10">
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary-400 whitespace-nowrap">
              Upcoming
            </span>
          </div>

          {/* イベント一覧 */}
          <ul className="flex items-center gap-8 px-8 py-5 overflow-x-auto scrollbar-none">
            {items.map((item) => (
              <li key={item.id} className="shrink-0 flex items-center gap-4">
                <time className="text-xs text-primary-500 whitespace-nowrap">
                  {formatDateShort(item.date)}
                </time>
                <span className="text-sm text-primary-200 whitespace-nowrap">
                  {item.title}
                </span>
                {item.venue && (
                  <span className="text-xs text-primary-600 whitespace-nowrap">
                    {item.venue}
                  </span>
                )}
                {item.ticketUrl && (
                  <a
                    href={item.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] uppercase tracking-wider text-primary-500 hover:text-white transition-colors border border-white/10 hover:border-white/30 px-2 py-0.5"
                  >
                    Ticket
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Schedule リンク */}
          <div className="shrink-0 flex items-center pl-8 py-5 border-l border-white/10 ml-auto">
            <Link
              href="/schedule"
              className="text-[10px] uppercase tracking-[0.2em] text-primary-500 hover:text-white transition-colors whitespace-nowrap"
            >
              View All →
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
