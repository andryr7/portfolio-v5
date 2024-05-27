import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

export function CameraHandler({
  camera,
  target,
}: {
  camera: any;
  target: any;
}) {
  const {
    size: { width, height },
  } = useThree();

  useEffect(() => {
    if (camera.current !== null) {
      const aabb = new THREE.Box3().setFromObject(target.current);
      camera.current.zoom = Math.min(
        width / (aabb.max.x - aabb.min.x),
        height / (aabb.max.y - aabb.min.y)
      );
      camera.current.updateProjectionMatrix();
    }
  }, [camera, target, height, width]);

  return null;
}
