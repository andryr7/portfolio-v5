import { shaderMaterial } from "@react-three/drei";
import { ReactThreeFiber } from "@react-three/fiber";
import { Color } from "three";
import * as THREE from "three";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      textShaderMaterial: ReactThreeFiber.Object3DNode<
        THREE.ShaderMaterial & {
          key: string;
          darkcolor: THREE.Color;
          lightcolor: THREE.Color;
          amount: number;
          uTime: number;
        },
        typeof TextShaderMaterial
      >;
    }
  }
}

export const TextShaderMaterial = shaderMaterial(
  {
    map: null,
    darkcolor: new Color("black"),
    lightcolor: new Color("lightgrey"),
    amount: 1,
    uTime: 0,
  },
  `
    uniform sampler2D map;
    uniform float amount;
    varying float vDisplace;
    varying vec2 vUv;

    void main() {
      float displace = texture2D(map, uv).r;
      vDisplace = displace;

      vec3 pos = position;
      // pos.z += displace * amount;

      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  `
    uniform vec3 darkcolor;
    uniform vec3 lightcolor;
    uniform float uTime;

    varying float vDisplace;
    varying vec2 vUv;
  
    float random(vec2 st)
    {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      // vec3 col = mix(darkcolor, lightcolor, 1);
      // gl_FragColor = vec4(col, 1.);

      //Handling animation
      vec2 customUv = vUv;
      customUv.y += uTime;

      vec2 gridUv = vec2(floor(customUv.x * 10.0) / 10.0, floor(customUv.y * 10.0) / 10.0);
      float strength = random(gridUv);
      vec3 col = mix(darkcolor, lightcolor, strength);

      gl_FragColor = vec4(col, 1.0);
    }

  `
);
