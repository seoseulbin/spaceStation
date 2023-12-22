import { useState } from "react";
import toast from "react-hot-toast";

export function useTagButtonHandler() {
  const [target, setTarget] = useState<HTMLDivElement | null | undefined>(
    undefined,
  );

  const [currentImage, setCurrentImage] = useState<
    | {
        url: string;
        tagPosition: {
          x: number;
          y: number;
        }[];
        tagInfo: {
          name: string;
          url: string;
        }[];
      }
    | undefined
  >(undefined);

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

  function addNewImage(item: string) {
    const newImage = {
      url: item,
      tagPosition: [],
      tagInfo: [],
    };
    setImgList((prev) => [...prev, newImage]);
  }

  function addImageAnchor(showImage: string, event: React.MouseEvent) {
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

    // 마우스 이벤트 좌표를 가져오는 함수
    const currentMousePos = getCurrentMousePos(event);
    console.log(currentMousePos);

    if (currentMousePos) {
      // 현재 showImage의 tagPosition에 가져온 좌표를 추가하는 함수
      addTagPosition(showImage, currentMousePos);
    }
  }

  function getCurrentMousePos(event: React.MouseEvent) {
    const containerRect = target?.getBoundingClientRect();
    if (containerRect) {
      const x = event.clientX - containerRect.left;
      const y = event.clientY - containerRect.top;
      const boxWidth = containerRect.width;
      const boxHeight = containerRect.height;

      const mousePosition = { x: 0, y: 0 };
      mousePosition.x = x > 0 ? (x / boxWidth) * 100 : 0;
      mousePosition.y = y > 0 ? (y / boxHeight) * 100 : 0;
      return mousePosition;
    }
  }

  function addTagPosition(
    showImage: string,
    position: { x: number; y: number },
  ) {
    //console.log(position);
    const currentImageIndex = imgList?.findIndex(
      (item) => item.url === showImage,
    );
    console.log("isCurrentImage", imgList[currentImageIndex]);
    if (currentImageIndex !== -1) {
      const newPosition = { x: position.x, y: position.y };
      const newArray = [...imgList];
      newArray[currentImageIndex].tagPosition.push(newPosition);

      setImgList(() => newArray);
      return imgList;
    }
  }

  // const showTagButtonModal = () => {
  //   return "";
  // };

  // function handleImageAnchor(e: React.BaseSyntheticEvent) {
  //   e.stopPropagation();
  //   toast.success("링크 수정하는 UI 추가 예정");
  // }

  return {
    setTarget,
    imgList,
    setImgList,
    currentImage,
    setCurrentImage,
    addNewImage,
    addImageAnchor,
    getCurrentMousePos,
  };
}
