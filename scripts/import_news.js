/**
 * microCMS News 一括登録スクリプト
 *
 * 前提: microCMS の News スキーマに date（テキスト）フィールドが追加済みであること
 *
 * 実行方法:
 *   DRY_RUN=true  node --env-file=.env.local scripts/import_news.js   # 確認のみ
 *   DRY_RUN=false node --env-file=.env.local scripts/import_news.js   # 実際に登録
 */

const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;
const API_KEY = process.env.MICROCMS_API_KEY;
const DRY_RUN = process.env.DRY_RUN !== "false";
const ENDPOINT = "news";

if (!SERVICE_DOMAIN || !API_KEY) {
  console.error("❌ 環境変数 MICROCMS_SERVICE_DOMAIN と MICROCMS_API_KEY が必要です");
  process.exit(1);
}

const BASE_URL = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/${ENDPOINT}`;
const HEADERS = {
  "X-MICROCMS-API-KEY": API_KEY,
  "Content-Type": "application/json",
};

// 旧サイト（starnotes.jp/sumitomo/information/）から取得した30件
// date は "YYYY.MM.DD" 形式で保存（NewsList がそのまま表示できる）
const NEWS = [
  {
    date: "2025.12.20",
    title: "2026年1月27日(火) 「Jack Lee & Friends」を開催します！",
  },
  {
    date: "2025.09.30",
    title: "11月9日（日）KOKIA Concert Chronicles of Kami Songs ー運命を奏でる神曲たちー に出演します！",
  },
  {
    date: "2025.09.30",
    title: "11月2日（日）コンサート2025～唇よ、熱く君を語れ～Vol.2 に出演します！",
  },
  {
    date: "2025.09.30",
    title: "10月13日（月）尾崎亜美コンサート 2025 に出演します！",
  },
  {
    date: "2025.09.08",
    title: "10月19日（日）農村舞台公演 HUMANOISE PROJECT 2025 に出演します！",
  },
  {
    date: "2025.06.13",
    title: "南佳孝ライブに出演します",
  },
  {
    date: "2025.05.09",
    title: "杉山清貴コンサートツアー2024「古いシネマを観るように、、、」Blu-ray発売！",
  },
  {
    date: "2025.04.05",
    title: "渡辺真知子コンサート2025～唇よ、熱く君を語れ～Vol.2に参加します",
  },
  {
    date: "2025.04.05",
    title: "南佳孝 Billboard Live Tour に参加します",
  },
  {
    date: "2025.03.19",
    title: "5月5日「TAKAMATSU MUSIC BLUE FES 2025」に南佳孝バンドで参加します",
  },
  {
    date: "2025.03.08",
    title: "4月13日 KOKIA Once-in-a-lifetime meeting 2025 一期一会のうたツアー 東京特別公演に参加します",
  },
  {
    date: "2025.01.12",
    title: "音楽を担当した映画「海の沈黙」ロッテルダム国際映画祭に出品が決まりました",
  },
  {
    date: "2025.01.12",
    title: "2025年2月 Live情報",
  },
  {
    date: "2024.10.26",
    title: "杉山清貴コンサートツアー2024「古いシネマを観るように、、、」に参加します！",
  },
  {
    date: "2024.08.13",
    title: "「HARVEST Ⅳ」を開催いたします！",
  },
  {
    date: "2024.08.10",
    title: "映画「海の沈黙」の音楽を担当しました！",
  },
  {
    date: "2023.12.28",
    title: "1月7日に「True Life オロロン」が開催されます。",
  },
  {
    date: "2023.09.15",
    title: "「め組の大吾 救国のオレンジ」の音楽を担当しました！",
  },
  {
    date: "2023.07.01",
    title: "『えんがわ音楽祭～水の音コンサート～』に出演します！",
  },
  {
    date: "2023.06.30",
    title: "モンスターストライクDREAMDAZEに出演します！",
  },
  {
    date: "2023.04.30",
    title: "南佳孝さんのビルボードツアーに参加します！",
  },
  {
    date: "2023.03.29",
    title: "MIX 2nd Season 〜二度目の夏、空の向こうへ〜の音楽を担当しました！",
  },
  {
    date: "2023.03.02",
    title: "Yacht Bianco Kaori's Birthday Liveにゲスト出演します！",
  },
  {
    date: "2023.02.04",
    title: "ドラマスペシャル「ペルソナの密告　3つの顔をもつ容疑者」の音楽を担当します！",
  },
  {
    date: "2023.01.12",
    title: "「ガラパゴス」の音楽を担当します！",
  },
  {
    date: "2022.12.29",
    title: "ゆくモンくるモン'22→'23 ～Music Night～",
  },
  {
    date: "2022.09.02",
    title: "全国高等学校総合体育大会開会式、公開演技「Great Journey」Director's Cut 完成！！",
  },
  {
    date: "2022.09.02",
    title: "「善人長屋」のサウンドトラック配信・発売！",
  },
  {
    date: "2022.08.03",
    title: "インターハイ見逃し配信のお知らせ",
  },
  {
    date: "2022.07.25",
    title: "高校総体総合開会式まであとわずか！！",
  },
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

async function postNews(item) {
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
  console.log(`  microCMS News 一括登録`);
  console.log(`  モード: ${DRY_RUN ? "DRY RUN（確認のみ）" : "本番登録"}`);
  console.log(`  対象件数: ${NEWS.length}件`);
  console.log(`========================================\n`);

  console.log("📡 既存データを確認中...");
  const existingTitles = await fetchExistingTitles();
  console.log(`   既存件数: ${existingTitles.size}件\n`);

  const toRegister = NEWS.filter((n) => !existingTitles.has(n.title));
  const toSkip = NEWS.filter((n) => existingTitles.has(n.title));

  if (toSkip.length > 0) {
    console.log(`⏭️  スキップ（既に登録済み）: ${toSkip.length}件`);
    toSkip.forEach((n) => console.log(`   - ${n.date} ${n.title}`));
    console.log();
  }

  if (toRegister.length === 0) {
    console.log("✅ 登録対象なし。全件すでに登録済みです。");
    return;
  }

  console.log(`📋 登録予定: ${toRegister.length}件`);
  toRegister.forEach((n, i) => {
    console.log(`   ${i + 1}. ${n.date} | ${n.title}`);
  });
  console.log();

  if (DRY_RUN) {
    console.log("🔍 DRY RUN モードのため、実際の登録はスキップしました。");
    console.log("   本番登録する場合: DRY_RUN=false node --env-file=.env.local scripts/import_news.js");
    return;
  }

  let successCount = 0;
  let failCount = 0;

  for (const item of toRegister) {
    try {
      await postNews(item);
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
