interface WorkImage {
  _type: "image";
  _key: string;
  asset: {
    _ref: string;
    _type: "reference";
  };
}

interface WorkUsedTech {
  _id: string;
  name: string;
  url: string;
}

export interface Work {
  _id: string;
  order: number;
  backgroundColor: string;
  mainColor: string;
  previewImagePath: string;
  technicalDescription: string;
  generalDescription: string;
  slug: {
    current: string;
  };
  title: string;
  liveUrl?: string;
  githubUrl?: string;
  caption: string;
  usedTechs: WorkUsedTech[];
  images?: WorkImage[];
}
