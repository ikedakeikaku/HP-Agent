# 品質センサー（Feedback Controls）

イテレーションの各ステップで自動実行し、数値ベースで Pass/Fail を判定するセンサー群。
SKILL.md の Phase 4 から呼び出す。

---

## Sensor 1: ビルドセンサー

```bash
npm run build 2>&1
```
- 判定: exit code 0 → PASS、それ以外 → FAIL
- FAIL時: エラーメッセージを読み、修正して再実行（最大3回）

## Sensor 2: 型チェックセンサー

```bash
npx astro check 2>&1
```
- 判定: エラー0件 → PASS
- FAIL時: 型エラーを修正

## Sensor 3: タイポグラフィセンサー

preview_inspect で以下を測定:

```
H1: preview_inspect("h1", ["font-size", "font-weight", "line-height"])
H2: preview_inspect("h2", ["font-size", "font-weight", "line-height"])
H3: preview_inspect("h3", ["font-size", "font-weight", "line-height"])
p:  preview_inspect("p.text-text-sub", ["font-size", "line-height"])
```

判定ルール:
- H1.fontSize > H2.fontSize > H3.fontSize > p.fontSize → PASS
- p.lineHeight / p.fontSize >= 1.8 → PASS
- いずれか違反 → FAIL + 違反箇所を報告

## Sensor 4: レスポンシブセンサー

3ビューポートでスクリーンショットを撮り、snapshot でDOM構造を確認:

```
preview_resize(width=375, height=812)   → screenshot + snapshot
preview_resize(width=768, height=1024)  → screenshot + snapshot
preview_resize(width=1280, height=800)  → screenshot + snapshot
```

判定ルール:
- 全ビューポートで水平スクロールバーなし → PASS
- header, main, footer が全ビューポートに存在 → PASS
- モバイルでハンバーガーメニューが存在 → PASS

## Sensor 5: セクションpadding センサー

全セクションの padding-top / padding-bottom を測定:

```
for each section:
  preview_inspect("section:nth-of-type({N})", ["padding-top", "padding-bottom"])
```

判定ルール:
- 全セクションの padding-top >= 64px（py-16 相当）→ PASS
- 主要セクションの padding-top >= 80px（py-20 相当）→ 推奨

## Sensor 6: CTA配置センサー

snapshot でCTAリンクの存在を確認:

```
preview_snapshot() → 以下を検索:
- header 内に /contact/ へのリンク
- hero section 内に /contact/ へのリンク
- 最終セクション（CTA）に /contact/ へのリンク
```

判定ルール:
- 3箇所全てにCTA → PASS (9/10)
- 2箇所 → PASS (7/10)
- 1箇所以下 → FAIL

## Sensor 7: アクセシビリティセンサー

snapshot でセマンティクスを確認:

```
preview_snapshot() → 以下をチェック:
- banner (header) 存在
- main 存在
- contentinfo (footer) 存在
- navigation 存在
- 見出し階層: h1 → h2 → h3（飛ばしなし）
- img に alt 属性
- form input に label
```

判定ルール:
- ランドマーク全存在 + 見出し順序正 → PASS
- いずれか欠如 → FAIL + 欠如箇所を報告

---

## 統合実行手順

各イテレーションの VERIFY ステップで以下を順に実行:

```
1. Sensor 1 (ビルド)     → FAIL なら即修正
2. Sensor 2 (型チェック)  → FAIL なら即修正
3. Sensor 3 (タイポ)     → 数値を記録、FAIL なら修正
4. Sensor 4 (レスポンシブ) → スクショ確認、FAIL なら修正
5. Sensor 5 (padding)    → 数値を記録
6. Sensor 6 (CTA)       → 配置確認
7. Sensor 7 (a11y)      → セマンティクス確認
```

全 Sensor PASS → iteration-log.md に「ALL SENSORS PASS」を記録
いずれか FAIL → 修正してから再測定、3回失敗でイテレーション終了

---

## スコア自動算出ルール

各次元のスコアは以下のセンサー結果から算出:

| 次元 | 構成センサー | スコア計算 |
|------|-----------|----------|
| デザイン品質 | S3(タイポ) + S5(padding) + スクショ | 自動50% + AI目視50% |
| コピーライティング | — | AI評価100%（自動化不可） |
| 技術品質 | S1(ビルド) + S2(型) + S3(タイポ) + S4(レスポンシブ) | 自動100% |
| アクセシビリティ | S7(a11y) | 自動80% + AI補完20% |
| コンバージョン | S6(CTA) | 自動50% + AI評価50% |
