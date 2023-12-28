import * as S from "./ImageAnchorButton.styles";
import { useCustomDialog } from "../hooks/useCustomDialog";
import * as SDialog from "../hooks/useCustomDialog.styles";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import UrlPreview from "../UrlPreview/UrlPreview";
import parseAPI from "./ImageAnchorButton.api";

export default function ImageAnchorButton({
  x,
  y,
  index,
  currentImage,
  getTagInfo,
  onSuccess,
}: {
  x: number;
  y: number;
  currentImage: string;
  getTagInfo: (current: string) => { name: string; url: string }[];
  index: string;
  onSuccess: (
    current: string | undefined,
    index: string | undefined,
    name: string,
    url: string,
  ) => void;
}) {
  const {
    ConfirmPopupLayout,
    toggleDialog,
    afterOpenDialog,
    beforeCloseDialog,
    opacity,
    isOpen,
  } = useCustomDialog();

  const [tagName, setTagName] = useState("");
  const [tagUrl, setTagUrl] = useState("");
  const [currentTag, setCurrentTag] = useState("");
  const [metaData, setMetaData] = useState(undefined);

  const tagNameRef = useRef<HTMLInputElement | null>(null);
  const tagUrlRef = useRef<HTMLInputElement | null>(null);

  async function fetchUrlInfo(url: string) {
    try {
      // 입력된 URL의 유효성 검사
      const regex = /^(http:\/\/|https:\/\/).*\.[a-zA-Z]{2,}/;

      if (!regex.test(url)) {
        toast.error("유효하지 않은 URL입니다. 다시 한 번 확인해주세요.");
        return;
      }

      // URL에 접근하여 og 이미지와 제목 정보 가져오기
      const response = await parseAPI.getURLMetaData(url);

      setMetaData(response.data);
    } catch (error) {
      toast.error(error as string);
    }
  }

  useEffect(() => {
    tagNameRef?.current?.focus();
  }, [tagName]);

  useEffect(() => {
    tagUrlRef?.current?.focus();
  }, [tagUrl]);

  const buttons = [
    {
      name: "취소",
      usage: "NEUTRAL",
      onClick: () => {
        toggleDialog();
      },
    },
    {
      name: "저장",
      usage: "SUBMIT",
      onClick: () => {
        let name;
        let url;
        if (tagNameRef.current) {
          name = tagNameRef.current.value;
        }
        if (tagUrlRef.current) {
          url = tagUrlRef.current.value;
        }
        if (!name || !url) {
          toast.error("모든 필드를 입력해주세요.");
          return;
        }
        onSuccess(currentImage, currentTag, name, url);
        toggleDialog();
      },
    },
  ];

  return (
    <>
      <S.AnchorButton
        title={index}
        x={x}
        y={y}
        onClick={(e: React.BaseSyntheticEvent) => {
          const tagInfo = getTagInfo(currentImage);
          setTagName(tagInfo[parseInt(index)].name);
          setTagUrl(tagInfo[parseInt(index)].url);
          if (!tagInfo[parseInt(index)].url) setMetaData(undefined);
          toggleDialog();
          setCurrentTag(e.target.title);
        }}
      />
      <SDialog.ConfirmPopup
        isOpen={isOpen}
        afterOpen={afterOpenDialog}
        beforeClose={beforeCloseDialog}
        onBackgroundClick={toggleDialog}
        onEscapeKeydown={toggleDialog}
        opacity={opacity}
        backgroundProps={{ opacity }}
        children={
          <ConfirmPopupLayout
            description="태그 정보를 입력해주세요."
            buttons={buttons}
          >
            <section>
              <label>태그 이름</label>
              <input
                ref={tagNameRef}
                name="tagname"
                type="text"
                placeholder="이름을 입력해주세요"
                onChange={() => {
                  if (tagNameRef.current) {
                    setTagName(tagNameRef.current.value);
                  }
                }}
                value={tagName}
              />
            </section>
            <section>
              <label>링크</label>
              <div className="input-w-button">
                <input
                  ref={tagUrlRef}
                  name="taguRL"
                  type="text"
                  placeholder="URL을 입력해주세요"
                  onChange={() => {
                    if (tagUrlRef.current) {
                      setMetaData(undefined);
                      setTagUrl(tagUrlRef.current.value);
                    }
                  }}
                  value={tagUrl}
                />
                <button
                  disabled={tagUrl.length == 0 ? true : false}
                  onClick={() => {
                    if (tagUrl.length > 0) {
                      fetchUrlInfo(tagUrl);
                    }
                  }}
                >
                  미리보기
                </button>
              </div>
              <div className="meta-data">
                {metaData && <UrlPreview url={metaData} />}
              </div>
            </section>
          </ConfirmPopupLayout>
        }
      />
    </>
  );
}
