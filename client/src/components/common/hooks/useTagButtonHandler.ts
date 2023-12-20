import { useState } from "react";

export const useTagButtonHandler = () => {
  const [mousePos, setMousePos] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const getCurrentMousePos = async (containerRef: HTMLDivElement | null) => {
    const handleMouseClick = (event: { clientX: number; clientY: number }) => {
      const containerRect = containerRef?.getBoundingClientRect();
      //console.log(containerRect);
      if (containerRect) {
        const x = event.clientX - containerRect.left;
        const y = event.clientY - containerRect.top;
        const boxWidth = containerRect.width;
        const boxHeight = containerRect.height;

        setMousePos({
          x: x > 0 ? (x / boxWidth) * 100 : 0,
          y: y > 0 ? (y / boxHeight) * 100 : 0,
        });
        console.log("xpos:", x, "ypos:", y);
      }

      window.removeEventListener("click", handleMouseClick);
    };

    window.addEventListener("click", handleMouseClick);
  };

  const showTagButtonModal = () => {
    return "";
  };

  return { mousePos, getCurrentMousePos, showTagButtonModal };
};
