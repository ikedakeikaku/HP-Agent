# Astro生成パターン集

enridge-website（/Users/ikedatetsuro/enridge-website/）から抽出した
コーポレートサイト生成の定石パターン。

---

## 1. プロジェクト構成

```
generated-site/
├── astro.config.mjs        # Cloudflare adapter + Tailwind + Sitemap
├── tsconfig.json            # astro/tsconfigs/strict 拡張
├── wrangler.jsonc           # Cloudflare Workers 設定
├── package.json
├── .claude/launch.json      # Preview MCP 用
├── src/
│   ├── styles/global.css    # @theme デザイントークン
│   ├── layouts/Layout.astro # マスターレイアウト
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── SectionHeading.astro
│   │   ├── CtaSection.astro
│   │   └── Breadcrumb.astro
│   ├── data/
│   │   ├── company.ts       # 会社基本情報
│   │   ├── services.ts      # サービス一覧・詳細
│   │   ├── team.ts          # チームメンバー
│   │   ├── cases.ts         # 実績・事例
│   │   ├── faq.ts           # よくある質問
│   │   └── reasons.ts       # 選ばれる理由
│   └── pages/
│       ├── index.astro      # トップページ
│       ├── about.astro      # 会社紹介
│       ├── services/
│       │   ├── index.astro  # サービス一覧
│       │   └── [id].astro   # サービス詳細
│       ├── contact/
│       │   └── index.astro  # お問い合わせ
│       └── privacy.astro    # プライバシーポリシー
└── public/
    ├── favicon.svg
    ├── robots.txt
    └── images/
```

---

## 2. データファイルの型定義パターン

### company.ts
```typescript
export const company = {
  name: string,       // 「株式会社Example」
  nameEn: string,     // 「Example Inc.」
  established: string, // 「2020年4月1日」
  location: string,   // 「東京都渋谷区...」
  representative: string, // 「山田 太郎」
  services: string,   // 事業内容（コンマ区切り）
  email: string,      // 「info@example.com」
  phone?: string,     // 「03-xxxx-xxxx」
  url?: string,       // 「https://example.com」
};
```

### services.ts（consulting / it-service / legal 等）
```typescript
export type Service = {
  id: string;          // URLスラッグ
  title: string;       // サービス名
  subtitle: string;    // サブタイトル
  number: string;      // 「01」等の表示番号
  painPoint: string;   // 顧客の悩み（1文）
  tagline: string;     // キャッチコピー
  description: string; // 説明文（2-3文）
  icon: string;        // 絵文字アイコン
  features: { title: string; description: string }[];
  concerns: string[];  // 「こんなお悩みはありませんか？」
  detailLead: string;  // 詳細ページの導入文
  flow: { title: string; description: string; duration?: string }[];
  cases: { industry: string; challenge: string; approach: string; result: string }[];
  faq: { question: string; answer: string }[];
  estimate: { duration: string; cost: string; note?: string };
};

export const services: Service[] = [...];
```

### 業種別の代替データモデル

**restaurant → menu.ts**
```typescript
export type MenuItem = {
  id: string;
  category: string;      // 「前菜」「メイン」「ドリンク」
  name: string;
  description: string;
  price: string;         // 「¥1,200」
  isRecommended?: boolean;
  allergens?: string[];
};
```

**medical → departments.ts**
```typescript
export type Department = {
  id: string;
  name: string;          // 「内科」「小児科」
  description: string;
  symptoms: string[];    // 対応する症状
  schedule: string;      // 「月火水金 9:00-12:00 / 14:00-18:00」
};
```

**manufacturing → products.ts**
```typescript
export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  specs: { label: string; value: string }[];
  applications: string[];  // 用途
};
```

**beauty → menus.ts**
```typescript
export type SalonMenu = {
  id: string;
  category: string;      // 「カット」「カラー」「パーマ」
  name: string;
  description: string;
  price: string;
  duration: string;       // 「約60分」
};
```

