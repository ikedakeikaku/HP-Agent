# HP Agent — 自動HP制作エージェント

既存HPのURLと会社情報から、Astro + Tailwind CSS のコーポレートサイトを
自動生成し、10〜15回のイテレーションでデザインとコピーを磨き上げるエージェント。

## 使い方

```
/create-hp <既存HPのURL> [NotionページURL]
```

例:
```
/create-hp https://example.co.jp
/create-hp https://example.co.jp https://notion.so/xxx
```

## 仕組み

1. **情報収集**: 既存HPをスクレイピング + Notionから会社情報を取得
2. **初期生成**: Astro 6 + Tailwind CSS 4 のサイトを自動生成
3. **イテレーション改善**: Preview MCP のスクショで視覚評価しながら15回自動改善
4. **最終評価**: 5次元ルーブリックで品質を確認

## Tech Stack（生成サイト）

- Astro 6 + @astrojs/cloudflare
- Tailwind CSS v4, TypeScript strict
- Fonts: Noto Sans JP (body) + Source Sans 3 (logo)
- デプロイ: Cloudflare Workers

## プロジェクト構成

```
HP-Agent/
├── CLAUDE.md                    # この文書
├── skills/create-hp/SKILL.md    # メインスキル
├── references/                  # 評価基準・パターン集
│   ├── evaluation-rubric.md     # 5次元評価ルーブリック
│   ├── iteration-playbook.md    # 15回イテレーション計画
│   ├── design-system-defaults.md # デザイントークンデフォルト
│   └── astro-patterns.md        # Astro生成パターン
└── templates/                   # サイトテンプレート群
    ├── astro.config.mjs
    ├── global.css
    ├── Layout.astro
    ├── Header.astro
    ├── Footer.astro
    ├── SectionHeading.astro
    ├── CtaSection.astro
    └── launch.json
```

## コピーライティング基準

**判断基準: 「ターゲット顧客が読んで、問い合わせしたくなるか？」**
- NG: ポエム（「想いをつなぐ」「未来を創造」）、業界用語の多用
- OK: 顧客の言葉 + 具体的に何をしてくれるか

## 評価基準（閾値）

| 次元 | 閾値 |
|------|------|
| デザイン品質 | 7/10 |
| コピーライティング | 7/10 |
| 技術品質 | 7/10 |
| アクセシビリティ | 6/10 |
| コンバージョン | 6/10 |
