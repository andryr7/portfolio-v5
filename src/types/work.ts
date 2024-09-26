interface WorkImage {
  _type: "image";
  _key: string;
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface WorkUsedTech {
  _id: string;
  name: string;
  url: string;
  enType: string;
  frType: string;
}

export interface Work {
  _id: string;
  order: number;
  slug: {
    current: string;
  };
  title: string;
  enCaption: string;
  frCaption: string;
  enType: string;
  frType: string;
  year: string;
  lightColor: string;
  darkColor: string;
  previewImagePath: string;
  images?: WorkImage[];
  enGeneralDescription: string;
  frGeneralDescription: string;
  enTechnicalDescription: string;
  frTechnicalDescription: string;
  usedTechs: WorkUsedTech[];
  liveUrl?: string;
  githubUrl?: string;
}
