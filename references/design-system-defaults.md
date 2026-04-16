# デザインシステムデフォルト

既存HPからブランドカラーを抽出できなかった場合に使用するフォールバック値。
enridge-websiteで実績のあるパレットをベースにしている。

---

## デフォルトカラーパレット

```css
@theme {
  /* Primary: ダークネイビー — 信頼感・プロフェッショナル */
  --color-primary: #1a1a2e;
  /* Accent: オレンジ — CTAボタン・強調 */
  --color-accent: #e67e22;
  --color-accent-hover: #d35400;
  /* Backgrounds */
  --color-bg: #FAFAFA;
  --color-surface: #FFFFFF;
  --color-card-bg: #f8f9fa;
  /* Text */
  --color-text: #1a1a2e;
  --color-text-sub: #6b7280;
  /* Border */
  --color-border: #e5e7eb;
}
```

---

## 業種別推奨パレット

ブランドカラーが抽出できた場合はそれを使用。
できなかった場合、業種に応じて以下から選択:

### コンサルティング・士業
```
Primary: #1a1a2e (ネイビー)    Accent: #e67e22 (オレンジ)
```
信頼感のあるネイビーに、行動を促すオレンジの組み合わせ。

### IT・テック
```
Primary: #0f172a (ダークブルー)  Accent: #3b82f6 (ブルー)
```
先進的で清潔感のある配色。

### 医療・福祉
```
Primary: #064e3b (ダークグリーン) Accent: #10b981 (エメラルド)
```
安心感と清潔さを表現。

### 建設・製造
```
Primary: #1e293b (スレートダーク) Accent: #f59e0b (アンバー)
```
堅実さと活力の組み合わせ。

### 飲食・サービス
```
Primary: #44403c (ストーン)     Accent: #ef4444 (レッド)
```
温かみのある配色。

---

## タイポグラフィ

### フォントスタック
```css
@theme {
  --font-body: "Noto Sans JP", sans-serif;
  --font-heading: "Source Sans 3", sans-serif;
}
```

### サイズ階層
| 要素 | モバイル | デスクトップ | ウェイト |
|------|---------|------------|---------|
| H1 | 30px (text-3xl) | 48px (text-5xl) | 700 (bold) |
| H2 | 24px (text-2xl) | 30px (text-3xl) | 700 (bold) |
| H3 | 20px (text-xl) | 22px | 700 (bold) |
| 本文 | 16px (text-base) | 18-20px (text-lg) | 400 (regular) |
| サブテキスト | 14px (text-sm) | 14px (text-sm) | 400 (regular) |

### 行間・字間
```
本文 line-height: >= 1.8 (leading-relaxed〜loose)
見出し line-height: 1.3〜1.4 (leading-tight)
サブタイトル letter-spacing: 0.1em (tracking-widest)
```

---

## レイアウト定数

| プロパティ | 値 | Tailwindクラス |
|-----------|-----|---------------|
| 最大幅（外枠） | 1440px | max-w-[1440px] |
| コンテンツ幅 | 1080px | max-w-[1080px] |
| セクションpadding | 80px | py-20 |
| セクションpx | 16px | px-4 |
| カード角丸 | 12px | rounded-xl |
| カードシャドウ | small | shadow-sm |
| ヘッダー高さ | 80px (mobile) / 96px (desktop) | h-20 md:h-24 |
| フッターpadding | 64px | py-16 |
| グリッドgap | 24px (mobile) / 32px (desktop) | gap-6 md:gap-8 |

---

## ブレークポイント

| 名前 | 幅 | カラム数 |
|------|-----|---------|
| mobile | < 768px | 1 |
| tablet | 768px〜1023px | 2 |
| desktop | >= 1024px | 3〜4 |

---

## セクション背景パターン

ページ内のセクションは以下の背景色を交互に使い分ける:

1. Hero: `bg-primary text-white`（ダーク背景）
2. セクション1: `bg-bg`（白/ライトグレー）
3. セクション2: `bg-surface`（白）
4. セクション3: `bg-card-bg`（薄グレー）
5. CTA: `bg-primary text-white`（ダーク背景）
6. ...以降繰り返し

ルール: 同じ背景色が2セクション連続しないこと。
