export type Case = {
  industry: string;
  title: string;
  description: string;
};

export const cases: Case[] = [
  {
    industry: "製造業",
    title: "後継者不在の町工場がM&Aで事業を存続",
    description: "創業40年の金属加工会社。後継者がおらず廃業を検討していたが、M&A仲介により同業他社への譲渡が実現。従業員の雇用も維持されました。",
  },
  {
    industry: "小売業",
    title: "売上回復と資金繰り改善で黒字転換",
    description: "コロナ禍で売上が半減した小売店。経営改善計画の策定と金融機関交渉を支援し、2年で黒字化を達成しました。",
  },
  {
    industry: "建設業",
    title: "親族承継を円滑に実現",
    description: "創業者から息子への事業承継。株式移転スキームの設計から従業員への説明まで、2年かけて円滑な承継を実現しました。",
  },
];
