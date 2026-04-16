---
name: create-hp
description: >
  既存HPのURLと会社情報（Notion等）から、Astro + Tailwindの
  コーポレートサイトを自動生成し、10〜15回のイテレーションで
  デザインとコピーライティングを磨き上げるエージェント。
  ハーネスエンジニアリングのGenerator-Criticループを採用。
  トリガー: 「HPを作って」「ホームページを作成」「create-hp」
  「ウェブサイトを制作」「サイトをリニューアル」「コーポレートサイト」
argument-hint: "<既存HPのURL> [NotionページURL]"
---

# HP自動制作エージェント

既存HPのURLと会社情報から、プロ品質のコーポレートサイトを自動生成し、
15回のイテレーションでデザインとコピーを磨き上げる。

**参照ディレクトリ**: `/Users/ikedatetsuro/dev/HP-Agent/`
このディレクトリ内の `references/` と `templates/` を参照しながら作業する。

---

## Phase 1: 情報収集

### 1-1. 引数の解析

ユーザーの入力から以下を抽出:
- `TARGET_URL`: 既存HPのURL（必須）
- `NOTION_URL`: NotionページのURL（オプション）
- `OUTPUT_DIR`: 出力先ディレクトリ（デフォルト: 現在のディレクトリに `generated-site/`）

引数が不足している場合はユーザーに確認する。

### 1-2. 既存HPのスクレイピング

WebFetch で以下の情報を取得:

```
WebFetch(TARGET_URL) → 以下を抽出:
- 会社名
- 事業内容・サービス
- キャッチコピー・タグライン
- ナビゲーション構成
- CTA文言
- 連絡先（メール、電話、住所）
- ターゲット顧客像
- 色使い（可能なら背景色・テキスト色・アクセント色を推定）
```

ナビゲーションリンクからサブページURLを特定し、主要ページもフェッチ:
- /about, /company 等 → 会社情報
- /services, /business 等 → サービス情報
- /contact 等 → 連絡先情報

### 1-3. Notion情報の取得（オプション）

NOTION_URL が指定されている場合:
```
notion-fetch(NOTION_URL) → 会社情報を取得
```
Notionのデータはスクレイピング結果より優先する（ユーザーが意図的に提供した情報のため）。

### 1-4. 業種の判定

収集した情報から業種カテゴリを判定する。以下の分類から最も近いものを選択:

| カテゴリ | 例 | CTAモデル | schema.org type |
|---------|-----|---------|-----------------|
| consulting | コンサル、士業、アドバイザリー | 無料相談 | ProfessionalService |
| medical | クリニック、歯科、整骨院 | 予約・来院 | MedicalBusiness |
| restaurant | 飲食店、カフェ、バー | 予約・注文 | Restaurant |
| it-service | SaaS、Web制作、IT企業 | 資料請求・無料トライアル | SoftwareApplication |
| manufacturing | 製造業、メーカー | 見積依頼・問い合わせ | Organization |
| retail | 小売、ECサイト、店舗 | 来店・購入 | LocalBusiness |
| construction | 建設、工務店、リフォーム | 見積・相談 | HomeAndConstructionBusiness |
| education | 塾、スクール、研修 | 体験・申込 | EducationalOrganization |
| beauty | 美容室、エステ、ネイル | 予約 | HealthAndBeautyBusiness |
| legal | 弁護士、司法書士 | 相談予約 | LegalService |
| other | その他 | お問い合わせ | LocalBusiness |

**業種によって以下が変わる:**
- CTA文言とアクション（「無料相談」「予約する」「見積依頼」「資料請求」等）
- schema.org の @type
- コピーライティングのトーン
- デフォルトカラーパレット
- ページ構成（メニューページ、施術一覧、製品カタログ等）

### 1-5. 会社プロファイルの統合

取得した情報を統合し、`{OUTPUT_DIR}/progress/company-profile.json` に保存:

```json
{
  "companyName": "株式会社Example",
  "companyNameEn": "Example Inc.",
  "industryCategory": "consulting",
  "industryLabel": "経営コンサルティング",
  "targetCustomer": "中小企業経営者",
  "location": "東京都渋谷区...",
  "email": "info@example.com",
  "phone": "03-xxxx-xxxx",
  "representative": "山田太郎",
  "tagline": "...",
  "description": "...",
  "services": [...],
  "strengths": [...],
  "faq": [...],
  "cta": {
    "primaryText": "無料相談に申し込む",
    "primaryHref": "/contact/",
    "secondaryText": "サービスを見る",
    "secondaryHref": "/services/"
  },
  "schemaType": "ProfessionalService",
  "brandColors": {
    "primary": "#1a1a2e",
    "accent": "#e67e22"
  },
  "sourceUrl": "https://example.com"
}
```

