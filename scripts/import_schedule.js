/**
 * microCMS Schedule 一括登録スクリプト
 *
 * 実行方法:
 *   DRY_RUN=true  node --env-file=.env.local scripts/import_schedule.js
 *   DRY_RUN=false node --env-file=.env.local scripts/import_schedule.js
 */

const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;
const API_KEY = process.env.MICROCMS_API_KEY;
const DRY_RUN = process.env.DRY_RUN !== "false";
const ENDPOINT = "schedule";

if (!SERVICE_DOMAIN || !API_KEY) {
  console.error("❌ 環境変数 MICROCMS_SERVICE_DOMAIN と MICROCMS_API_KEY が必要です");
  process.exit(1);
}

const BASE_URL = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/${ENDPOINT}`;
const HEADERS = {
  "X-MICROCMS-API-KEY": API_KEY,
  "Content-Type": "application/json",
};

// 旧サイト live schedule から取得した過去実績
const SCHEDULE = [
  // 最近のもの（News にも登録済みだが Schedule としても登録）
  { date: "2025.06.13", title: "南佳孝ライブ出演" },
  { date: "2025.05.05", title: "TAKAMATSU MUSIC BLUE FES 2025（南佳孝バンド）" },
  { date: "2025.04.13", title: "KOKIA Once-in-a-lifetime meeting 2025 一期一会のうたツアー 東京特別公演" },
  { date: "2025.04.05", title: "渡辺真知子コンサート2025〜唇よ、熱く君を語れ〜Vol.2" },
  { date: "2025.04.05", title: "南佳孝 Billboard Live Tour" },
  // 2024年
  { date: "2024.10.26", title: "杉山清貴コンサートツアー2024「古いシネマを観るように、、、」" },
  { date: "2024.08.13", title: "HARVEST Ⅳ" },
  // 2023年
  { date: "2023.07.01", title: "えんがわ音楽祭〜水の音コンサート〜" },
  { date: "2023.04.30", title: "南佳孝 Billboard Live Tour" },
  { date: "2023.03.02", title: "Yacht Bianco Kaori's Birthday Live（ゲスト出演）" },
  // 2022年
  { date: "2022.10.05", title: "第11回農村舞台公演 HUMANOISE 2022 / 音楽人形演劇「True Life オロロン」" },
  // 2021年
  { date: "2021.10.30", title: "徳島駅前ライブハウス COTY公演", time: "18:00" },
  { date: "2021.10.01", title: "2021秋ツアー「旅する人形演劇」" },
  // 2020年
  { date: "2020.11.03", title: "HUMANOISE Project 2020（無観客・配信公演）" },
  { date: "2020.09.21", title: "HUMANOISE Project 農村舞台公演" },
  { date: "2020.08.08", title: "南佳孝＆杉山清貴 JOINT LIVE HALF&HALF" },
  { date: "2020.07.20", title: "住友紀人 casa プロジェクト live（観客限定・同時生配信）" },
  // 2019年
  { date: "2019.11.22", title: "住友紀人 18年ぶりのリーダーライブ" },
  { date: "2019.10.17", title: "住友紀人 Organically Produced Live" },
  { date: "2019.09.03", title: "TMF Session（高円寺ジロキチ）" },
  // 2018年
  { date: "2018.10.28", title: "南佳孝 45th Anniversary Live 〜Dear My Generation〜" },
  { date: "2018.09.03", title: "Kaleb James とのLive" },
  { date: "2018.04.16", title: "Nathan East Band of Brothers Tour（Blue Note Tokyo）" },
  { date: "2018.03.26", title: "四谷3丁目 メビウス出演" },
];

async function fetchExistingTitles() {
  const res = await fetch(`${BASE_URL}?limit=100&fields=title`, {
    headers: HEADERS,
  });
  if (!res.ok) {
    throw new Error(`既存データの取得に失敗: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return new Set(data.contents.map((item) => item.title));
}

async function postSchedule(item) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(item),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`POST失敗 (${res.status}): ${body}`);
  }
  return res.json();
}

async function main() {
  console.log(`\n========================================`);
  console.log(`  microCMS Schedule 一括登録`);
  console.log(`  モード: ${DRY_RUN ? "DRY RUN（確認のみ）" : "本番登録"}`);
  console.log(`  対象件数: ${SCHEDULE.length}件`);
  console.log(`========================================\n`);

  console.log("📡 既存データを確認中...");
  const existingTitles = await fetchExistingTitles();
  console.log(`   既存件数: ${existingTitles.size}件\n`);

  const toRegister = SCHEDULE.filter((s) => !existingTitles.has(s.title));
  const toSkip = SCHEDULE.filter((s) => existingTitles.has(s.title));

  if (toSkip.length > 0) {
    console.log(`⏭️  スキップ（既に登録済み）: ${toSkip.length}件`);
    toSkip.forEach((s) => console.log(`   - ${s.date} ${s.title}`));
    console.log();
  }

  if (toRegister.length === 0) {
    console.log("✅ 登録対象なし。全件すでに登録済みです。");
    return;
  }

  console.log(`📋 登録予定: ${toRegister.length}件`);
  toRegister.forEach((s, i) => console.log(`   ${i + 1}. ${s.date} | ${s.title}`));
  console.log();

  if (DRY_RUN) {
    console.log("🔍 DRY RUN モードのため、実際の登録はスキップしました。");
    console.log("   本番登録する場合: DRY_RUN=false node --env-file=.env.local scripts/import_schedule.js");
    return;
  }

  let successCount = 0;
  let failCount = 0;

  for (const item of toRegister) {
    try {
      await postSchedule(item);
      console.log(`✅ 登録成功: ${item.date} | ${item.title}`);
      successCount++;
    } catch (err) {
      console.error(`❌ 登録失敗: ${item.title}`);
      console.error(`   ${err.message}`);
      failCount++;
    }
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log(`\n========================================`);
  console.log(`  完了: 成功 ${successCount}件 / 失敗 ${failCount}件`);
  console.log(`========================================\n`);
}

main().catch((err) => {
  console.error("❌ 予期しないエラー:", err.message);
  process.exit(1);
});
