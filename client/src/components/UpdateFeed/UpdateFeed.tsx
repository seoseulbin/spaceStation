import { useUpdateFeed } from "./UpdateFeed.hooks";
import { useCategory } from "../Feed/Category/Category.hooks";
import React, { ChangeEvent, useEffect, useState } from "react";
import * as S from "./UpdateFeed.styles";
import axios from "axios";
import { CgMathPlus } from "react-icons/cg";
import { GoX } from "react-icons/go";
import ApiBoundary from "../common/ApiBoundary";
import Header from "../Header/Header";
import { useTagButtonHandler } from "../common/hooks/useTagButtonHandler";
import ImageAnchorButton from "../common/ImageAnchorButton/ImageAnchorButton";
import GeoLocation from "../common/GeoLocation/GeoLocation";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  geoLocationAtom,
  geoLocationMarkerAtom,
} from "../Atoms/GeoLocationAtom";

export interface UpdateFeedProps {
  feedId: string;
}

export default function UpdateFeed(props: UpdateFeedProps) {
  return (
    <ApiBoundary>
      <ApiComponent {...props} />
    </ApiBoundary>
  );
}

function ApiComponent({ feedId }: UpdateFeedProps) {
  const { categorys } = useCategory();
  const { updateFeed, feed } = useUpdateFeed(feedId);

  const [imageFiles, setImageFiles] = useState<(File | undefined)[]>([]); //cloudinary 파일 변환을 위한 상태
  const [showImage, setShowImage] = useState<string>(""); //대표 이미지
  const [images, setImages] = useState<string[]>([]); // 피드 이미지 배열
  const [contents, setContents] = useState<string>(""); // 컨텐츠 내용
  const [category, setCategory] = useState<string>(""); // 선택된 카테고리 아이디
  const [activeCategory, setActiveCategory] = useState<string | null>(null); // 활성화된 카테고리 검증
  const [hashtag, setHashtag] = useState<string[]>([]); // 해시태그
  const [updateHashTag, setUpdateHashTag] = useState<string>("");

  const [geoLocation, setGeoLocation] = useRecoilState(geoLocationAtom);
  const setGeoLocationMarker = useSetRecoilState(geoLocationMarkerAtom);

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
  } = useTagButtonHandler();

  // ImgTagButton 갱신을 위한 effect 훅
  useEffect(() => {
    setCurrentImage(imgList.find((item) => item.url === showImage));
  }, [imgList, setCurrentImage, showImage]);

  function fontColorSet(category: string) {
    switch (category) {
      case "집":
        return "#E58D5C";
      case "카페":
        return "#D5267A";
      case "회사":
        return "#A452DE";
      case "학원":
        return "#FFA000";
      case "학교":
        return "#ADE085";
      case "회의실":
        return "#FE87CE";
      case "유치원":
        return "#97DDF3";
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
      //TODO:추후 업로드 버튼을 눌렀을 시 cloudinary에 이미지가 저장되도록 변경 예정
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

    const result = imgList.map((image) => {
      if (image.url && image.url.startsWith("blob")) {
        //url이 "blob"으로 시작하는 요소만 list의 요소로 변경시켜줌
        return { ...image, url: list.shift() };
      }
      return image;
    }); // createObjectURL을 cloudinary url로 변경

    await updateFeed({
      _id: feedId,
      category: category,
      content: contents,
      imgUrls: result,
      hashtag,
      geoLocation: geoLocation,
    });
  };

  useEffect(() => {
    if (feed) {
      setImgList(feed.imgUrls);
      const imageUrls = feed.imgUrls.map((item) => item.url);
      setImages(imageUrls);
      setShowImage(feed.imgUrls[0].url);
      setContents(feed.content);
      setCategory(feed.category);
      setActiveCategory(feed.category);

      setUpdateHashTag(feed.hashtag.join(""));
      setGeoLocation(feed.geoLocation);
      setGeoLocationMarker(feed.geoLocation);
    }
  }, [feed, setGeoLocation, setGeoLocationMarker, setImgList]);

  const handleUpadatHashtag = (newTag: string) => {
    setUpdateHashTag(newTag);
    const removeWhiteSpace = newTag.replace(/\s/g, "");
    const newHashTag = removeWhiteSpace.match(/#[ㄱ-ㅎ가-힣a-zA-Z0-9]+/g);

    if (newHashTag !== null) setHashtag(newHashTag);
  };
  return (
    <>
      <Header
        backArrow={true}
        headerTitle="게시글 수정하기"
        isFunctionAcitve={true}
        functionIconType={"upload"}
        onClickFunction={() => {
          onClickUploadFeedBtn();
        }}
      />
      <S.Container>
        <S.ImageContainer
          ref={setTarget}
          onClick={(event: React.MouseEvent) =>
            addImageAnchor(showImage, event)
          }
        >
          {showImage !== "" ? (
            <S.FeedImage src={showImage} alt="피드 이미지" />
          ) : (
            <S.FeedImageEmpty>사진을 넣어주세요</S.FeedImageEmpty>
          )}
          <div
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
            }}
          >
            {currentImage &&
              currentImage.tagPosition.map((item, index) => (
                <ImageAnchorButton
                  key={index}
                  index={String(index)}
                  x={item.x}
                  y={item.y}
                  onSuccess={updateTagInfo}
                  currentImage={currentImage.url}
                  getTagInfo={getTagInfo}
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
                    <GoX color="white" size="14" />
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
            value={contents}
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
                  $fontColor={fontColorSet(item.category)}
                  $isActive={item._id === activeCategory ? true : false}
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
        <S.MapContainer>
          <GeoLocation />
        </S.MapContainer>
        <S.TextareaContainer>
          <S.Label htmlFor="feedHashtag">#해시태그</S.Label>
          <S.Textarea
            id="feedHashtag"
            value={updateHashTag}
            onChange={(e) => {
              handleUpadatHashtag(e.target.value);
            }}
          ></S.Textarea>
        </S.TextareaContainer>
      </S.Container>
    </>
  );
}
