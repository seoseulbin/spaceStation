import { useCreateFeed } from "./CreateFeed.hooks";
import { useCategory } from "../Feed/Category/Category.hooks";
import React, { ChangeEvent, useEffect, useState } from "react";
import * as S from "./CreateFeed.styles";
import axios from "axios";
import { CgMathPlus } from "react-icons/cg";
import { GoX } from "react-icons/go";
import Header from "../Header/Header";
import ApiBoundary from "../common/ApiBoundary";
import { useTagButtonHandler } from "../common/hooks/useTagButtonHandler";
import ImageAnchorButton from "../common/ImageAnchorButton/ImageAnchorButton";
import GeoLocation from "../common/GeoLocation/GeoLocation";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  geoLocationAtom,
  geoLocationMarkerAtom,
} from "@/Atoms/GeoLocationAtom";
import { isModalOpenAtom } from "@/Atoms/isModalOpenAtom";

export default function CreateFeed() {
  return (
    <ApiBoundary>
      <ApiComponent />
    </ApiBoundary>
  );
}

function ApiComponent() {
  const { categorys } = useCategory();
  const { createFeed } = useCreateFeed();

  const [imageFiles, setImageFiles] = useState<(File | undefined)[]>([]); //cloudinary 파일 변환을 위한 상태
  const [showImage, setShowImage] = useState<string>(""); //대표 이미지
  const [images, setImages] = useState<string[]>([]); // 피드 이미지 배열
  const [contents, setContents] = useState<string>(""); // 컨텐츠 내용
  const [category, setCategory] = useState<string>(""); // 선택된 카테고리 아이디
  const [activeCategory, setActiveCategory] = useState<string | null>(null); // 활성화된 카테고리 검증
  const [hashtag, setHashtag] = useState<string>(""); // 해시태그

  const [geoLocation, setGeoLocation] = useRecoilState(geoLocationAtom);
  const setGeoLocationMarker = useSetRecoilState(geoLocationMarkerAtom);
  const isModalOepn = useRecoilValue(isModalOpenAtom);

  const {
    setTarget,
    imgList,
    setImgList,
    currentImage,
    setCurrentImage,
    addNewImage,
    addImageAnchor,
    updateTagInfo,
    getTagInfo,
    startDragTag,
    endDragTag,
    isDragging,
    setIsDragging,
    getCurrentMousePos,
    updateTagPosition,
    draggingTag,
    beforeTagPos,
  } = useTagButtonHandler();

  // ImgTagButton 갱신을 위한 effect 훅
  useEffect(() => {
    setCurrentImage(imgList.find((item) => item.url === showImage));
  }, [imgList, setCurrentImage, showImage]);

  // 최초 진입 시 초기화
  useEffect(() => {
    const initGeoLocation = {
      content: "",
      position: {
        lat: 0,
        lng: 0,
      },
    };

    setGeoLocation(initGeoLocation);
    setGeoLocationMarker(initGeoLocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fontColorSet(category: string) {
    switch (category) {
      case "집":
        return "#765E47";
      case "카페":
        return "#E0756A";
      case "회사":
        return "#81B2CC";
      case "학원":
        return "#ACCC71";
      case "학교":
        return "#FFC469";
      case "회의실":
        return "#FE87CE";
      case "유치원":
        return "#D089DB";
      case "서점":
        return "#6D8DFF";
      default:
        return "white";
    }
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
    try {
      if (!e.target.files?.[0]) {
        throw new Error("이미지 파일이 없습니다.");
      }
      const fileUrl = URL.createObjectURL(e.target.files[0]);

      setImageFiles((arr) => [...arr, e.target.files?.[0]]); // cloudinary 파일 변환을 위한 상태
      setImages((arr) => [...arr, fileUrl]);
      setShowImage(fileUrl);
      addNewImage(fileUrl); // useTagButtonHandler에 image 추가
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      else console.log(String(error));
    }
  };

  /**
   * preview 이미지 삭제 버튼
   */
  const onClickPreviewDeleteBtn = async (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    e.preventDefault();

    setShowImage("");
    setImageFiles((images) => {
      const newImages = [...images];
      newImages.splice(index, 1);
      return newImages;
    });
    setImages((images) => {
      const newImages = [...images];
      newImages.splice(index, 1);
      return newImages;
    });
    setImgList((images) => {
      const newImages = [...images];
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const onClickUploadFeedBtn = async () => {
    const list = await Promise.all(
      //cloudinary url 받아오기
      imageFiles.map(async (image) => {
        if (image) {
          const uploaded = await imageUploader(image);
          return uploaded.url;
        }
      }),
    );

    const result = imgList.map((image, idx) => ({ ...image, url: list[idx] })); // createObjectURL을 cloudinary url로 변경
    await createFeed({
      category: category,
      content: contents,
      imgUrls: result,
      hashtag: hashtag,
      geoLocation: geoLocation,
    });
  };

  return (
    <>
      <Header
        backArrow={true}
        headerTitle="게시글 업로드"
        isFunctionAcitve={true}
        functionIconType={"upload"}
        onClickFunction={() => {
          onClickUploadFeedBtn();
        }}
      />
      <S.Container
        onMouseMove={(event: React.MouseEvent) => {
          event.preventDefault();

          if (
            beforeTagPos.x !== null &&
            beforeTagPos !== getCurrentMousePos(event)
          ) {
            setIsDragging(true);
          }

          if (isDragging) {
            const currentPosition = getCurrentMousePos(event);
            if (currentPosition && draggingTag != null) {
              updateTagPosition(showImage, draggingTag, currentPosition);
            }
          }
        }}
        onMouseUp={(event: React.MouseEvent) => {
          endDragTag();
          console.log(event);
          // console.log(target);
          // const dragEndTagPosition = getCurrentMousePos(event);
          // if(event.target !== target &&
          //   dragEndTagPosition !== undefined &&
          //   (dragEndTagPosition.x < 0 ||
          //   dragEndTagPosition.x > 100 ||
          //   dragEndTagPosition.y < 0 ||
          //   dragEndTagPosition.y > 100)) {
          //     console.log("out of container");
          //     deleteTag(showImage, draggingTag);
          // }
        }}
        onTouchMove={(event: React.TouchEvent) => {
          event.preventDefault();

          if (beforeTagPos !== getCurrentMousePos(event)) {
            setIsDragging(true);
          }

          if (isDragging) {
            const currentPosition = getCurrentMousePos(event);
            if (currentPosition && draggingTag != null) {
              updateTagPosition(showImage, draggingTag, currentPosition);
            }
          }
        }}
        onTouchEnd={(event: React.TouchEvent) => {
          endDragTag();
          console.log(event);
        }}
      >
        <S.ImageContainer
          ref={setTarget}
          onMouseUp={(event: React.MouseEvent) => {
            console.log(isDragging, beforeTagPos, isModalOepn);
            if (!isDragging && beforeTagPos.x == null && !isModalOepn) {
              addImageAnchor(showImage, event);
            }
          }}
        >
          {showImage !== "" ? (
            <S.FeedImage src={showImage} alt="피드 이미지" />
          ) : (
            <S.FeedImageEmpty>사진을 넣어주세요</S.FeedImageEmpty>
          )}
          <div>
            {currentImage?.tagPosition &&
              currentImage.tagPosition.length > 0 &&
              currentImage.tagPosition.map((item, index) => (
                <ImageAnchorButton
                  onMouseDown={startDragTag}
                  onTouchStart={startDragTag}
                  key={index}
                  index={String(index)}
                  x={item.x}
                  y={item.y}
                  onSuccess={updateTagInfo}
                  currentImage={currentImage.url}
                  getTagInfo={getTagInfo}
                  draggingTag={draggingTag}
                  isDragging={isDragging}
                />
              ))}
          </div>
        </S.ImageContainer>
        <S.ImagePreveiwContainer>
          <label htmlFor="file">
            <S.InputImageButton>
              <CgMathPlus size="36" color="#2B2B2B" />
            </S.InputImageButton>
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
                  <S.ImageDeleteButton
                    onClick={(e) => onClickPreviewDeleteBtn(e, index)}
                  >
                    <GoX color="white" size="16" strokeWidth="2" />
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
            {categorys?.map((item) => {
              return (
                <S.CategoryItem
                  key={item._id}
                  $isActive={item._id === activeCategory ? true : false}
                  $fontColor={fontColorSet(item.category)}
                  onClick={() => {
                    setActiveCategory((prev) =>
                      prev === item._id ? null : item._id,
                    );
                    setCategory((prev) => (prev === item._id ? "" : item._id));
                  }}
                >
                  {item.category}
                </S.CategoryItem>
              );
            })}
          </S.CategoryWrapper>
        </S.CategoryContainer>
        <S.TextareaContainer>
          <S.Label htmlFor="feedHashtag">#해시태그</S.Label>
          <S.Textarea
            id="feedHashtag"
            onChange={(e) => {
              setHashtag(e.target.value);
            }}
            placeholder="'#' 태그를 꼭 붙여주세요 ⸜( ˙ ˘ ˙)⸝♡"
          ></S.Textarea>
        </S.TextareaContainer>
        <S.MapContainer>
          <GeoLocation />
        </S.MapContainer>
      </S.Container>
    </>
  );
}
