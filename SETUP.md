# 住友紀人 オフィシャルサイト - セットアップ手順

## 技術構成

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- microCMS
- Vercel (デプロイ先)

---

## 1. ローカル環境セットアップ

```bash
cd sumitomo-norito-site
npm install
```

## 2. 環境変数の設定

`.env.local.example` をコピーして `.env.local` を作成してください。

```bash
cp .env.local.example .env.local
```

以下の値を設定してください:

```
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

- `MICROCMS_SERVICE_DOMAIN`: microCMS の管理画面URLの `https://xxx.microcms.io` の `xxx` 部分
- `MICROCMS_API_KEY`: microCMS の API設定 → APIキー

## 3. microCMS API 構成

microCMS で以下の **5つの API** を作成してください。

### API 1: `siteSettings` (オブジェクト型)

| フィールドID | 表示名 | 種類 |
|---|---|---|
| siteTitle | サイトタイトル | テキストフィールド |
| siteDescription | サイト説明 | テキストフィールド |
| ogImage | OGP画像 | 画像 |
| heroCatch | ヒーローキャッチコピー | テキストフィールド |
| heroSubCatch | ヒーローサブコピー | テキストフィールド |
| contactEmail | 問い合わせメール | テキストフィールド |
| snsLinks | SNSリンク | 繰り返し(カスタム) |
| footerText | フッターテキスト | テキストエリア |

**snsLinks の繰り返しフィールド:**
- `platform` (テキスト): twitter, instagram, youtube, note 等
- `url` (テキスト): URL
- `label` (テキスト): 表示ラベル（任意）

### API 2: `profile` (オブジェクト型)

| フィールドID | 表示名 | 種類 |
|---|---|---|
| name | 名前 | テキストフィールド |
| englishName | 英語名 | テキストフィールド |
| mainVisual | メインビジュアル | 画像 |
| profileImage | プロフィール写真 | 画像 |
| shortBio | 短い紹介文 | テキストエリア |
| longBio | 長い紹介文 | テキストエリア |
| career | 経歴 | リッチエディタ |
| achievements | 実績 | リッチエディタ |
| socialLinks | SNSリンク | 繰り返し(カスタム) |

### API 3: `works` (リスト型)

| フィールドID | 表示名 | 種類 |
|---|---|---|
| title | タイトル | テキストフィールド |
| slug | スラッグ | テキストフィールド |
| thumbnail | サムネイル | 画像 |
| coverImage | カバー画像 | 画像 |
| excerpt | 概要 | テキストエリア |
| body | 本文 | リッチエディタ |
| year | 制作年 | テキストフィールド |
| role | 担当範囲 | テキストフィールド |
| category | カテゴリ | セレクト(複数) |
| tags | タグ | セレクト(複数) |
| relatedLinks | 関連リンク | 繰り返し(カスタム) |
| galleryImages | ギャラリー画像 | 複数画像 |
| videoUrl | 動画URL | テキストフィールド |
| isFeatured | おすすめ | 真偽値 |

### API 4: `posts` (リスト型)

| フィールドID | 表示名 | 種類 |
|---|---|---|
| title | タイトル | テキストフィールド |
| slug | スラッグ | テキストフィールド |
| thumbnail | サムネイル | 画像 |
| excerpt | 抜粋 | テキストエリア |
| body | 本文 | リッチエディタ |
| postType | 記事タイプ | セレクト: `blog` / `news` |
| category | カテゴリ | セレクト(複数) |
| tags | タグ | セレクト(複数) |
| publishedAt | 公開日 | 日時 |
| isFeatured | おすすめ | 真偽値 |
| externalUrl | 外部リンク | テキストフィールド |

**重要**: `postType` は `blog` と `news` の2値。フロント側でこの値によりBlogページとNewsページに振り分けます。

### API 5: `gallery` (リスト型)

| フィールドID | 表示名 | 種類 |
|---|---|---|
| title | タイトル | テキストフィールド |
| slug | スラッグ | テキストフィールド |
| thumbnail | サムネイル | 画像 |
| type | 種類 | セレクト: `photo` / `video` |
| images | 画像群 | 複数画像 |
| videoUrl | 動画URL | テキストフィールド |
| caption | キャプション | テキストエリア |
| shotDate | 撮影日 | 日時 |
| isFeatured | おすすめ | 真偽値 |

## 4. 開発サーバー起動

```bash
npm run dev
```

http://localhost:3000 でアクセスできます。

## 5. Vercel デプロイ

1. GitHub にリポジトリを作成して push
2. Vercel にログインし、リポジトリをインポート
3. 環境変数を設定:
   - `MICROCMS_SERVICE_DOMAIN`
   - `MICROCMS_API_KEY`
4. デプロイ実行

### Webhook 設定（任意）

microCMS の Webhook 設定で、コンテンツ更新時に Vercel の Deploy Hook URL を呼ぶことで、自動的にサイトを再ビルドできます。

---

## ディレクトリ構成

```
src/
├── app/                    # App Router ページ
│   ├── layout.tsx          # ルートレイアウト
│   ├── page.tsx            # Home
│   ├── globals.css         # グローバルスタイル
│   ├── not-found.tsx       # 404ページ
│   ├── profile/page.tsx
│   ├── works/
│   │   ├── page.tsx        # 一覧
│   │   └── [slug]/page.tsx # 詳細
│   ├── gallery/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── news/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── layout/             # レイアウト系
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/           # ページ固有セクション
│   │   └── Hero.tsx
│   └── ui/                 # 再利用可能UI
│       ├── SectionTitle.tsx
│       ├── RichTextRenderer.tsx
│       ├── ContactCTA.tsx
│       ├── WorkCard.tsx
│       ├── PostCard.tsx
│       ├── NewsList.tsx
│       ├── GalleryGrid.tsx
│       └── PageHeader.tsx
├── lib/
│   ├── microcms.ts         # microCMS クライアント・取得関数
│   └── utils.ts            # ユーティリティ関数
└── types/
    └── microcms.ts         # 型定義
```

## コンテンツ入力の手順

1. **siteSettings** を最初に設定（サイトタイトル、ヒーロー文言、メール、SNS等）
2. **profile** を設定（名前、写真、紹介文、経歴等）
3. **works** に作品を登録（`isFeatured: true` でHomeに表示）
4. **gallery** に写真・動画を登録（`isFeatured: true` でHomeに表示）
5. **posts** にブログ記事・ニュースを投稿（`postType` を `blog` か `news` に設定）

---

## 今後の改善ポイント

### 近い将来
- Tailwind CSS の `@tailwindcss/typography` プラグイン追加でリッチテキスト表示の精度向上
- ISR (Incremental Static Regeneration) のチューニング
- microCMS Webhook による自動デプロイ設定
- サイトマップ自動生成 (`next-sitemap`)
- アナリティクス導入 (Google Analytics / Vercel Analytics)

### 機能拡張
- Works ページにカテゴリ/タグ絞り込みフィルター
- Gallery 詳細ページ (`/gallery/[slug]`)
- Blog のページネーション
- 関連記事の自動表示
- Contact ページにフォーム機能追加 (Google Forms / Formspree / microCMS 連携)
- 多言語対応 (i18n)
- ダークモード/ライトモード切り替え（現在はダーク固定）
- パンくずリストの追加
- SNS シェアボタン
- JSON-LD 構造化データ

### パフォーマンス
- 画像の遅延読み込み最適化
- フォント読み込みの最適化 (`next/font`)
- Core Web Vitals のチューニング
