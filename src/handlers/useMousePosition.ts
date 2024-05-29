import React, { useCallback, useEffect, useState } from "react";

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0.5,
    y: 0.5,
  });

  const updateMousePosition = useCallback((e: React.MouseEvent) => {
    setMousePosition({
      x: e.clientX / window.innerWidth - 0.5,
      y: e.clientY / window.innerHeight - 0.5,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [updateMousePosition]);

  return mousePosition;
};
