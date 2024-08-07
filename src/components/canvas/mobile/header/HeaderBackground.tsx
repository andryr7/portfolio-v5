import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { extend, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import { BackgroundMaterial } from "./BackgroundMaterial";

extend({ BackgroundMaterial });

export function HeaderBackground() {
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
    >
      <planeGeometry args={[1, 1, 1, 1]} />
      <backgroundMaterial
        key={BackgroundMaterial.key}
        darkcolor={shaderDarkColor}
        lightcolor={shaderLightColor}
        ref={materialRef}
      />
    </mesh>
  );
}
