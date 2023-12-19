import { useState } from "react";

export const useTagButtonHandler = () => {
  const [mousePos, setMousePos] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const getCurrentMousePos = (containerRef: HTMLDivElement | null) => {
    const handleMouseClick = (event: { clientX: number; clientY: number }) => {
      const containerRect = containerRef?.getBoundingClientRect();
      console.log(containerRect);
      if (containerRect) {
        const x = event.clientX - containerRect.left;
        const y = event.clientY - containerRect.top;
        setMousePos({
          x: x > 0 ? x : 0,
          y: y > 0 ? y : 0,
        });
      }

      window.removeEventListener("click", handleMouseClick);
    };

    window.addEventListener("click", handleMouseClick);
  };
  return { mousePos, getCurrentMousePos };
};