**業種別CTA文言のデフォルト:**

| カテゴリ | 主CTA | 副CTA |
|---------|------|------|
| consulting | 無料相談に申し込む | サービスを見る |
| medical | 診療予約をする | 診療内容を見る |
| restaurant | 席を予約する | メニューを見る |
| it-service | 資料をダウンロード | プランを見る |
| manufacturing | 見積を依頼する | 製品一覧を見る |
| retail | 商品を見る | 店舗情報 |
| construction | 無料見積を依頼 | 施工事例を見る |
| education | 無料体験に申し込む | コースを見る |
| beauty | ネット予約する | メニュー・料金 |
| legal | 無料相談を予約する | 取扱分野を見る |

ブランドカラーが抽出できない場合、`references/design-system-defaults.md` の
業種別推奨パレットからフォールバック値を選択する。

### 1-6. ユーザー確認

収集した情報のサマリーをユーザーに提示し、確認を得る:
- 会社名・事業内容が正しいか
- **業種カテゴリの判定が正しいか**（CTAやページ構成に影響するため重要）
- 主要サービスの漏れがないか
- ターゲット顧客像の認識が合っているか
- CTA文言が適切か

---

## Phase 2: プロジェクト生成

### 2-1. Astroプロジェクトの作成

```bash
cd {OUTPUT_DIR}
npm create astro@latest . -- --template minimal --no-install --typescript strict
```

### 2-2. 依存パッケージのインストール

```bash
npm install astro@latest @astrojs/cloudflare @astrojs/sitemap
npm install -D tailwindcss @tailwindcss/vite typescript
```

### 2-3. 設定ファイルの生成

`/Users/ikedatetsuro/dev/HP-Agent/templates/` を参照しながら以下を生成:

1. **astro.config.mjs** — `templates/astro.config.mjs` をベースに、`{{SITE_URL}}` を会社URLに置換
2. **tsconfig.json** — `{ "extends": "astro/tsconfigs/strict" }`
3. **wrangler.jsonc** — Cloudflare Workers 設定
4. **src/styles/global.css** — `templates/global.css` をベースに、ブランドカラーで `{{...}}` を置換
5. **.claude/launch.json** — `templates/launch.json` をそのまま配置

### 2-4. データファイルの生成

`references/astro-patterns.md` の型定義に従い、Phase 1 で収集した情報を構造化:

- `src/data/company.ts` — 会社基本情報
- `src/data/services.ts` — サービス一覧（型定義 + データ）
- `src/data/team.ts` — チームメンバー（情報があれば）
- `src/data/faq.ts` — よくある質問
- `src/data/reasons.ts` — 選ばれる理由（3-4項目を生成）
- `src/data/cases.ts` — 実績・事例（情報があれば）

**コピーライティング重要**: データファイルのテキストは「ターゲット顧客が読んで問い合わせしたくなるか」を基準に書く。
NG: ポエム、業界用語の多用、抽象的な自社アピール
OK: 顧客の悩みに寄り添い、具体的に何をしてくれるかを伝える

### 2-5. コンポーネントの生成

`/Users/ikedatetsuro/dev/HP-Agent/templates/` を参照しながら以下を生成:

- `src/layouts/Layout.astro` — `templates/Layout.astro` ベース
- `src/components/Header.astro` — `templates/Header.astro` ベース、navItemsをカスタマイズ
- `src/components/Footer.astro` — `templates/Footer.astro` ベース、footerLinksをカスタマイズ
- `src/components/SectionHeading.astro` — `templates/SectionHeading.astro` そのまま
- `src/components/CtaSection.astro` — `templates/CtaSection.astro` ベース、デフォルト文言をカスタマイズ

### 2-6. ページの生成

`references/astro-patterns.md` のページ構成パターンに従い、**業種に応じてページ構成を変える**:

#### 共通ページ（全業種）
- `src/pages/index.astro` — トップページ
- `src/pages/about.astro` — 会社紹介
- `src/pages/contact/index.astro` — お問い合わせ / 予約 / 見積依頼
- `src/pages/privacy.astro` — プライバシーポリシー

