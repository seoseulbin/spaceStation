import { useUpdateFeed } from "./UpdateFeed.hooks";
import { useCategory } from "../Feed/Category/Category.hooks";
import { ChangeEvent, useEffect, useState } from "react";
import * as S from "./UpdateFeed.styles";
import axios from "axios";
import { CgMathPlus } from "react-icons/cg";
import { GoX } from "react-icons/go";
import ApiBoundary from "../common/ApiBoundary";

interface UpdateFeedProps {
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

  const [showImage, setShowImage] = useState<string>(""); //대표 이미지
  const [images, setImages] = useState<string[]>([]); // 피드 이미지 배열
  const [contents, setContents] = useState<string>(""); // 컨텐츠 내용
  const [category, setCategory] = useState<string>(""); // 선택된 카테고리 아이디
  const [activeCategory, setActiveCategory] = useState<string | null>(null); // 활성화된 카테고리 검증
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
  const onClickPreviewDeleteBtn = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    const previousSibling = e.currentTarget.previousSibling;

    //if문은 타입 확인 && 값이 존재하는 지
    if (previousSibling && previousSibling instanceof HTMLImageElement) {
      const imageUrl = previousSibling.getAttribute("src");
      //TODO: cloudinary 이미지 삭제
      setShowImage("");
      setImages((images) => images.filter((image) => image !== imageUrl));
    }
  };

  useEffect(() => {
    if (feed) {
      setImages(feed.imgUrls);
      setShowImage(feed.imgUrls[0]);
      setContents(feed.content);
      setCategory(feed.category);
      setActiveCategory(feed.category);
    }
  }, [feed]);

  return (
    <>
      <S.Container>
        <S.ImageContainer>
          {showImage != "" ? (
            <S.FeedImage src={showImage} alt="피드 이미지" />
          ) : (
            <S.FeedImageEmpty>사진을 넣어주세요</S.FeedImageEmpty>
          )}
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
                  <S.ImageDeleteButton onClick={onClickPreviewDeleteBtn}>
                    <GoX color="gray" size="14" />
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
        <button
          onClick={async () => {
            await updateFeed({
              _id: feedId,
              category: category,
              content: contents,
              imgUrls: images,
            });
          }}
        >
          UPDATE
        </button>
      </S.Container>
    </>
  );
}
