# 生成サイト用 CLAUDE.md テンプレート

生成されるサイトの CLAUDE.md に以下の内容を設置する。
これがエージェントの「Guide（事前制御）」として機能し、
イテレーション中の逸脱を防ぐ。

---

## テンプレート本文（以下をそのまま設置）

```markdown
# {{COMPANY_NAME}} コーポレートサイト

## Tech Stack
- Astro 6 + @astrojs/cloudflare
- Tailwind CSS v4, TypeScript strict
- Fonts: Noto Sans JP (body) + Source Sans 3 (heading)

## 建築制約（絶対に違反してはならない）

### レイアウト
- セクションpadding: py-20 (80px) 以上。絶対に py-16 以下にしない
- コンテンツ幅: max-w-[1080px] mx-auto。絶対に変更しない
- カード角丸: rounded-xl (12px)。rounded-lg や rounded-md にしない
- ヘッダー: sticky top-0 z-50。position を変えない

### タイポグラフィ
- H1 > H2 > H3 > p のfont-sizeは単調減少。逆転禁止
- 本文 line-height: leading-loose (2.0) 以上。leading-relaxed にしない
- font-family: --font-body (Noto Sans JP) を本文に使用。変更禁止

### カラー
- primary: {{PRIMARY_COLOR}} — Hero背景、Footer背景、テキスト
- accent: {{ACCENT_COLOR}} — CTAボタン、リンク、強調
- 同じ背景色のセクションを2つ連続させない

### コンポーネント
- Header, Footer, SectionHeading, CtaSection は共有コンポーネント
- 変更時は全ページへの影響を確認すること
- コンポーネントのpropsインターフェースを勝手に変えない

### データ
- 全コンテンツは src/data/*.ts が正。ページに直書きしない
- 型定義を変更する場合、既存データとの互換性を保つ

### コピーライティング
- 業種: {{INDUSTRY_LABEL}}
- ターゲット: {{TARGET_CUSTOMER}}
- 判断基準: 「{{TARGET_CUSTOMER}}が読んで、{{CTA_ACTION}}したくなるか？」
- NG: ポエム（「想いをつなぐ」「未来を創造」）、業界用語の多用
- OK: 顧客の言葉 + 具体的に何をしてくれるか

## Quality Gates
各イテレーション完了時に必ず実行:
1. `npm run build` エラーゼロ
2. `npx astro check` 型エラーゼロ
3. レスポンシブ確認: 375px / 768px / 1280px
4. タイポグラフィ階層: H1 > H2 > H3 > p

## Conventional Commits
- feat: 新機能・新セクション追加
- improve: デザイン・コピー改善
- fix: バグ修正
- docs: ドキュメント追加
```
