interface SanityImage {
  asset: {
    _ref: string;
    _type: string;
  };
  _type: string;
}

export interface Skill {
  _id: string;
  name: string;
  order: number;
  description: string;
  image: SanityImage;
  skillItem: string[];
}
