import { useState } from "react";
import * as S from "../ImageAnchorButton/ImageAnchorButton.styles";
import { useCustomDialog } from "../hooks/useCustomDialog";
import * as SDialog from "../hooks/useCustomDialog.styles";

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

  return (
    <>
      <S.AnchorButton
        data-disabled={
          currentImage.tagInfo[parseInt(index)].url ? "" : "disabled"
        }
        title={index}
        x={x}
        y={y}
        onClick={() => {
          const targetUrl = currentImage.tagInfo[parseInt(index)].url;
          setTagUrl(targetUrl);
          toggleDialog();
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
            description={
              <>
                <em>{tagUrl}</em> 로 이동합니다.
              </>
            }
            buttons={buttons}
          ></ConfirmPopupLayout>
        }
      />
    </>
  );
}
