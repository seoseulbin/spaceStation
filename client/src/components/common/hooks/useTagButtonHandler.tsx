import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import ImageAnchorTagButton from "../ImageAnchorButton/ImageAnchorButton.tsx";

export function useTagButtonHandler() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);

  const [mousePos, setMousePos] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const [imageTagPos, setImageTagPos] = useState<{ x: number; y: number }[]>(
    [],
  );

  const [imgList, setImgList] = useState<
    {
      url: string;
      tagPosition: {
        x: number;
        y: number;
      };
      tagInfo: {
        name: string;
        url: string;
      };
    }[]
  >([]);

  useEffect(() => {
    if (mousePos.x !== 0 || mousePos.y !== 0) {
      setImageTagPos((prev) => [...prev, mousePos]);
    }
  }, [mousePos]);

  function addImageAnchor() {
    const maxAnchorCount = 5;
    const containerElement = containerRef.current;
    if (imageTagPos.length >= maxAnchorCount) {
      toast.error(
        `상품 태그는 최대 ${maxAnchorCount}개까지만 추가하실 수 있습니다.`,
      );
      return;
    }

    if (imgList.length === 0) {
      toast.error("등록할 이미지를 추가해주세요.");
      return;
    }
    getCurrentMousePos(containerElement);
  }

  // function handleImageAnchor(e: React.BaseSyntheticEvent) {
  //   e.stopPropagation();
  //   toast.success("링크 수정하는 UI 추가 예정");
  // }

  const getCurrentMousePos = async (containerRef: HTMLDivElement | null) => {
    const handleMouseClick = (event: { clientX: number; clientY: number }) => {
      const containerRect = containerRef?.getBoundingClientRect();
      console.log(target);
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

  // const showTagButtonModal = () => {
  //   return "";
  // };

  function TagButtonListContainer() {
    return (
      <>
        <div>눈누</div>
        <ImageAnchorTagButton x={0} y={0} onClick={() => {}} />
      </>
    );
  }

  return { setTarget, setImgList, addImageAnchor, TagButtonListContainer };
}
