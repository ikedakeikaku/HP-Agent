export type Reason = {
  number: string;
  title: string;
  description: string;
};

export const reasons: Reason[] = [
  {
    number: "01",
    title: "「担当が変わりました」はありません",
    description: "大手では担当が頻繁に変わりがちですが、Enridgeでは中小企業診断士が初回相談から実行完了まで一貫して対応。あなたの会社の事情を理解した専門家が、最後まで責任を持ちます。",
  },
  {
    number: "02",
    title: "山梨の経営者の相談先になりたい",
    description: "地元の金融機関・商工会・支援機関との連携実績があります。「東京の大手に頼むほどでもないけど、誰に相談していいか分からない」——そんな経営者のための存在です。",
  },
  {
    number: "03",
    title: "相談だけで終わっても大丈夫です",
    description: "初回60分は無料。「話を聞いてもらって、頭の中が整理できた」——それだけでも十分です。無理な営業や契約の催促は一切しません。まずは気軽にお電話ください。",
  },
];
