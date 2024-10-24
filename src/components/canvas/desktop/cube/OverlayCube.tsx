import { RoundedBox, Text } from "@react-three/drei";
import spacemono from "@/assets/fonts/space-mono.ttf";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { useAnimatedText } from "@/handlers/useAnimatedText";
import { Group } from "three";

export function OverlayCube({ visible }: { visible: boolean }) {
  const colors = usePortfolioStore((state) => state.colors);
  const overlayCubeRef = useRef<Group | null>(null);
  const cubeMaterialRef = useRef(null);
  const textMaterialRef = useRef(null);
  const lang = usePortfolioStore((state) => state.language);

  const hoveredContactLink = usePortfolioStore(
    (state) => state.hoveredContactLink
  );
  const worksScrollProgress = usePortfolioStore(
    (state) => state.worksScrollProgress
  );
  const aboutScrollProgress = usePortfolioStore(
    (state) => state.aboutScrollProgress
  );
  const contactScrollProgress = usePortfolioStore(
    (state) => state.contactScrollProgress
  );
  const contactSceneIsActive = contactScrollProgress >= 0.25;

  const cubeText = useMemo(() => {
    if (aboutScrollProgress < 0.1) return lang === "en" ? "who I am" : "qui ?";
    if (aboutScrollProgress < 0.85)
      return lang === "en" ? "what I do" : "quoi ?";
    return contactScrollProgress < 0.05
      ? lang === "en"
        ? "what I use"
        : "comment ?"
      : lang === "en"
      ? "what now ?"
      : "et maintenant ?";
  }, [lang, aboutScrollProgress, contactScrollProgress]);

  const [cubeTextResult] = useAnimatedText(cubeText);

  const modelRotation = useMemo(() => {
    switch (hoveredContactLink) {
      case 0:
        return {
          x: 0,
          y: 0,
        };
      case 1:
        return {
          x: -Math.PI / 4,
          y: 0,
        };
      case 2:
        return {
          x: 0,
          y: Math.PI / 2,
        };
      default:
        return {
          x: Math.PI / 12,
          y: Math.PI / 4,
        };
    }
  }, [hoveredContactLink]);

  useFrame((_, delta) => {
    //2d cube material opacity animation
    if (cubeMaterialRef.current !== null) {
      easing.damp(
        cubeMaterialRef.current,
        "opacity",
        visible ? 1 : 0,
        0.25,
        delta
      );
    }

    //2d cube text material opacity animation
    if (textMaterialRef.current !== null) {
      easing.damp(
        textMaterialRef.current,
        "opacity",
        visible ? 1 : 0,
        0.25,
        delta
      );
    }

    //Tesseract rotation sync
    if (overlayCubeRef.current !== null) {
      easing.damp(
        overlayCubeRef.current.rotation,
        "x",
        contactSceneIsActive ? modelRotation.x : 0,
        0.25,
        delta
      );
      easing.damp(
        overlayCubeRef.current.rotation,
        "y",
        contactSceneIsActive ? -modelRotation.y : 0,
        0.25,
        delta
      );
    }
  });

  //Fixing rotation when scrolling fast from contact to works
  useEffect(() => {
    if (worksScrollProgress < 1 && overlayCubeRef.current) {
      overlayCubeRef.current.rotation.x = 0;
      overlayCubeRef.current.rotation.y = 0;
      overlayCubeRef.current.rotation.z = 0;
    }
  }, [worksScrollProgress]);

  return (
    <group visible={worksScrollProgress >= 0.33} ref={overlayCubeRef}>
      <mesh>
        <RoundedBox>
          <meshBasicMaterial
            color={colors.main}
            toneMapped={false}
            transparent
            ref={cubeMaterialRef}
          />
        </RoundedBox>
      </mesh>
      <mesh position={[0, 0, 0.51]}>
        <Text
          fontSize={0.1}
          font={spacemono}
          color={colors.backgroundOne}
          textAlign="center"
        >
          {cubeTextResult}
          <meshBasicMaterial transparent ref={textMaterialRef} />
        </Text>
      </mesh>
    </group>
  );
}
