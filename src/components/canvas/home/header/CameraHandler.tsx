import { useThree } from "@react-three/fiber";
import { useCallback, useEffect } from "react";
import * as THREE from "three";

export function CameraHandler({
  camera,
  target,
  viewportWidth,
  viewportHeight,
}: {
  camera: any;
  target: any;
  viewportWidth: any;
  viewportHeight: any;
}) {
  const {
    size: { width, height },
  } = useThree();

  const adjustZoom = useCallback(() => {
    console.log("effect was triggered");
    const cameraTarget = new THREE.Box3().setFromObject(target.current);
    camera.current.zoom = Math.min(
      width / (cameraTarget.max.x - cameraTarget.min.x),
      height / (cameraTarget.max.y - cameraTarget.min.y)
    );
    camera.current.updateProjectionMatrix();
  }, [camera, target, height, width]);

  // useEffect(() => {
  //   if (camera.current !== null) {
  //     adjustZoom();
  //   }
  // }, [adjustZoom, camera]);

  // useEffect(() => {
  //   console.log("effect was triggered");
  // }, [camera]);

  useEffect(() => {
    // Add event listener for resize
    window.addEventListener("resize", adjustZoom);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", adjustZoom);
    };
  }, [adjustZoom]);

  return null;
}
