import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { Bounds } from "@react-three/drei";

export function SkillsScene() {
  const colors = usePortfolioStore((state) => state.colors);

  return (
    <>
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color={"blue"} />
      </mesh>

      {/* Scene bounds */}
      <Bounds clip fit observe margin={1}>
        <mesh>
          <boxGeometry args={[3, 3, 3]} />
          <meshBasicMaterial wireframe color="red" visible={false} />
        </mesh>
      </Bounds>
    </>
  );
}
