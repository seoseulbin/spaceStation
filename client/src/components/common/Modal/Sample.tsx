import { useCustomDialog } from "../hooks/useCustomDialog";
import * as S from "../hooks/useCustomDialog.styles";

export function SampleModal() {
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
      <button onClick={toggleDialog}>모달 호출하기</button>
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
            description="모달 설명 글입니다. 내용이 길어져도 모두 보여집니다."
          />
        }
      ></S.StyledModal>
    </>
  );
}

export function SampleDialog() {
  const {
    ActionSheetLayout,
    toggleDialog,
    afterOpenDialog,
    beforeCloseDialog,
    opacity,
    isOpen,
  } = useCustomDialog();

  const options = [
    {
      name: "액션 시트 옵션 1입니다.",
      onClick: () => alert("옵션1을 클릭했습니다."),
    },
    {
      name: "액션 시트 옵션 2입니다.",
      onClick: () => alert("옵션2을 클릭했습니다."),
    },
    {
      name: "액션 시트 옵션 3입니다.",
      onClick: () => alert("옵션3을 클릭했습니다."),
    },
  ];

  return (
    <>
      <button onClick={toggleDialog}>액션 시트 호출하기</button>
      <S.StyledModal
        isOpen={isOpen}
        afterOpen={afterOpenDialog}
        beforeClose={beforeCloseDialog}
        onBackgroundClick={toggleDialog}
        onEscapeKeydown={toggleDialog}
        opacity={opacity}
        backgroundProps={{ opacity }}
        children={<ActionSheetLayout options={options} />}
      ></S.StyledModal>
    </>
  );
}

export function SampleConfirm() {
  const {
    ActionSheetLayout,
    toggleDialog,
    afterOpenDialog,
    beforeCloseDialog,
    opacity,
    isOpen,
  } = useCustomDialog();

  return (
    <>
      <button onClick={toggleDialog}>컨펌 팝업 호출하기</button>
      <S.StyledModal
        isOpen={isOpen}
        afterOpen={afterOpenDialog}
        beforeClose={beforeCloseDialog}
        onBackgroundClick={toggleDialog}
        onEscapeKeydown={toggleDialog}
        opacity={opacity}
        backgroundProps={{ opacity }}
        children={<ActionSheetLayout />}
      ></S.StyledModal>
    </>
  );
}
