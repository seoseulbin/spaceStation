import * as S from "./ImageAnchorButton.styles";
import { useCustomDialog } from "../hooks/useCustomDialog";
import * as SDialog from "../hooks/useCustomDialog.styles";

export default function ImageAnchorButton({
  x,
  y,
  onClick,
}: {
  x: number;
  y: number;
  onClick?: (e: React.BaseSyntheticEvent) => void;
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
      onClick: () => toggleDialog(),
    },
    {
      name: "태그 추가",
      usage: "SUBMIT",
      onClick: () => onClick,
    },
  ];

  return (
    <>
      <S.AnchorButton
        x={x}
        y={y}
        onClick={() => {
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
            description="추가할 태그 정보를 입력해주세요."
            buttons={buttons}
          >
            <section>
              <label>태그 이름</label>
              <input
                name="tagName"
                type="text"
                placeholder="이름을 입력해주세요"
              />
            </section>
            <section>
              <label>링크</label>
              <input
                name="tagURL"
                type="text"
                placeholder="URL을 입력해주세요"
              />
            </section>
          </ConfirmPopupLayout>
        }
      />
    </>
  );
}
