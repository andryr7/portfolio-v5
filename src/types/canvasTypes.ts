import { Color, ShaderMaterial, Texture } from "three";

export type MeshTransmissionMaterialType = Omit<
  JSX.IntrinsicElements["meshPhysicalMaterial"],
  "args" | "roughness" | "thickness" | "transmission"
> & {
  transmission?: number;
  thickness?: number;
  roughness?: number;
  chromaticAberration?: number;
  anisotropy?: number;
  anisotropicBlur?: number;
  distortion?: number;
  distortionScale?: number;
  temporalDistortion?: number;
  buffer?: Texture;
  time?: number;
  args?: [samples: number, transmissionSampler: boolean];
};

export type DesktopBackgroundMaterialType = ShaderMaterial & {
  key: string;
  darkcolor: Color;
  lightcolor: Color;
  amount: number;
  uTime: number;
  map: Texture;
};

export type MobileBackgroundMaterialType = ShaderMaterial & {
  key: string;
  darkcolor: Color;
  lightcolor: Color;
  amount: number;
  uTime: number;
  map: Texture;
};
