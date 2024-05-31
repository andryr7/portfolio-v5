import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useMemo, useRef } from "react";
import { useMediaQuery } from "usehooks-ts";

export function PhysicBoundaries() {
  const { width: rawViewportWidth, height: rawViewportHeight } =
    usePortfolioStore((state) => state.viewportSize);
  const isSmallDevice = useMediaQuery("(min-width: 768px)");

  const [viewportWidth, viewportHeight] = useMemo(() => {
    if (isSmallDevice) {
      const pixelWidthValue = rawViewportWidth / window.innerWidth;
      const pixelHeightValue = rawViewportHeight / window.innerHeight;
      return [
        rawViewportWidth - 40 * pixelWidthValue,
        rawViewportHeight - 40 * pixelHeightValue,
      ];
    }
    return [rawViewportWidth, rawViewportHeight];
  }, [rawViewportWidth, rawViewportHeight, isSmallDevice]);

  const topWallRef = useRef(null);
  const bottomWallRef = useRef(null);
  const leftWallRef = useRef(null);
  const rightWallRef = useRef(null);

  // useEffect(() => {
  //   topWallRef.current.setEnabled(false);
  //   bottomWallRef.current.setEnabled(false);
  // }, []);

  return (
    <>
      <group key={viewportWidth + viewportHeight} position={[0, 0, 2.5]}>
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
        {/* Front and back walls */}
        <RigidBody type="kinematicPosition" colliders={"cuboid"}>
          <mesh
            rotation={[0, 0, 0]}
            scale={[viewportWidth, viewportHeight, 1]}
            position={[0, 0, -2]}
          >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial color="green" wireframe visible={false} />
          </mesh>
        </RigidBody>
        <RigidBody type="kinematicPosition" colliders={"cuboid"}>
          <mesh
            rotation={[0, 0, 0]}
            scale={[viewportWidth, viewportHeight, 1]}
            position={[0, 0, 2]}
          >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial color="green" wireframe visible={false} />
          </mesh>
        </RigidBody>
      </group>
    </>
  );
}
