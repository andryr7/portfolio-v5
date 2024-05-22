import { OrbitControls, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";

export function OverlayScene() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { getCurrentViewport } = useThree((state) => state.viewport);
  const [viewportDimensions, setViewportDimensions] = useState({
    width: getCurrentViewport().width,
    height: getCurrentViewport().height,
  });

  //Handling scroll animation
  useLenis((state) => {
    const newScrollProgress =
      state.animatedScroll /
      (state.dimensions.scrollHeight - 1.5 * state.dimensions.height);
    setScrollProgress(Math.min(newScrollProgress, 1));
  });

  //Handling window resize
  useEffect(() => {
    // Define the handleResize function
    const handleResize = () => {
      const viewport = getCurrentViewport();
      setViewportDimensions({ width: viewport.width, height: viewport.height });
    };

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [getCurrentViewport]);

  return (
    <>
      <group>
        <Text>Hello</Text>
      </group>
      <group>
        <mesh>
          <planeGeometry
            args={[viewportDimensions.width, viewportDimensions.height]}
          />
          <meshBasicMaterial color="red" />
        </mesh>
      </group>
      <OrbitControls />
    </>
  );
}
