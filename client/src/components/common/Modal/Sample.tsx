import Login from "@/components/Login/Login";
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
            title="모달 타이틀"
            description="description props로 할당한 모달 설명 글입니다."
          >
            <p>
              레이아웃 템플릿에 지정된 내용 외에도, 엘리먼트 또는 컴포넌트를
              직접 추가하여 내용 표시도 가능합니다.
            </p>
            <p>
              모달 콘텐츠 영역에 표시될 내용이 길어질 경우 세로 스크롤을
              노출하여 모두 확인할 수 있도록합니다.
            </p>
            <Login />
          </BasicModalLayout>
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
