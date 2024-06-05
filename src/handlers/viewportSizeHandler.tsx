import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { useThree } from "@react-three/fiber";
import { useCallback, useEffect, useLayoutEffect } from "react";

export function ViewportSizeHandler() {
  const setViewportSize = usePortfolioStore((state) => state.setViewportSize);
  const { getCurrentViewport } = useThree((state) => state.viewport);

  const handleResize = useCallback(() => {
    const newSize = getCurrentViewport();
    setViewportSize({ width: newSize.width, height: newSize.height });
  }, [getCurrentViewport, setViewportSize]);

  // Viewport size initialization
  useLayoutEffect(() => {
    handleResize();
  }, [handleResize]);

  // Viewport size resize subscription
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return null;
}
