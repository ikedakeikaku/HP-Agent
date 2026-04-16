export type TeamMember = {
  name: string;
  role: string;
  qualifications: string[];
  bio: string;
};

export const team: TeamMember[] = [
  {
    name: "下地 貴之",
    role: "代表社員 / 中小企業診断士",
    qualifications: ["中小企業診断士", "経営革新等支援機関"],
    bio: "山梨県甲府市出身。大手コンサルティングファームを経て独立。「この会社と、ここで働く人たちを守りたい」——そんな経営者の想いに応えるため、初回相談から実行まで一貫して伴走する支援スタイルを貫いています。",
  },
];
