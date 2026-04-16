export type Service = {
  id: string;
  title: string;
  subtitle: string;
  number: string;
  icon: string;
  description: string;
  concerns: string[];
  features: { title: string; description: string }[];
};

export const services: Service[] = [
  {
    id: "management-consulting",
    title: "経営診断・コンサルティング",
    subtitle: "現状を見える化し、次の一手を明確に",
    number: "01",
    icon: "📊",
    description: "決算書や業務フローを分析し、経営の現状を「見える化」。課題の優先順位と具体的な改善策を一緒に考えます。",
    concerns: ["何から手をつけていいか分からない", "売上は伸びているのに利益が出ない", "社員に危機感が伝わらない"],
    features: [
      { title: "決算書分析", description: "財務データから経営の健康状態を診断します" },
      { title: "業務フロー改善", description: "ムダな工程を特定し、効率化を提案します" },
      { title: "アクションプラン策定", description: "優先順位をつけた改善計画を一緒に作ります" },
    ],
  },
  {
    id: "business-turnaround",
    title: "事業再生・経営改善",
    subtitle: "売上回復と資金繰り改善を実現",
    number: "02",
    icon: "🔄",
    description: "売上が落ちてきた、資金繰りが厳しい——そんな状況でも、再建計画の策定から実行まで伴走します。",
    concerns: ["売上が年々下がっている", "資金繰りが苦しくなってきた", "銀行への説明がうまくできない"],
    features: [
      { title: "再建計画策定", description: "金融機関にも説明できる実行可能な計画を作成します" },
      { title: "資金繰り改善", description: "キャッシュフローを見直し、資金繰りを安定させます" },
      { title: "コスト構造見直し", description: "固定費・変動費を分析し、利益体質に転換します" },
    ],
  },
  {
    id: "ma-succession",
    title: "M&A仲介・事業承継支援",
    subtitle: "会社の想いをつなぐ、最適な引き継ぎ方",
    number: "03",
    icon: "🤝",
    description: "後継者がいない、息子に継がせたいがどう進めれば——事業承継・M&Aの全プロセスをサポートします。",
    concerns: ["後継者がいない", "息子に継がせたいが進め方が分からない", "会社を売るべきか迷っている"],
    features: [
      { title: "承継方針の整理", description: "親族承継・社員承継・M&A、最適な方法を一緒に考えます" },
      { title: "企業価値算定", description: "会社の適正な価値を算定します" },
      { title: "買い手探し・交渉", description: "最適な相手先探しから条件交渉まで代行します" },
    ],
  },
  {
    id: "pmi-support",
    title: "PMI・承継後の経営支援",
    subtitle: "引き継いだあとの不安を解消",
    number: "04",
    icon: "🚀",
    description: "M&A後・承継後の統合作業から、新経営体制の安定化まで支援します。",
    concerns: ["会社を引き継いだが経営が不安", "従業員との関係づくりに悩んでいる", "前経営者のやり方からうまく切り替えられない"],
    features: [
      { title: "統合計画策定", description: "組織・制度・文化の統合を計画的に進めます" },
      { title: "経営体制構築", description: "新体制での意思決定の仕組みを整えます" },
      { title: "従業員コミュニケーション", description: "従業員の不安を解消し、一体感を醸成します" },
    ],
  },
];
