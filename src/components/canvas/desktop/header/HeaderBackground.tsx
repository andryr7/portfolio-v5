import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { extend, useFrame } from "@react-three/fiber";
import { BackgroundMaterial } from "./BackgroundMaterial";
import * as THREE from "three";
// import { useControls } from "leva";
import { useTrailTexture } from "@react-three/drei";
import * as easings from "d3-ease";
import { useMemo, useRef } from "react";

extend({ BackgroundMaterial });

export function HeaderBackground({ visible }: { visible: boolean }) {
  const { width: viewportWidth, height: viewportHeight } = usePortfolioStore(
    (state) => state.viewportSize
  );
  const colors = usePortfolioStore((state) => state.colors);
  const materialRef = useRef<any>(null);

  const shaderDarkColor = useMemo(() => {
    return new THREE.Color(colors.backgroundOne);
  }, [colors]);

  const shaderLightColor = useMemo(() => {
    return new THREE.Color(colors.accent);
  }, [colors]);

  // const { ease, ...conf } = useControls("Trail", {
  //   size: { value: 64, min: 8, max: 256, step: 8 },
  //   radius: { value: 0.1, min: 0, max: 1 },
  //   maxAge: { value: 2000, min: 300, max: 10000 },
  //   interpolate: { value: 0, min: 0, max: 2, step: 1 },
  //   smoothing: { value: 0.5, min: 0, max: 0.99, step: 0.01 },
  //   minForce: { value: 0.3, min: 0, max: 1, step: 0.1 },
  //   intensity: { value: 0.2, min: 0, max: 1, step: 0.1 },
  //   blend: { value: "screen", options: ["source-over", "screen"] },
  //   ease: { value: "easeBackOut", options: Object.keys(easings) },
  // });

  const [texture, onMove] = useTrailTexture({
    size: 64,
    radius: 0.1,
    maxAge: 2000,
    interpolate: 0,
    smoothing: 0.5,
    minForce: 0.3,
    intensity: 0.2,
    blend: "screen",
    ease: easings["easeBackOut"],
  });

  useFrame((_, delta) => {
    materialRef.current.uTime += delta * 0.05;
  });

  return (
    <mesh
      scale={[
        Math.max(viewportWidth, viewportHeight),
        Math.max(viewportWidth, viewportHeight),
        1,
      ]}
      onPointerMove={onMove}
      visible={visible}
    >
      <planeGeometry args={[1, 1, 1, 1]} />
      <backgroundMaterial
        key={BackgroundMaterial.key}
        darkcolor={shaderDarkColor}
        lightcolor={shaderLightColor}
        map={texture}
        ref={materialRef}
      />
    </mesh>
  );
}
