import { useCreateFeed } from "./CreateFeed.hooks";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import * as S from "./CreateFeed.styles";
import axios from "axios";
import { useTagButtonHandler } from "../common/hooks/useTagButtonHandler.ts";
import ImageAnchorTagButton from "../common/ImageAnchorButton/ImageAnchorButton.tsx";
import toast from "react-hot-toast";

export default function CreateFeed() {
  const { createFeed } = useCreateFeed();
  const [images, setImages] = useState<string[]>([]);
  const [showImage, setShowImage] = useState(""); //대표 이미지
  const [contents, setContents] = useState<string>(""); //컨텐츠 내용

  const containerRef = useRef<HTMLDivElement>(null);
  const { mousePos, getCurrentMousePos } = useTagButtonHandler();
  const [imageTagPos, setImageTagPos] = useState<{ x: number; y: number }[]>(
    [],
  );

  useEffect(() => {
    if (mousePos.x !== 0 || mousePos.y !== 0) {
      setImageTagPos((prev) => [...prev, mousePos]);
    }
  }, [mousePos]);

  function handleImageAnchor() {
    const maxAnchorCount = 5;
    const containerElement = containerRef.current;
    if (imageTagPos.length >= maxAnchorCount) {
      toast.error(`상품은 ${maxAnchorCount}개 이상 추가하실 수 없습니다.`);
      return;
    }
    getCurrentMousePos(containerElement);
  }

  /**
   * cloudinary 이미지 저장 함수
   */
  const imageUploader = async (file: File) => {
    try {
      //cloudinary 필요한 정보
      const {
        VITE_CLOUDINARY_PRESET_NAME,
        VITE_CLOUDINARY_NAME,
        VITE_CLOUDINARY_API_KEY,
      } = import.meta.env;

      const formData = new FormData();
      formData.append("file", file); //e.target.files[0]
      formData.append("upload_preset", VITE_CLOUDINARY_PRESET_NAME);
      formData.append("api_key", VITE_CLOUDINARY_API_KEY);

      const response = await axios.post(
        //cloudinary에 이미지 보내기
        `https://api.cloudinary.com/v1_1/${VITE_CLOUDINARY_NAME}/image/upload`,
        formData,
        { headers: { "content-type": "multipart/form-data" } },
      );

      return response.data; //이미지 url 받아오기
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      else console.log(String(error));
    }
  };

  const fileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files?.[0]);
    try {
      if (!e.target.files?.[0]) {
        throw new Error("이미지 파일이 없습니다.");
      }
      const uploaded = await imageUploader(e.target.files[0]);

      setImages((arr) => [...arr, uploaded.url]);
      setShowImage(uploaded.url);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      else console.log(String(error));
    }
  };

  /**
   * preview 이미지 삭제 버튼
   */
  const onClickPreviewDeleteBtn = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    const parentEl = e.target.parentElement; // 삭제 버튼이 있는 부모 요소
    const imageUrl = e.target.previousSibling.getAttribute("src"); // 삭제 버튼이 있는 image의 src값
    // imageDelete(imageUrl.split("/")[7].split(".")[0]); // cloudinary 이미지 삭제
    setShowImage("");
    await setImages((images) => images.filter((image) => image !== imageUrl)); //error 두개가 삭제됨..
    await parentEl.remove();
  };

  return (
    <>
      <S.Container>
        <S.ImageContainer ref={containerRef} onClick={handleImageAnchor}>
          {images && <S.FeedImage src={showImage} alt="피드 이미지" />}
          {imageTagPos.length > 0 &&
            imageTagPos.map((item, index) => (
              <ImageAnchorTagButton key={index} x={item.x} y={item.y} />
            ))}
        </S.ImageContainer>
        <S.ImagePreveiwContainer>
          <label htmlFor="file">
            <S.InputImageButton>+</S.InputImageButton>
          </label>
          <S.InputImage
            id="file"
            type="file"
            accept="image/*"
            onChange={fileChange}
          />
          <S.ImagePreviewWrapper>
            {images.map((image, index) => {
              return (
                <S.ImagePreviewList key={index}>
                  <S.ImagePreview
                    src={image}
                    onClick={(e) => {
                      setShowImage(e.currentTarget.src);
                    }}
                  />
                  <S.ImageDeleteButton onClick={onClickPreviewDeleteBtn}>
                    x
                  </S.ImageDeleteButton>
                </S.ImagePreviewList>
              );
            })}
          </S.ImagePreviewWrapper>
        </S.ImagePreveiwContainer>
        <S.TextareaContainer>
          <S.Label htmlFor="feedContent">컨텐츠</S.Label>
          <S.Textarea
            id="feedContent"
            onChange={(e) => {
              setContents(e.target.value);
            }}
          ></S.Textarea>
        </S.TextareaContainer>
        <S.CategoryContainer>
          <S.Label htmlFor="category">카테고리</S.Label>
          <S.CategoryWrapper>
            <S.CategoryItem>집</S.CategoryItem>
            <S.CategoryItem>카페</S.CategoryItem>
            <S.CategoryItem>회사</S.CategoryItem>
            <S.CategoryItem>학원</S.CategoryItem>
            <S.CategoryItem>학교</S.CategoryItem>
            <S.CategoryItem>회의실</S.CategoryItem>
            <S.CategoryItem>유치원</S.CategoryItem>
            <S.CategoryItem>서점</S.CategoryItem>
          </S.CategoryWrapper>
        </S.CategoryContainer>
        <button
          onClick={async () => {
            const res = await createFeed({
              userId: "614d72a1b5ec679c080d8b12",
              category: "614d72a1b5ec679c080d8b12",
              content: contents,
              imgUrls: images,
            });
            console.log(res);
          }}
        >
          UPLOAD
        </button>
      </S.Container>
    </>
  );
}
