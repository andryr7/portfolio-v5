interface SkillItem {
  name: string;
}

export interface Skill {
  order: number;
  name: string;
  description: string;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
    _type: string;
  };
  skillItem: SkillItem[];
}
