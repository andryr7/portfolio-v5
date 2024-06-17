import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const roundedSquareWave = (t, delta, a, f) => {
  return ((2 * a) / Math.PI) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta);
};

export function Dots() {
  const colors = usePortfolioStore((state) => state.colors);
  const viewport = usePortfolioStore((state) => state.viewportSize);
  const dotsRef = useRef(null);

  const { vec, transform, positions, distances } = useMemo(() => {
    const vec = new THREE.Vector3();
    const transform = new THREE.Matrix4();

    // Precompute randomized initial positions
    const positions = [...Array(10000)].map((_, i) => {
      const position = new THREE.Vector3();
      // Place in a grid
      position.x = (i % 100) - 50;
      position.y = Math.floor(i / 100) - 50;
      return position;
    });

    // Precompute initial distances with octagonal offset
    const right = new THREE.Vector3(1, 0, 0);
    const distances = positions.map((pos) => {
      return pos.length() + Math.cos(pos.angleTo(right) * 8) * 0.5;
    });
    return { vec, transform, positions, distances };
  }, []);

  useFrame(({ pointer }) => {
    // console.log(positions[5000]);
    // const newPointer = { x: pointer.x * 50, y: pointer.y * 50 };

    for (let i = 0; i < 10000; ++i) {
      // Scale initial position by our oscillator
      vec.copy(positions[i]).multiplyScalar(0.1);

      // Apply the Vector3 to a Matrix4
      transform.setPosition(vec);

      // Update Matrix4 for this instance
      dotsRef.current.setMatrixAt(i, transform);
    }
    dotsRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={dotsRef} args={[null, null, 10000]}>
      <planeGeometry args={[0.025, 0.025]} />
      <meshBasicMaterial color={"red"} />
      {/* <meshBasicMaterial color={colors.backgroundTwo} /> */}
    </instancedMesh>
  );
}

// const dist = distances[i];

// // Distance affects the wave phase
// const t = clock.elapsedTime - dist / 25;

// // Oscillates between -0.4 and +0.4
// const wave = roundedSquareWave(t, 0.15 + (0.2 * dist) / 72, 0.4, 1 / 3.8);

// // Scale initial position by our oscillator
// vec.copy(positions[i]).multiplyScalar(wave + 1.3);

// // Apply the Vector3 to a Matrix4
// transform.setPosition(vec);

// // Update Matrix4 for this instance
// dotsRef.current.setMatrixAt(i, transform);
