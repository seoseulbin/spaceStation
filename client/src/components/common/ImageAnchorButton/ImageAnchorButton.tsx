import * as S from "./ImageAnchorButton.styles";
import { useCustomDialog } from "../hooks/useCustomDialog";
import { ImageAnchorButtonPopup } from "./ImageAnchorButton.popup";
import { FiPlus } from "react-icons/fi";

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
  const { toggleDialog, isOpen } = useCustomDialog();

  return (
    <>
      <S.AnchorButton
        title={index}
        x={x}
        y={y}
        onClick={() => {
          toggleDialog();
        }}
      >
        <FiPlus className="plus" size="12" color="white" strokeWidth="3" />
      </S.AnchorButton>
      <ImageAnchorButtonPopup
        isOpen={isOpen}
        index={index}
        currentImage={currentImage}
        onSuccess={onSuccess}
        getTagInfo={getTagInfo}
        toggleDialog={toggleDialog}
      />
    </>
  );
}
