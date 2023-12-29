import * as SDialog from "../hooks/useCustomDialog.styles";
import { useCustomDialog } from "../hooks/useCustomDialog";
import toast from "react-hot-toast";
import UrlPreview from "../UrlPreview/UrlPreview";
import parseAPI from "./ImageAnchorButton.api";
import { useEffect, useRef, useState } from "react";
import { storage, storageKeys } from "@/global/storage";

export function ImageAnchorButtonPopup({
  index,
  currentImage,
  getTagInfo,
  onSuccess,
  toggleDialog,
  isOpen,
}: {
  index: string;
  currentImage: string;
  getTagInfo: (current: string) => { name: string; url: string }[];
  onSuccess: (
    current: string | undefined,
    index: string | undefined,
    name: string,
    url: string,
  ) => void;
  toggleDialog: () => void;
  isOpen: boolean;
}) {
  const [tagName, setTagName] = useState("");
  const [tagUrl, setTagUrl] = useState("");
  const [currentTag, setCurrentTag] = useState("");
  const [metaData, setMetaData] = useState(undefined);

  const tagNameRef = useRef<HTMLInputElement | null>(null);
  const tagUrlRef = useRef<HTMLInputElement | null>(null);

  const tagNameMaxLength = 15; // 태그명 최대 글자 수

  useEffect(() => {
    const tagInfo = getTagInfo(currentImage);
    console.log(tagInfo);

    if (isOpen) {
      if (tagNameRef.current)
        tagNameRef.current.value = tagInfo[parseInt(index)].name;
      if (tagUrlRef.current)
        tagUrlRef.current.value = tagInfo[parseInt(index)].url;
    }

    setTagName(tagInfo[parseInt(index)].name);
    setTagUrl(tagInfo[parseInt(index)].url);
    if (!tagInfo[parseInt(index)].url) setMetaData(undefined);
    setCurrentTag(index);
  }, [currentImage, getTagInfo, index, isOpen]);

  useEffect(() => {
    const currentTaginfo = storage.get(storageKeys.tagInfo);
    if (tagNameRef.current)
      tagNameRef.current.value = currentTaginfo ? currentTaginfo.name : "";
    if (tagUrlRef.current)
      tagUrlRef.current.value = currentTaginfo ? currentTaginfo.url : "";
  }, [metaData]);

  function inputOnchangeHandler(type: string, content: string) {
    const currentTaginfo = storage.get(storageKeys.tagInfo);

    if (type === "tagname") {
      storage.set(storageKeys.tagInfo, {
        name: content,
        url: currentTaginfo ? currentTaginfo.url : "",
      });
    } else if (type === "tagurl") {
      storage.set(storageKeys.tagInfo, {
        name: currentTaginfo ? currentTaginfo.name : "",
        url: content,
      });
    }
  }

  const { ConfirmPopupLayout, afterOpenDialog, beforeCloseDialog, opacity } =
    useCustomDialog();

  const buttons = [
    {
      name: "취소",
      usage: "NEUTRAL",
      onClick: () => {
        storage.remove(storageKeys.tagInfo);
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
        storage.remove(storageKeys.tagInfo);
        toggleDialog();
      },
    },
  ];

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

  return (
    <>
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
              <label>태그 이름 (최대 {tagNameMaxLength}글자)</label>
              <input
                ref={tagNameRef}
                name="tagname"
                type="text"
                placeholder="이름을 입력해주세요"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  inputOnchangeHandler(e.target.name, e.target.value);
                }}
                defaultValue={tagName}
                maxLength={tagNameMaxLength}
              />
            </section>
            <section>
              <label>링크</label>
              <div className="input-w-button">
                <input
                  ref={tagUrlRef}
                  name="tagurl"
                  type="text"
                  placeholder="URL을 입력해주세요"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    inputOnchangeHandler(e.target.name, e.target.value);
                  }}
                  defaultValue={tagUrl}
                />
                <button
                  //disabled={tagUrl.length == 0 ? true : false}
                  onClick={() => {
                    if (tagUrlRef.current) {
                      fetchUrlInfo(tagUrlRef.current.value);
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
