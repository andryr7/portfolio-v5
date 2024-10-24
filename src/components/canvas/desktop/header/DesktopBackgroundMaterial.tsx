import { DesktopBackgroundMaterialType } from "@/types/canvasTypes";
import { shaderMaterial } from "@react-three/drei";
import { ReactThreeFiber } from "@react-three/fiber";
import { Color } from "three";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      desktopBackgroundMaterial: ReactThreeFiber.Object3DNode<
        DesktopBackgroundMaterialType,
        DesktopBackgroundMaterialType
      >;
    }
  }
}

export const DesktopBackgroundMaterial = shaderMaterial(
  {
    map: null,
    darkcolor: new Color("black"),
    lightcolor: new Color("lightgrey"),
    amount: 1,
    uTime: 0,
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
    varying vec2 vUv;
    uniform sampler2D map;
    uniform vec3 darkcolor;
    uniform vec3 lightcolor;
    uniform float uTime;
    const float NOISE_SCALE = 5.;

    //Hash function
    float hashV(vec2 p) {
      float h = dot(p,vec2(127.1,311.7));
      return -1.0 + 2.0*fract(sin(h)*43758.5453123);
    }

    //Noise function
    float noiseV(in vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f*f*(3.0-2.0*f);

      return mix(mix(hashV(i + vec2(0.0,0.0)), hashV(i + vec2(1.0,0.0)), u.x), mix(hashV(i + vec2(0.0,1.0)), hashV(i + vec2(1.0,1.0)), u.x), u.y);
    }

    //Distort function
    vec2 distort(in vec2 uv, float time, float amount) {
      vec2 uv2 = uv;
      uv2.y -= time;
      uv2 *= NOISE_SCALE;  //scale noise  
      uv += vec2(noiseV(uv2) * amount);
      return uv;
    }

    void main() {
      vec2 distortedvUv;
      float displace = texture2D(map, vUv).r;

      distortedvUv = distort(vUv, uTime / 3.0, 0.02);

      //Square grid pattern
      float strength = step(0.9 - (displace * 0.45), mod(distortedvUv.x * 75.0, 1.));
      strength *= step(0.9 - (displace * 0.45), mod(distortedvUv.y * 75.0, 1.));
      
      vec3 col = mix(darkcolor, lightcolor, strength);

      gl_FragColor = vec4(col, 1.0);
    }
  `
);
