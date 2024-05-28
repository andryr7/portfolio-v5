import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { OrbitControls } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { useMediaQuery } from "usehooks-ts";

export function PhysicBoundaries() {
  const { width: rawViewportWidth, height: rawViewportHeight } =
    usePortfolioStore((state) => state.viewportSize);
  const isSmallDevice = useMediaQuery("(min-width: 768px)");
  const pixelWidthValue = rawViewportWidth / window.innerWidth;
  const pixelHeightValue = rawViewportHeight / window.innerHeight;

  const viewportWidth = isSmallDevice
    ? rawViewportWidth - 40 * pixelWidthValue
    : rawViewportWidth;
  const viewportHeight = isSmallDevice
    ? rawViewportHeight - 40 * pixelHeightValue
    : rawViewportHeight;

  const topWallRef = useRef(null);
  const bottomWallRef = useRef(null);
  const leftWallRef = useRef(null);
  const rightWallRef = useRef(null);

  return (
    <>
      <group key={viewportWidth + viewportHeight}>
        {/* top and bottom walls */}
        <RigidBody
          type="kinematicPosition"
          colliders={"cuboid"}
          ref={topWallRef}
        >
          <mesh
            rotation={[Math.PI / 2, 0, 0]}
            scale={[viewportWidth * 1, 4, 1]}
            position={[0, viewportHeight / 2, 0]}
          >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial color="red" wireframe visible={false} />
          </mesh>
        </RigidBody>
        <RigidBody
          type="kinematicPosition"
          colliders={"cuboid"}
          ref={bottomWallRef}
        >
          <mesh
            rotation={[Math.PI / 2, 0, 0]}
            scale={[viewportWidth * 1, 4, 1]}
            position={[0, -viewportHeight / 2, 0]}
          >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial color="red" wireframe visible={false} />
          </mesh>
        </RigidBody>
        {/* Left and right walls */}
        <RigidBody
          type="kinematicPosition"
          colliders={"cuboid"}
          ref={leftWallRef}
        >
          <mesh
            rotation={[0, Math.PI / 2, Math.PI / 2]}
            scale={[viewportHeight, 4, 1]}
            position={[-viewportWidth / 2, 0, 0]}
          >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial color="blue" wireframe visible={false} />
          </mesh>
        </RigidBody>
        <RigidBody
          type="kinematicPosition"
          colliders={"cuboid"}
          ref={rightWallRef}
        >
          <mesh
            rotation={[0, Math.PI / 2, Math.PI / 2]}
            scale={[viewportHeight, 4, 1]}
            position={[viewportWidth / 2, 0, 0]}
          >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial color="blue" wireframe visible={false} />
          </mesh>
        </RigidBody>
      </group>
    </>
  );
}
