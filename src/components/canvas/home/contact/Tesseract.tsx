import { useColors } from "@/handlers/useColors";
import { Bounds, OrbitControls } from "@react-three/drei";
import {
  ReactThreeFiber,
  ThreeEvent,
  extend,
  useFrame,
} from "@react-three/fiber";
import { useRef } from "react";
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

const coordBuilder = (index: number, t: number) => {
  switch (index) {
    case 0:
      return path(
        vertexCoords[8],
        vertexCoords[9],
        vertexCoords[1],
        vertexCoords[0],
        t
      );
    case 1:
      return path(
        vertexCoords[0],
        vertexCoords[8],
        vertexCoords[9],
        vertexCoords[1],
        t
      );
    case 2:
      return path(
        vertexCoords[3],
        vertexCoords[11],
        vertexCoords[10],
        vertexCoords[2],
        t
      );
    case 3:
      return path(
        vertexCoords[11],
        vertexCoords[10],
        vertexCoords[2],
        vertexCoords[3],
        t
      );
    case 4:
      return path(
        vertexCoords[12],
        vertexCoords[13],
        vertexCoords[5],
        vertexCoords[4],
        t
      );
    case 5:
      return path(
        vertexCoords[4],
        vertexCoords[12],
        vertexCoords[13],
        vertexCoords[5],
        t
      );
    case 6:
      return path(
        vertexCoords[7],
        vertexCoords[15],
        vertexCoords[14],
        vertexCoords[6],
        t
      );
    case 7:
      return path(
        vertexCoords[15],
        vertexCoords[14],
        vertexCoords[6],
        vertexCoords[7],
        t
      );
    case 8:
      return path(
        vertexCoords[9],
        vertexCoords[1],
        vertexCoords[0],
        vertexCoords[8],
        t
      );
    case 9:
      return path(
        vertexCoords[1],
        vertexCoords[0],
        vertexCoords[8],
        vertexCoords[9],
        t
      );
    case 10:
      return path(
        vertexCoords[2],
        vertexCoords[3],
        vertexCoords[11],
        vertexCoords[10],
        t
      );
    case 11:
      return path(
        vertexCoords[10],
        vertexCoords[2],
        vertexCoords[3],
        vertexCoords[11],
        t
      );
    case 12:
      return path(
        vertexCoords[13],
        vertexCoords[5],
        vertexCoords[4],
        vertexCoords[12],
        t
      );
    case 13:
      return path(
        vertexCoords[5],
        vertexCoords[4],
        vertexCoords[12],
        vertexCoords[13],
        t
      );
    case 14:
      return path(
        vertexCoords[6],
        vertexCoords[7],
        vertexCoords[15],
        vertexCoords[14],
        t
      );
    default:
      return path(
        vertexCoords[14],
        vertexCoords[6],
        vertexCoords[7],
        vertexCoords[15],
        t
      );
  }
};

export function Tesseract() {
  const colors = useColors();
  const linesRef = useRef<THREE.Line[]>(Array(lines.length).fill(null));
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta / 100;

    if (linesRef.current !== null) {
      //Building the new vertex coordinates
      const newVertexCoords: VectorCoords[] = vertexCoords.map((_, i) =>
        coordBuilder(i, timeRef.current)
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
    }
  });

  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
      <mesh scale={1 / 50} ref={meshRef}>
        {lines.map((line, i) => (
          <line_ key={i} ref={(el: THREE.Line) => (linesRef.current[i] = el)}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[line, 3]} />
            </bufferGeometry>
            <lineBasicMaterial color={colors.main} linewidth={1} />
          </line_>
        ))}
      </mesh>
      <Bounds fit clip observe margin={1.25}>
        <mesh>
          <boxGeometry args={[4, 4, 4]} />
          <meshBasicMaterial color="red" wireframe visible={false} />
        </mesh>
      </Bounds>
    </>
  );
}