**construction → works.ts**
```typescript
export type Work = {
  id: string;
  title: string;
  category: string;      // 「新築」「リフォーム」
  area: string;          // 「甲府市」
  description: string;
  cost?: string;         // 「約2,000万円」
};
```

### team.ts
```typescript
export type TeamMember = {
  name: string;
  role: string;
  qualifications: string[];
  bio: string;
  photo?: string; // パス or プレースホルダー
};

export const team: TeamMember[] = [...];
```

### faq.ts
```typescript
export type FaqItem = {
  question: string;
  answer: string;
};

export const faq: FaqItem[] = [...];
```

### reasons.ts
```typescript
export type Reason = {
  number: string;
  title: string;
  description: string;
};

export const reasons: Reason[] = [...];
```

### cases.ts
```typescript
export type Case = {
  industry: string;
  title: string;
  description: string;
  metrics?: { label: string; value: string }[];
};

export const cases: Case[] = [...];
```

---

## 3. ページ構成パターン

### トップページ（index.astro）のセクション構成

```
1. Hero         — bg-primary, H1 + サブテキスト + CTA 2ボタン + 画像
2. バナー       — bg-card-bg, 特典や告知の横長バナー（オプション）
3. サービス概要  — bg-bg, SectionHeading + サービスカード×N
4. 選ばれる理由  — bg-card-bg, SectionHeading + 理由カード×3-4
5. 実績・事例   — bg-bg, SectionHeading + 事例カード×2-3
6. チーム紹介   — bg-surface, SectionHeading + メンバーカード
7. FAQ         — bg-card-bg, SectionHeading + details/summary アコーディオン
8. CTA         — bg-primary, CtaSection コンポーネント
```

### セクションの基本構造
```html
<section class="py-20 px-4">
  <div class="max-w-[1080px] mx-auto">
    <SectionHeading title="..." subtitle="..." />
    <!-- コンテンツ -->
  </div>
</section>
```

---

## 4. コンポーネントインターフェース

### SectionHeading
```html
<div class="text-center mb-12">
  <p class="text-sm font-bold text-accent tracking-widest uppercase mb-2">{subtitle}</p>
  <h2 class="text-2xl md:text-3xl font-bold text-primary">{title}</h2>
</div>
```

### CtaSection
```html
<section class="bg-primary py-20 px-4">
  <div class="max-w-[1080px] mx-auto text-center">
    <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">{headline}</h2>
    <p class="text-gray-300 text-lg mb-10">{subtext}</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="{primaryHref}" class="bg-accent text-white font-bold py-4 px-10 rounded-lg">{primaryText}</a>
      <a href="{secondaryHref}" class="border-2 border-white/30 text-white font-bold py-4 px-10 rounded-lg">{secondaryText}</a>
    </div>
  </div>
</section>
```

### Header
Props: `navItems: { label: string; href: string }[]`, `ctaText`, `ctaHref`, `logoAlt`
- sticky top-0 z-50
- Desktop: 横並びナビ + CTAボタン
- Mobile: ハンバーガーメニュー（inline script で開閉）

### Footer
Props: `footerLinks: { title: string; links: { label: string; href: string }[] }[]`
- bg-primary text-white
- 4カラムグリッド: 会社情報 + リンクセクション×3

---

## 5. Hero パターン

```html
<section class="bg-primary text-white py-24 md:py-32 px-4">
  <div class="max-w-[1080px] mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
    <div class="flex-1">
      <p class="text-sm md:text-base tracking-widest text-gray-400 mb-4">{カテゴリ}</p>
      <h1 class="text-3xl md:text-5xl font-bold leading-tight mb-6">{キャッチコピー}</h1>
      <p class="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">{サブコピー}</p>
      <div class="flex flex-col sm:flex-row gap-4">
        <a href="/contact/" class="bg-accent text-white font-bold py-4 px-8 rounded-lg">{CTA主}</a>
        <a href="/services/" class="border-2 border-white text-white font-bold py-4 px-8 rounded-lg">{CTA副}</a>
      </div>
    </div>
    <div class="w-full md:w-[420px] shrink-0">
      <div class="bg-gray-600 rounded-xl w-full aspect-[3/2] flex items-center justify-center text-gray-400">PHOTO</div>
    </div>
  </div>
</section>
```

