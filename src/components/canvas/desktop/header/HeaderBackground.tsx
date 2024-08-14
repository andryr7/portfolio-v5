import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { extend, useFrame } from "@react-three/fiber";
import { DesktopBackgroundMaterial } from "./DesktopBackgroundMaterial";
import * as THREE from "three";
import { useTrailTexture } from "@react-three/drei";
import * as easings from "d3-ease";
import { useMemo, useRef } from "react";

extend({ DesktopBackgroundMaterial });

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
      <desktopBackgroundMaterial
        key={DesktopBackgroundMaterial.key}
        darkcolor={shaderDarkColor}
        lightcolor={shaderLightColor}
        map={texture}
        ref={materialRef}
      />
    </mesh>
  );
}
