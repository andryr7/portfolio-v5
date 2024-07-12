import { Tech } from "./tech";

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
  type: string;
}

export interface Work {
  _id: string;
  order: number;
  slug: {
    current: string;
  };
  title: string;
  caption: string;
  type: string;
  year: string;
  mainColor: string;
  backgroundColor: string;
  previewImagePath: string;
  images?: WorkImage[];
  generalDescription: string;
  technicalDescription: string;
  usedTechs: WorkUsedTech[];
  liveUrl?: string;
  githubUrl?: string;
}