#### 業種別ページ
| カテゴリ | 追加ページ | トップのセクション構成 |
|---------|-----------|-------------------|
| consulting | /services/[id]/ | Hero → サービス → お悩み → 理由 → フロー → 実績 → チーム → FAQ → CTA |
| medical | /departments/, /doctors/ | Hero → 診療科目 → 医師紹介 → アクセス → 予約案内 → FAQ → CTA |
| restaurant | /menu/, /access/ | Hero → こだわり → メニュー → 店舗情報 → アクセス → 予約 → CTA |
| it-service | /services/[id]/, /pricing/ | Hero → 課題 → サービス → 料金プラン → 導入事例 → FAQ → CTA |
| manufacturing | /products/[id]/ | Hero → 製品一覧 → 技術力 → 設備 → 品質管理 → 見積フロー → CTA |
| construction | /works/, /flow/ | Hero → 施工事例 → 特徴 → 施工の流れ → お客様の声 → FAQ → CTA |
| beauty | /menu/, /staff/ | Hero → メニュー・料金 → スタッフ → サロン紹介 → アクセス → 予約 → CTA |
| education | /courses/, /instructors/ | Hero → コース一覧 → 講師紹介 → 受講の流れ → 受講者の声 → FAQ → CTA |
| その他 | /services/ | Hero → サービス → 強み → 実績 → チーム → FAQ → CTA |

各ページは `references/astro-patterns.md` のセクション構成パターンに厳密に従う:
- セクション: `<section class="py-20 px-4"><div class="max-w-[1080px] mx-auto">...</div></section>`
- 背景色: セクションごとに白/グレー/ダーク交互

### 2-7. 静的ファイル

- `public/favicon.svg` — シンプルなSVGファビコン
- `public/robots.txt` — 基本的なrobots.txt

### 2-8. 初期コミット

```bash
git init
git add -A
git commit -m "feat: initial site generation from {TARGET_URL}"
```

---

## Phase 3: 初期ビルド確認

### 3-1. ビルド確認

```bash
npm run build
```

エラーがあれば修正。主な問題:
- import パスの間違い → 修正
- 型エラー → 型定義の修正
- Tailwindクラスの警告 → 無視可能

### 3-2. 開発サーバー起動

```
preview_start("hp-dev")
```

### 3-3. 初期スクリーンショット

```
preview_resize(preset="desktop")  → preview_screenshot()
preview_resize(preset="mobile")   → preview_screenshot()
```

スクリーンショットを確認し、明らかな問題があれば即座に修正。

---

## Phase 4: イテレーション改善ループ

**このフェーズがエージェントの核心。**

`/Users/ikedatetsuro/dev/HP-Agent/references/iteration-playbook.md` を必ず読み、
15回のイテレーションスケジュールに従って改善を進める。

### 各イテレーションの手順

```
Step 1: READ
  progress/iteration-log.md を読む（存在しない場合はスキップ）
  前回のイテレーションで何を変更し、何を学んだかを確認
  「DO NOT REVERT」マーカーが付いた変更を把握

Step 2: FOCUS
  iteration-playbook.md の今回のフォーカスエリアを確認
  対象ファイルと評価次元を特定

Step 3: OBSERVE
  preview_resize(preset="desktop") → preview_screenshot()
  preview_resize(preset="mobile")  → preview_screenshot()
  フォーカスエリアに関連するCSSプロパティを preview_inspect で測定:
  - デザイン系: padding, margin, border-radius, background-color, color
  - タイポ系: font-size, font-weight, line-height, font-family
  - レスポンシブ系: width, display, flex-direction

Step 4: JUDGE
  evaluation-rubric.md の該当次元で現在のスコアを付ける
  具体的な根拠（inspect結果、screenshot所見）を記録

Step 5: PRESCRIBE
  具体的な改善点を3〜5個リストアップ
  各改善点は「何を」「どう変える」「なぜ」を明記
  例: 「H3のfont-sizeが18pxでH2(30px)との差が大きすぎる → 22pxに変更」

Step 6: ACT
  Edit ツールで対象ファイルを修正
  ルール:
  - 最小限の変更（必要な箇所だけ）
  - コンポーネント変更時は全使用箇所を確認
  - 1イテレーションで変更するファイルは最大5つ
  - データ(src/data/)とレイアウト(src/pages/)を同時に大幅変更しない

Step 7: BUILD
  npm run build
  失敗した場合:
  - エラーメッセージを読み、修正
  - 最大3回リトライ
  - 3回失敗したらロールバック（git checkout -- .）して次のイテレーションへ

Step 8: VERIFY
  preview_screenshot() で改善を視覚的に確認
  悪化していないか、意図通りの変更になっているか確認

Step 9: COMMIT
  git add -A
  git commit -m "improve: iteration {N} - {フォーカスエリア名}"

Step 10: LOG
  progress/iteration-log.md に以下を追記:
  ## Iteration {N}: {フォーカスエリア名}
  ### スコア
  | 次元 | スコア | 前回比 |
  ### 変更内容
  - [変更1] <!-- DO NOT REVERT -->
  - [変更2]
  ### 学び
  - [次のイテレーションへの申し送り]
```

