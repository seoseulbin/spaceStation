import { useCustomDialog } from "../hooks/useCustomDialog";
import * as S from "../hooks/useCustomDialog.styles";

export default function Sample() {
  const {
    BasicModalLayout,
    toggleDialog,
    afterOpenDialog,
    beforeCloseDialog,
    opacity,
    isOpen,
  } = useCustomDialog();

  return (
    <>
      <button onClick={toggleDialog}>다이얼로그 - 모달 호출하기</button>
      <S.StyledModal
        isOpen={isOpen}
        afterOpen={afterOpenDialog}
        beforeClose={beforeCloseDialog}
        onBackgroundClick={toggleDialog}
        onEscapeKeydown={toggleDialog}
        opacity={opacity}
        backgroundProps={{ opacity }}
        children={
          <BasicModalLayout
            title="모달 타이틀입니다."
            description="모달 설명 글입니다."
          />
        }
      ></S.StyledModal>
    </>
  );
}
