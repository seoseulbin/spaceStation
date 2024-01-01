import * as S from "./ImageAnchorButton.styles";
import { useCustomDialog } from "../hooks/useCustomDialog";
import { ImageAnchorButtonPopup } from "./ImageAnchorButton.popup";
import { FiPlus } from "react-icons/fi";
import { useSetRecoilState } from "recoil";
import { isModalOpenAtom } from "@/Atoms/isModalOpenAtom";

export default function ImageAnchorButton({
  x,
  y,
  index,
  currentImage,
  getTagInfo,
  onSuccess,
  onMouseDown,
  onTouchStart,
  draggingTag,
  isDragging,
  onDelete,
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
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  draggingTag: null | number;
  isDragging: boolean;
  onDelete: (showImage: string | undefined, draggingTag: number | null) => void;
}) {
  const { toggleDialog, isOpen } = useCustomDialog();
  const setIsModalOpen = useSetRecoilState(isModalOpenAtom);

  return (
    <>
      <S.AnchorButton
        title={index}
        x={x}
        y={y}
        data-dragging={
          draggingTag === parseInt(index) && isDragging ? "DRAGGING" : ""
        }
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onMouseUp={() => {
          if (!isDragging) {
            setIsModalOpen(true);
            toggleDialog();
          }
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
        onDelete={onDelete}
      />
    </>
  );
}
