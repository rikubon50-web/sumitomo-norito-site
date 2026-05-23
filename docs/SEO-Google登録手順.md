# Google検索への登録 & SEO 手順書

住友紀人 公式サイト（Next.js / Vercel）を Google 検索に登録し、SEOを有効化するための手順です。
**コード側の対応（sitemap・robots・構造化データ等）は実装済み**です。残りはあなたの操作（Google側＋デプロイ設定）になります。

---

## 0. まず本番に反映する（必須）

今回のSEO対応はコード変更です。本番サイトに反映するには **デプロイ（git push → Vercel 自動デプロイ）** が必要です。

反映後、以下が公開されます。
- `https://www.norihito-mimi-sumitomo.com/sitemap.xml`
- `https://www.norihito-mimi-sumitomo.com/robots.txt`

ブラウザで上記2つを開いて表示されればOKです。

---

## 1. Google Search Console にプロパティを作成

1. https://search.google.com/search-console/ にアクセス（住友さん管理のGoogleアカウントでログイン）
2. 「プロパティを追加」をクリック
3. プロパティタイプは **「ドメイン」** を推奨
   - `norihito-mimi-sumitomo.com` と入力（`www`・`https`は付けない）
   - → www有り/無し、http/https をまとめて1つで管理できる（おすすめ）
   - ※ DNS設定が難しい場合は「URLプレフィックス」で `https://www.norihito-mimi-sumitomo.com` を選んでもOK

---

## 2. 所有権の確認（どちらか1つ）

### 方法A：DNS（ドメインプロパティの場合・推奨）
1. Search Console が表示する **TXTレコード**（`google-site-verification=xxxx`）をコピー
2. ドメインを管理しているサービス（お名前.com / Cloudflare / Vercel Domains 等）のDNS設定で **TXTレコードを追加**
3. 反映後（数分〜最大数時間）、Search Console で「確認」を押す

### 方法B：HTMLタグ（URLプレフィックスの場合・コード連携済み）
コードに認証タグを差し込む仕組みを用意済みです。
1. Search Console の「HTMLタグ」方式で表示される `content="..."` の **値（トークン）だけ**をコピー
   - 例：`<meta name="google-site-verification" content="ABCD1234..." />` の `ABCD1234...` 部分
2. **Vercel** のプロジェクト → Settings → Environment Variables に追加：
   ```
   GOOGLE_SITE_VERIFICATION = ABCD1234...（コピーした値）
   ```
3. **再デプロイ**（Vercelで Redeploy、またはgit push）
4. Search Console で「確認」を押す
   - ※ 反映後、ページのソースに `<meta name="google-site-verification" ...>` が出力されます

---

## 3. サイトマップを送信

1. Search Console 左メニュー →「サイトマップ」
2. 「新しいサイトマップの追加」に次を入力して送信：
   ```
   sitemap.xml
   ```
   （プロパティのURL配下なので、フルパスは `https://www.norihito-mimi-sumitomo.com/sitemap.xml`）
3. ステータスが「成功しました」になればOK（検出URLは現在 **約56件**）

---

## 4. インデックス登録をリクエスト（任意・早めたい場合）

1. Search Console 上部の検索窓に `https://www.norihito-mimi-sumitomo.com/` を入力
2. 「URL検査」→「インデックス登録をリクエスト」
3. 主要ページ（トップ / profile / works など）で同様に実施

> 通常、サイトマップ送信後 数日〜2週間ほどで順次インデックスされます。

---

## 環境変数まとめ（Vercel）

| 変数名 | 用途 | 必須 |
|---|---|---|
| `GOOGLE_SITE_VERIFICATION` | Search Console のHTMLタグ認証（方法Bを使う場合のみ） | 任意 |
| `NEXT_PUBLIC_SITE_URL` | 正規URLの上書き（未設定なら `https://www.norihito-mimi-sumitomo.com` を使用） | 任意 |

---

## 実装済みのSEO対応（参考）

- **sitemap.xml**：静的ページ＋works/blog/newsの全詳細を自動生成（1時間ごと更新）
- **robots.txt**：全クロール許可＋sitemap参照（`/api/` は除外）
- **metadataBase**：OG画像・canonical を絶対URL化
- **canonical**：全ページに正規URLを付与（重複防止）
- **構造化データ(JSON-LD)**：
  - トップ：`WebSite` ＋ `Person`（作曲家・SNSリンク）
  - works詳細：`CreativeWork`、blog詳細：`BlogPosting`、news詳細：`NewsArticle`
  - 各詳細ページに `BreadcrumbList`（パンくず）
- **OGP / Twitterカード**：各ページのタイトル・説明・画像
- **パフォーマンス**：Google Fontsの`@import`（描画ブロック）を `next/font` の自己ホストに変更（表示速度・CLS改善）

### 確認に使えるツール
- リッチリザルトテスト：https://search.google.com/test/rich-results
- PageSpeed Insights：https://pagespeed.web.dev/

---

## 補足：コンテンツSEOの提案（任意）
現状サイトは画像中心でテキストが少なめです。検索流入を増やすには、profile/worksの説明文を充実させる、blog記事を継続的に追加する、works各ページに楽曲・作品の背景テキストを加える、などが効果的です。
