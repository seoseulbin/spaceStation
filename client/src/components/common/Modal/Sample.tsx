import { useCustomDialog } from "../hooks/useCustomDialog";
import * as S from "../hooks/useCustomDialog.styles";

export default function Sample() {
  const { toggleDialog, afterOpenDialog, beforeCloseDialog, opacity, isOpen } =
    useCustomDialog();

  return (
    <>
      <button onClick={toggleDialog}>다이얼로그 호출하기</button>
      <S.StyledModal
        isOpen={isOpen}
        afterOpen={afterOpenDialog}
        beforeClose={beforeCloseDialog}
        onBackgroundClick={toggleDialog}
        onEscapeKeydown={toggleDialog}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        <span>I am a Dialog!</span>
        <button onClick={toggleDialog}>다이얼로그 닫기</button>
      </S.StyledModal>
    </>
  );
}