### 早期終了条件

以下のいずれかを満たしたら Phase 5 へ進む:
1. 全5次元が閾値以上（デザイン>=7, コピー>=7, 技術>=7, ア11>=6, CV>=6）
2. 2回連続でどの次元もスコア上昇なし
3. ビルド失敗が3回連続

---

## Phase 5: 最終評価

### 5-1. 全次元スコアリング

`/Users/ikedatetsuro/dev/HP-Agent/references/evaluation-rubric.md` の全5次元で
最終スコアを算出。

### 5-2. スクリーンショット保存

```
preview_resize(preset="desktop") → preview_screenshot()  # desktop最終版
preview_resize(preset="mobile")  → preview_screenshot()   # mobile最終版
```

### 5-3. 最終評価レポート

`progress/final-evaluation.md` に以下を出力:

```markdown
# 最終評価レポート

## 総合スコア
| 次元 | スコア | 閾値 | 判定 |
|------|--------|------|------|
| デザイン品質 | X/10 | 7 | PASS/FAIL |
| コピーライティング | X/10 | 7 | PASS/FAIL |
| 技術品質 | X/10 | 7 | PASS/FAIL |
| アクセシビリティ | X/10 | 6 | PASS/FAIL |
| コンバージョン | X/10 | 6 | PASS/FAIL |

## イテレーション回数: {N}

## 主な改善ポイント
1. ...
2. ...
3. ...

## 残存課題
1. ...
2. ...

## 次のステップ
- [ ] 写真素材の差し替え（プレースホルダー→実写真）
- [ ] ドメイン設定
- [ ] Cloudflare Workers へのデプロイ
- [ ] Google Analytics / Search Console の設定
- [ ] お問い合わせフォームのバックエンド接続
```

---

## Phase 6: 完了報告

ユーザーに以下を報告:

1. **最終スコアサマリー** — 5次元のスコア表
2. **実行したイテレーション数** — 何回の改善を行ったか
3. **主要な改善ポイント** — 最も効果があった改善3つ
4. **残存課題** — 人間が対応すべき項目
5. **次のステップ** — デプロイまでに必要な作業

---

## 重要ルール

### コピーライティング最重要基準
**「ターゲット顧客が読んで、次のアクションを取りたくなるか？」**

共通NG: 「想いをつなぐ」「未来を創造」「ソリューション」「最適化」等の抽象表現
共通OK: 顧客の言葉で書く、具体的に何がどうなるか伝える、数字を使う

**業種別のトーン:**
| カテゴリ | 判断基準 | コピーのトーン |
|---------|---------|-------------|
| consulting | 経営者が電話をかけたくなるか？ | 信頼感・専門性・伴走 |
| medical | 患者が安心して来院したくなるか？ | 安心・丁寧・わかりやすさ |
| restaurant | お客が「行きたい」と思うか？ | 食欲・雰囲気・こだわり |
| it-service | 担当者が上司に提案したくなるか？ | 実績・効率化・ROI |
| manufacturing | 発注担当者が見積依頼したくなるか？ | 品質・納期・技術力 |
| construction | 施主が「ここに頼みたい」と思うか？ | 安心・実績・価格の透明性 |
| beauty | 来店予約のボタンを押したくなるか？ | 気軽さ・変化の期待・清潔感 |
| education | 体験申込みしたくなるか？ | 成長実感・講師の信頼性・安心 |

### アンチチャーンルール
1. 前回変更したファイルは追加的変更のみ
2. iteration-log.md を読まずにイテレーション開始しない
3. コンポーネント変更時は全使用箇所を確認
4. 1イテレーション最大5ファイル変更
5. データとプレゼンテーションを同時に大幅変更しない

### デザイン定数
- セクション padding: py-20（80px）以上
- コンテンツ幅: max-w-[1080px]
- カード角丸: rounded-xl（12px）
- 本文 line-height: >= 1.8
- タイポ階層: H1 > H2 > H3 > p（単調減少）