---

## 6. カードパターン

### サービスカード
```html
<div class="bg-surface rounded-xl p-8 shadow-sm border border-border">
  <span class="text-3xl mb-4 block">{icon}</span>
  <span class="text-sm text-accent font-bold tracking-wider">{number}</span>
  <h3 class="text-xl font-bold text-primary mt-2 mb-3">{title}</h3>
  <p class="text-text-sub text-sm leading-relaxed mb-4">{description}</p>
  <a href="/services/{id}/" class="text-accent font-bold text-sm hover:underline">詳しく見る →</a>
</div>
```

### 実績カード
```html
<div class="bg-surface rounded-xl p-6 shadow-sm border border-border">
  <span class="text-xs font-bold text-accent tracking-wider">{industry}</span>
  <h3 class="text-lg font-bold text-primary mt-2 mb-2">{title}</h3>
  <p class="text-text-sub text-sm leading-relaxed">{description}</p>
</div>
```

---

## 7. FAQ アコーディオン（CSS-only）

```html
<div class="max-w-3xl mx-auto space-y-4">
  {faq.map((item) => (
    <details class="bg-surface rounded-xl border border-border group">
      <summary class="px-6 py-5 cursor-pointer font-bold text-primary flex justify-between items-center">
        {item.question}
        <span class="text-accent transition-transform group-open:rotate-45 text-xl">+</span>
      </summary>
      <div class="px-6 pb-5 text-text-sub leading-relaxed">{item.answer}</div>
    </details>
  ))}
</div>
```

---

## 8. 構造化データ（JSON-LD）

### FAQPage
```javascript
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};
```

### ビジネス情報（業種に応じて @type を変更）
```javascript
// @type は業種カテゴリに応じて選択:
// consulting → "ProfessionalService"
// medical → "MedicalBusiness"
// restaurant → "Restaurant"
// it-service → "SoftwareApplication" or "ProfessionalService"
// manufacturing → "Organization"
// construction → "HomeAndConstructionBusiness"
// beauty → "HealthAndBeautyBusiness"
// education → "EducationalOrganization"
// legal → "LegalService"
// other → "LocalBusiness"
const businessSchema = {
  "@context": "https://schema.org",
  "@type": "{{SCHEMA_TYPE}}",  // 業種に応じて変更
  name: company.name,
  url: siteUrl,
  email: company.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "...",
    addressLocality: "...",
    addressRegion: "...",
    postalCode: "...",
    addressCountry: "JP",
  },
  description: "...",
  priceRange: "...",  // 業種に応じて（"初回相談無料", "¥1,000〜", etc.）
};
```

ページ内への埋め込み:
```html
<script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />
```

---

## 9. お問い合わせフォームパターン

```html
<form action="/api/contact" method="POST" class="max-w-2xl mx-auto space-y-6">
  <div>
    <label for="name" class="block text-sm font-bold text-primary mb-2">お名前 <span class="text-red-500">*</span></label>
    <input type="text" id="name" name="name" required
      class="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent" />
  </div>
  <div>
    <label for="email" class="block text-sm font-bold text-primary mb-2">メールアドレス <span class="text-red-500">*</span></label>
    <input type="email" id="email" name="email" required
      class="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent" />
  </div>
  <div>
    <label for="phone" class="block text-sm font-bold text-primary mb-2">電話番号</label>
    <input type="tel" id="phone" name="phone"
      class="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent" />
  </div>
  <div>
    <label for="message" class="block text-sm font-bold text-primary mb-2">ご相談内容 <span class="text-red-500">*</span></label>
    <textarea id="message" name="message" rows="5" required
      class="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"></textarea>
  </div>
  <button type="submit"
    class="w-full bg-accent text-white font-bold py-4 rounded-lg hover:bg-accent-hover transition-colors text-lg">
    送信する
  </button>
</form>
```
