interface SanityImage {
  asset: {
    _ref: string;
    _type: string;
  };
  _type: string;
}

export interface SkillItem {
  _key: string;
  enName: string;
  frName: string;
}

export interface Skill {
  _id: string;
  enName: string;
  frName: string;
  order: number;
  enDescription: string;
  frDescription: string;
  image: SanityImage;
  skillItem: SkillItem[];
}
