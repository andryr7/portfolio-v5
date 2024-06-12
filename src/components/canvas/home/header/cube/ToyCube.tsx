import { RoundedBox, Text } from "@react-three/drei";
import spacemono from "@/assets/fonts/space-mono.ttf";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";

export function ToyCube({ visible }: { visible: boolean }) {
  const colors = usePortfolioStore((state) => state.colors);
  const cubeMaterialRef = useRef(null);
  const textMaterialRef = useRef(null);
  const { worksScrollProgress } = usePortfolioStore((state) => ({
    worksScrollProgress: state.worksScrollProgress,
  }));

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
  });

  return (
    <group visible={worksScrollProgress >= 0.25}>
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
          fontSize={0.15}
          font={spacemono}
          color={colors.backgroundOne}
          textAlign="center"
        >
          scroll
          {"\n"}
          to
          {"\n"}
          contact
          <meshBasicMaterial transparent ref={textMaterialRef} />
        </Text>
      </mesh>
    </group>
  );
}
