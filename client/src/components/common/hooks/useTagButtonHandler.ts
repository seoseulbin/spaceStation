import { useState } from "react";
import toast from "react-hot-toast";

export function useTagButtonHandler() {
  const [target, setTarget] = useState<HTMLDivElement | null | undefined>(
    undefined,
  );

  const [isDragging, setIsDragging] = useState(false);

  const [draggingTag, setDraggingTag] = useState<null | number>(null);

  const [beforeTagPos, setBeforeTagPos] = useState<{
    x: null | number;
    y: null | number;
  }>({ x: null, y: null });

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

  function addImageAnchor(
    showImage: string,
    event: React.MouseEvent | React.TouchEvent,
  ) {
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

    const currentMousePos = getCurrentMousePos(event);
    console.log(currentMousePos);

    if (currentMousePos) {
      addTagPosition(showImage, currentMousePos);
    }
  }

  // 마우스 이벤트 좌표를 가져오는 함수
  function getCurrentMousePos(event: React.MouseEvent | React.TouchEvent) {
    const containerRect = target?.getBoundingClientRect();
    if (containerRect) {
      let x = 0;
      let y = 0;

      if (
        event.type === "mousedown" ||
        event.type === "mouseup" ||
        event.type === "mousemove"
      ) {
        x = (event as React.MouseEvent).clientX - containerRect.left;
        y = (event as React.MouseEvent).clientY - containerRect.top;
      } else if (
        event.type === "touchend" ||
        event.type === "touchmove" ||
        event.type === "touchstart"
      ) {
        const touchEvent = event as React.TouchEvent;
        x = touchEvent.touches[0].clientX - containerRect.left;
        y = touchEvent.touches[0].clientY - containerRect.top;
      }

      const boxWidth = containerRect.width;
      const boxHeight = containerRect.height;

      const mousePosition = { x: 0, y: 0 };
      mousePosition.x = (x / boxWidth) * 100;
      mousePosition.y = (y / boxHeight) * 100;
      return mousePosition;
    }
  }

  // 태그 position을 추가하고 imgList를 반환하는 함수
  function addTagPosition(
    showImage: string,
    position: { x: number; y: number },
  ) {
    const currentImageIndex = imgList?.findIndex(
      (item) => item.url === showImage,
    );
    if (
      currentImageIndex !== -1 &&
      position.x < 100 &&
      position.x > 0 &&
      position.y < 100 &&
      position.y > 0
    ) {
      const newPosition = { x: position.x, y: position.y };
      const newInfo = { name: "", url: "" };
      const newArray = [...imgList];
      newArray[currentImageIndex].tagPosition.push(newPosition);
      newArray[currentImageIndex].tagInfo.push(newInfo);

      setImgList(() => newArray);
      return imgList;
    }
  }

  // tag 위치를 업데이트하는 함수
  function updateTagPosition(
    showImage: string,
    draggingTag: number,
    position: { x: number; y: number },
  ) {
    const currentImageIndex = imgList?.findIndex(
      (item) => item.url === showImage,
    );
    const newPosition = { x: position.x, y: position.y };

    if (newPosition.x < 0) newPosition.x = 0;
    if (newPosition.x > 100) newPosition.x = 100;
    if (newPosition.y < 0) newPosition.y = 0;
    if (newPosition.y > 100) newPosition.y = 100;

    const newArray = [...imgList];
    newArray[currentImageIndex].tagPosition[draggingTag].x = newPosition.x;
    newArray[currentImageIndex].tagPosition[draggingTag].y = newPosition.y;
    setImgList(() => newArray);
  }

  // 태그 정보를 저장하는 함수
  function updateTagInfo(
    showImage: string | undefined,
    index: string | undefined,
    name: string,
    url: string,
  ) {
    const newArray = [...imgList];
    const imageIndex = imgList.findIndex((item) => item.url === showImage);
    newArray[imageIndex].tagInfo[parseInt(index as string)].name = name;
    newArray[imageIndex].tagInfo[parseInt(index as string)].url = url;
    setImgList(() => newArray);
    toast.success(`${name} 태그를 수정했습니다.`);
  }

  // 태그 정보를 반환하는 함수
  function getTagInfo(currentImage: string) {
    const imageIndex = imgList.findIndex((item) => item.url === currentImage);
    const currentTagInfo = imgList[imageIndex]?.tagInfo;
    return currentTagInfo;
  }

  // 태그 마우스다운이벤트 발생 시 실행되는 함수
  function startDragTag(event: React.MouseEvent | React.TouchEvent) {
    const currentPos = getCurrentMousePos(event);

    if (
      currentPos &&
      currentPos.x > 0 &&
      currentPos.x < 100 &&
      currentPos.y > 0 &&
      currentPos.y < 100
    ) {
      setBeforeTagPos(currentPos);
    }

    //setIsDragging(true);
    const tagIndex = event.currentTarget.getAttribute("title");

    if (tagIndex) setDraggingTag(parseInt(tagIndex));
  }

  // tag mouseUp 이벤트 발생 시 실행되는 함수
  function endDragTag() {
    if (isDragging) setIsDragging(false);
    if (draggingTag !== null) setDraggingTag(null);
    if (beforeTagPos.x !== null) setBeforeTagPos({ x: null, y: null });
  }

  // tag 삭제하는 함수
  function deleteTag(
    showImage: string | undefined,
    draggingTag: number | null,
  ) {
    console.log(showImage, draggingTag, imgList);
    const currentImageInfo = currentImage;
    const newArray = [...imgList];

    const imageIndex = imgList.findIndex((item) => item.url === showImage);
    if (currentImageInfo && draggingTag != null && showImage !== undefined) {
      newArray[imageIndex].tagInfo.splice(draggingTag, 1);
      newArray[imageIndex].tagPosition.splice(draggingTag, 1);

      setCurrentImage({
        ...currentImageInfo,
        tagPosition: newArray[imageIndex].tagPosition,
        tagInfo: newArray[imageIndex].tagInfo,
      });
      setImgList(() => newArray);
    }
    toast.success("태그를 삭제했습니다.");
  }

  return {
    target,
    setTarget,
    imgList,
    setImgList,
    currentImage,
    setCurrentImage,
    addNewImage,
    addImageAnchor,
    getCurrentMousePos,
    updateTagInfo,
    getTagInfo,
    isDragging,
    setIsDragging,
    startDragTag,
    endDragTag,
    updateTagPosition,
    draggingTag,
    beforeTagPos,
    deleteTag,
  };
}
