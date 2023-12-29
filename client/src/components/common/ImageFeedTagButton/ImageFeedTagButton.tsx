import { useState } from "react";
import * as S from "../ImageAnchorButton/ImageAnchorButton.styles";
import { useCustomDialog } from "../hooks/useCustomDialog";
import * as SDialog from "../hooks/useCustomDialog.styles";
import { FiPlus } from "react-icons/fi";
import { IoTriangle } from "react-icons/io5";

export default function ImageFeedTagButton({
  x,
  y,
  index,
  currentImage,
}: {
  x: number;
  y: number;
  currentImage: {
    url: string;
    tagPosition: {
      x: number;
      y: number;
    }[];
    tagInfo: {
      name: string;
      url: string;
    }[];
  };
  index: string;
}) {
  const {
    ConfirmPopupLayout,
    toggleDialog,
    afterOpenDialog,
    beforeCloseDialog,
    opacity,
    isOpen,
  } = useCustomDialog();

  const buttons = [
    {
      name: "취소",
      usage: "NEUTRAL",
      onClick: () => {
        toggleDialog();
      },
    },
    {
      name: "이동",
      usage: "SUBMIT",
      onClick: () => {
        toggleDialog();
        window.open(tagUrl, "_blank");
      },
    },
  ];

  const [tagUrl, setTagUrl] = useState("");
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <S.AnchorButton
        data-disabled={
          currentImage.tagInfo[parseInt(index)].url ? "" : "disabled"
        }
        x={x}
        y={y}
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        <FiPlus className="plus" size="12" color="white" />
        {isActive && (
          <S.PreveiwInfo
            x={x}
            y={y}
            length={currentImage.tagInfo[parseInt(index)].name.length}
            onClick={() => {
              const targetUrl = currentImage.tagInfo[parseInt(index)].url;
              setTagUrl(targetUrl);
              toggleDialog();
            }}
          >
            <IoTriangle className="triangle" color="#bf5789" size="8" />
            {currentImage.tagInfo[parseInt(index)].name}
          </S.PreveiwInfo>
        )}
      </S.AnchorButton>
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
            description={
              <>
                <em>
                  {tagUrl.length > 60
                    ? tagUrl.split("\n")[0].slice(0, 60) + "..."
                    : tagUrl}
                </em>{" "}
                로 이동합니다.
              </>
            }
            buttons={buttons}
          ></ConfirmPopupLayout>
        }
      />
    </>
  );
}
