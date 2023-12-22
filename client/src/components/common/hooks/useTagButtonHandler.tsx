import { useState } from "react";
import toast from "react-hot-toast";
import ImageAnchorTagButton from "../ImageAnchorButton/ImageAnchorButton.tsx";

export function useTagButtonHandler() {
  const [target, setTarget] = useState<HTMLDivElement | null | undefined>(
    undefined,
  );

  // const [mousePos, setMousePos] = useState<{
  //   x: number;
  //   y: number;
  // }>({ x: 0, y: 0 });

  // const [imageTagPos, setImageTagPos] = useState<{ x: number; y: number }[]>(
  //   [],
  // );

  //const [ isClicked, setIsClicked ] = useState(false);

  const [imgList, setImgList] = useState<
    {
      url: string;
      tagPosition: {
        x: number;
        y: number;
      }[];
      tagInfo: {
        name: string;
        url: string;
      }[];
    }[]
  >([]);

  // useEffect(() => {
  //   // if (mousePos.x !== 0 || mousePos.y !== 0) {
  //   //   setImageTagPos((prev) => [...prev, mousePos]);
  //   //   console.log(mousePos.x, mousePos.y);
  //   // }
  //  console.log("imgList", imgList);
  // }, [imgList]);

  async function addImageAnchor(showImage: string) {
    const isCurrentImage = imgList?.find((item) => item.url === showImage);
    const maxAnchorCount = 5;

    if (imgList.length === 0) {
      toast.error("등록할 이미지를 추가해주세요.");
      return;
    }
    if (
      isCurrentImage != undefined &&
      isCurrentImage.tagPosition.length >= maxAnchorCount
    ) {
      toast.error(
        `상품 태그는 최대 ${maxAnchorCount}개까지만 추가하실 수 있습니다.`,
      );
      return;
    }

    const currentMousePos = getCurrentMousePos();

    console.log(currentMousePos);
  }

  function getCurrentMousePos() {
    const mousePosition = { x: 0, y: 0 };

    const handleMouseClick = (event: { clientX: number; clientY: number }) => {
      const containerRect = target?.getBoundingClientRect();

      //setIsClicked(!isClicked);
      //console.log(target);
      //console.log(containerRect);
      if (containerRect) {
        const x = event.clientX - containerRect.left;
        const y = event.clientY - containerRect.top;
        const boxWidth = containerRect.width;
        const boxHeight = containerRect.height;

        mousePosition.x = x > 0 ? (x / boxWidth) * 100 : 0;
        mousePosition.y = y > 0 ? (y / boxHeight) * 100 : 0;

        // console.log("xpos:", mousePosition.x, "ypos:", mousePosition.y);

        // const isCurrentImage = imgList?.find( (item) => item.url === showImage);
        // console.log("isCurrentImage", isCurrentImage);
        // if(isCurrentImage) {
        //   const newPosition = { x : mousePosition.x, y : mousePosition.y };

        //   isCurrentImage.tagPosition.push(newPosition);

        //   const newArray = imgList;
        //   console.log("newArray: ", newArray);
        //   setImgList(() => newArray);
        //   setIsClicked(!isClicked);
        //   return;
        // }

        // const newImagePosition = {
        //   url: showImage,
        //   tagPosition: [{
        //     x: mousePosition.x,
        //     y: mousePosition.y,
        //   }],
        //   tagInfo: [{
        //     name: "",
        //     url: "",
        //   }],
        // }
        // setImgList((prev) => [...prev, newImagePosition]);
        // setIsClicked(!isClicked);
      }
      window.removeEventListener("click", handleMouseClick);
      console.log(mousePosition);
      return mousePosition;
    };

    window.addEventListener("click", handleMouseClick);
  }

  // const showTagButtonModal = () => {
  //   return "";
  // };

  // function handleImageAnchor(e: React.BaseSyntheticEvent) {
  //   e.stopPropagation();
  //   toast.success("링크 수정하는 UI 추가 예정");
  // }

  function TagButtonListContainer({ current }: { current: string }) {
    const currentImage = imgList?.find((item) => item.url === current);
    console.log(currentImage);
    return (
      <>
        {currentImage?.tagPosition.map((item, index) => {
          <ImageAnchorTagButton
            key={index}
            x={item.x}
            y={item.y}
            onClick={() => {}}
          />;
        })}
      </>
    );
  }

  return {
    setTarget,
    imgList,
    setImgList,
    addImageAnchor,
    getCurrentMousePos,
    TagButtonListContainer,
  };
}
