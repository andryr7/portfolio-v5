import { useThree } from "@react-three/fiber";
import { useCallback, useEffect } from "react";
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

  const adjustZoom = useCallback(() => {
    const cameraTarget = new THREE.Box3().setFromObject(target.current);
    camera.current.zoom = Math.min(
      width / (cameraTarget.max.x - cameraTarget.min.x),
      height / (cameraTarget.max.y - cameraTarget.min.y)
    );
    camera.current.updateProjectionMatrix();
  }, [camera, target, height, width]);

  useEffect(() => {
    if (camera.current !== null) {
      adjustZoom();
    }
  }, [adjustZoom, camera]);

  return null;
}
