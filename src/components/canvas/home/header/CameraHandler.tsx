import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

export function CameraHandler({ target }: { target: any }) {
  const {
    camera,
    size: { width, height },
  } = useThree();

  useEffect(() => {
    const aabb = new THREE.Box3().setFromObject(target.current);
    camera.zoom = Math.min(
      width / (aabb.max.x - aabb.min.x),
      height / (aabb.max.y - aabb.min.y)
    );
    camera.updateProjectionMatrix();
  }, [camera, target, height, width]);

  return null;
}
