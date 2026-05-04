import type { Metadata } from "next";
import { getSchedule } from "@/lib/microcms";
import PageHeader from "@/components/ui/PageHeader";
import ContactCTA from "@/components/ui/ContactCTA";
import { formatDateShort } from "@/lib/utils";
import type { Schedule } from "@/types/microcms";

export const metadata: Metadata = {
  title: "Schedule",
  description: "住友紀人のライブ・コンサートスケジュール",
};

export const revalidate = 60;

function ScheduleRow({ item }: { item: Schedule }) {
  return (
    <li className="py-6 border-b border-white/5 last:border-0">
      <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8">
        <time className="text-xs text-primary-500 shrink-0 w-28 pt-1">
          {formatDateShort(item.date)}
        </time>
        <div className="flex-1 min-w-0">
          <p className="text-primary-100 leading-relaxed">{item.title}</p>
          {(item.venue || item.time) && (
            <p className="mt-1 text-sm text-primary-500">
              {item.time && <span className="mr-4">{item.time}</span>}
              {item.venue && <span>{item.venue}</span>}
            </p>
          )}
          {item.detail && (
            <p className="mt-1 text-sm text-primary-600 leading-relaxed">
              {item.detail}
            </p>
          )}
          {item.ticketUrl && (
            <a
              href={item.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-xs text-primary-400 hover:text-white tracking-wider uppercase transition-colors border border-white/10 hover:border-white/30 px-3 py-1"
            >
              Ticket →
            </a>
          )}
        </div>
      </div>
    </li>
  );
}

export default async function SchedulePage() {
  let all: Schedule[] = [];
  try {
    const res = await getSchedule({ limit: 100 });
    all = res.contents;
  } catch {
    // fallback
  }

  // "YYYY.MM.DD" 形式は辞書順 = 日付順なので文字列比較で振り分け可能
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, ".");
  const upcoming = all.filter((s) => s.date > today).sort((a, b) => a.date.localeCompare(b.date));
  const past = all.filter((s) => s.date <= today).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHeader
        title="Schedule"
        subtitle="Live"
        description="ライブ・コンサートのスケジュールです。"
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-section-sm lg:py-section">

        {/* Upcoming */}
        <section>
          <h2 className="text-xs uppercase tracking-[0.3em] text-primary-500 mb-6">
            Upcoming
          </h2>
          {upcoming.length > 0 ? (
            <ul>
              {upcoming.map((item) => (
                <ScheduleRow key={item.id} item={item} />
              ))}
            </ul>
          ) : (
            <p className="text-primary-600 text-sm py-4">
              現在予定されているスケジュールはありません。
            </p>
          )}
        </section>

        {/* Past */}
        {past.length > 0 && (
          <section className="mt-section-sm pt-section-sm border-t border-white/5">
            <h2 className="text-xs uppercase tracking-[0.3em] text-primary-500 mb-6">
              Past
            </h2>
            <ul>
              {past.map((item) => (
                <ScheduleRow key={item.id} item={item} />
              ))}
            </ul>
          </section>
        )}
      </div>

      <div className="border-t border-white/5">
        <ContactCTA />
      </div>
    </>
  );
}
