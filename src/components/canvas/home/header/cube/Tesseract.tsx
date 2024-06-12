import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { ReactThreeFiber, extend, useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useMemo, useRef } from "react";
import * as THREE from "three";

extend({ Line_: THREE.Line });

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      line_: ReactThreeFiber.Object3DNode<THREE.Line, typeof THREE.Line>;
    }
  }
}

type VectorCoords = {
  x: number;
  y: number;
  z: number;
};

//Function that cycles between 4 vector coordinates according to a time value
function path(
  p1: VectorCoords,
  p2: VectorCoords,
  p3: VectorCoords,
  p4: VectorCoords,
  i: number
) {
  const segments = [
    [p4, p1], // Segment 1: p4 to p1
    [p1, p2], // Segment 2: p1 to p2
    [p2, p3], // Segment 3: p2 to p3
    [p3, p4], // Segment 4: p3 to p4
  ];

  // Calculate segment index
  const segmentIndex = Math.floor(i * 4);

  // Calculate segment-relative parameter
  const t = i * 4 - segmentIndex;

  // Get control points for the current segment
  const [startPoint, endPoint] = segments[segmentIndex];

  // Interpolate between start and end points
  const vec = new THREE.Vector3();
  vec.x = startPoint.x + (endPoint.x - startPoint.x) * t;
  vec.y = startPoint.y + (endPoint.y - startPoint.y) * t;
  vec.z = startPoint.z + (endPoint.z - startPoint.z) * t;

  return vec;
}

//Vertex line matches that form the tesseract
const vertexJoins = [
  //Inner cube
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 4],

  //Intercube joins
  [0, 8],
  [1, 9],
  [2, 10],
  [3, 11],
  [4, 12],
  [5, 13],
  [6, 14],
  [7, 15],

  //Outer cube
  [8, 9],
  [9, 10],
  [10, 11],
  [11, 8],
  [8, 12],
  [9, 13],
  [10, 14],
  [11, 15],
  [12, 13],
  [13, 14],
  [14, 15],
  [15, 12],
];

const vertexCoords = [
  new THREE.Vector3(-50, -50, -50),
  new THREE.Vector3(50, -50, -50),
  new THREE.Vector3(50, 50, -50),
  new THREE.Vector3(-50, 50, -50),
  new THREE.Vector3(-50, -50, 50),
  new THREE.Vector3(50, -50, 50),
  new THREE.Vector3(50, 50, 50),
  new THREE.Vector3(-50, 50, 50),
  new THREE.Vector3(-100, -100, -100),
  new THREE.Vector3(100, -100, -100),
  new THREE.Vector3(100, 100, -100),
  new THREE.Vector3(-100, 100, -100),
  new THREE.Vector3(-100, -100, 100),
  new THREE.Vector3(100, -100, 100),
  new THREE.Vector3(100, 100, 100),
  new THREE.Vector3(-100, 100, 100),
];

const lines = vertexJoins.map(
  (_, i) =>
    new Float32Array([
      vertexCoords[vertexJoins[i][0]].x,
      vertexCoords[vertexJoins[i][0]].y,
      vertexCoords[vertexJoins[i][0]].z,
      vertexCoords[vertexJoins[i][1]].x,
      vertexCoords[vertexJoins[i][1]].y,
      vertexCoords[vertexJoins[i][1]].z,
    ])
);

const coordMap: { [key: number]: [number, number, number, number] } = {
  0: [8, 9, 1, 0],
  1: [0, 8, 9, 1],
  2: [3, 11, 10, 2],
  3: [11, 10, 2, 3],
  4: [12, 13, 5, 4],
  5: [4, 12, 13, 5],
  6: [7, 15, 14, 6],
  7: [15, 14, 6, 7],
  8: [9, 1, 0, 8],
  9: [1, 0, 8, 9],
  10: [2, 3, 11, 10],
  11: [10, 2, 3, 11],
  12: [13, 5, 4, 12],
  13: [5, 4, 12, 13],
  14: [6, 7, 15, 14],
  15: [14, 6, 7, 15],
};

const coordBuilder = (index: number, t: number) => {
  const coords = coordMap[index] || coordMap[15];
  return path(
    vertexCoords[coords[0]],
    vertexCoords[coords[1]],
    vertexCoords[coords[2]],
    vertexCoords[coords[3]],
    t
  );
};

export function Tesseract({ visible = true }: { visible: boolean }) {
  const linesRef = useRef<THREE.Line[]>(Array(lines.length).fill(null));
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef<number>(0);
  const colors = usePortfolioStore((state) => state.colors);

  const hoveredContactLink = usePortfolioStore(
    (state) => state.hoveredContactLink
  );

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
    if (visible) {
      timeRef.current += delta / 75;
      const time = timeRef.current % 1;

      if (linesRef.current !== null) {
        //Building the new vertex coordinates
        const newVertexCoords: VectorCoords[] = vertexCoords.map((_, i) =>
          coordBuilder(i, time)
        );

        //Defining the new coordinates of each line of the tesseract
        linesRef.current.forEach((line, i) => {
          const [startVertex, endVertex] = vertexJoins[i];
          const newLineCoords = new Float32Array([
            newVertexCoords[startVertex].x,
            newVertexCoords[startVertex].y,
            newVertexCoords[startVertex].z,
            newVertexCoords[endVertex].x,
            newVertexCoords[endVertex].y,
            newVertexCoords[endVertex].z,
          ]);

          // @ts-expect-error : Updating the array directly works
          line.geometry.attributes.position.array = newLineCoords;
          line.geometry.attributes.position.needsUpdate = true;
        });

        //Mouse rotation animation
        if (meshRef.current !== null) {
          easing.damp(
            meshRef.current.rotation,
            "x",
            modelRotation.x,
            0.25,
            delta
          );
          easing.damp(
            meshRef.current.rotation,
            "y",
            modelRotation.y,
            0.25,
            delta
          );
        }
      }
    }
  });

  return (
    <>
      <mesh scale={1 / 275} ref={meshRef} visible={visible}>
        {lines.map((line, i) => (
          <line_ key={i} ref={(el: THREE.Line) => (linesRef.current[i] = el)}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[line, 3]} />
            </bufferGeometry>
            <lineBasicMaterial color={colors.main} linewidth={1} />
          </line_>
        ))}
      </mesh>
      <mesh>
        <boxGeometry args={[4, 4, 4]} />
        <meshBasicMaterial color="red" wireframe visible={false} />
      </mesh>
    </>
  );
}
