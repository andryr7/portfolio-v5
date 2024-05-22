import { useLenis } from "lenis/react";
import { useState } from "react";

export function OverlayScene() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useLenis((state) => {
    const newScrollProgress =
      state.animatedScroll /
      (state.dimensions.scrollHeight - 1.5 * state.dimensions.height);
    setScrollProgress(Math.min(newScrollProgress, 1));
  });

  return (
    <>
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color="red" />
      </mesh>
    </>
  );
}
