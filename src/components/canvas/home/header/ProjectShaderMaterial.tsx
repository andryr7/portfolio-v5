import { shaderMaterial } from "@react-three/drei";
import { ReactThreeFiber } from "@react-three/fiber";
import * as THREE from "three";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      projectShaderMaterial: ReactThreeFiber.Object3DNode<
        THREE.ShaderMaterial & {
          key: string;
          map: THREE.Texture;
          colorizeFactor: number;
          baseColor: THREE.Color;
          chromaticAberration: number;
        },
        typeof ProjectShaderMaterial
      >;
    }
  }
}

export const ProjectShaderMaterial = shaderMaterial(
  {
    map: null,
    baseColor: new THREE.Color("grey"),
    colorizeFactor: 0,
    chromaticAberration: 0,
  },
  `
    uniform sampler2D map;

    varying vec2 vUv;

    void main() {
      vec3 pos = position;
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  `
    uniform sampler2D map;
    uniform vec3 baseColor;
    uniform float colorizeFactor;
    uniform float chromaticAberration;

    float noise = .5;

    varying vec2 vUv;

    // Simplex noise function
    float snoise(vec2 uv) {
      return fract(sin(dot(uv, vec2(12.9898,78.233))) * 43758.5453);
    }

    void main() {
      // Getting the pixel color
      vec4 textureCol = texture2D(map, vUv);
      
      // Offset UV coordinates for red, green, and blue channels
      vec2 uvR = vUv + chromaticAberration * vec2(0.01, 0.0);
      vec2 uvG = vUv;
      vec2 uvB = vUv - chromaticAberration * vec2(0.01, 0.0);
      
      // Sample textures for red, green, and blue channels
      vec4 texR = texture2D(map, uvR);
      vec4 texG = texture2D(map, uvG);
      vec4 texB = texture2D(map, uvB);
      
      // Combine sampled colors with varying weights
      vec3 fCol = vec3(texR.r, texG.g, texB.b);
      
      // Mix the base color and the combined sampled color
      vec3 col = mix(baseColor, fCol, colorizeFactor);
      
      gl_FragColor = vec4(col, 1.0);

      //Gamma correction
      float gamma = 1.5;
      col = pow(col, vec3(1.0 / gamma));
      // gl_FragColor = vec4(col, 1.0);
    }
  `
);
