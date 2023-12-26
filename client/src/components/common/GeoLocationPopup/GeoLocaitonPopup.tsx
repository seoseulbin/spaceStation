import { useCustomDialog } from "../hooks/useCustomDialog";
import * as S from "../hooks/useCustomDialog.styles";

export default function BottomSheet() {
  const {
    BasicModalLayout,
    toggleDialog,
    afterOpenDialog,
    beforeCloseDialog,
    opacity,
    isOpen,
  } = useCustomDialog();

  return (
    <S.ConfirmPopup
      isOpen={isOpen}
      afterOpen={afterOpenDialog}
      beforeClose={beforeCloseDialog}
      onBackgroundClick={toggleDialog}
      onEscapeKeydown={toggleDialog}
      opacity={opacity}
      backgroundProps={{ opacity }}
      children={
        <BasicModalLayout title="모달 타이틀" description="">
          <p>
            레이아웃 템플릿에 지정된 내용 외에도, 엘리먼트 또는 컴포넌트를 직접
            추가하여 내용 표시도 가능합니다.
          </p>
          <p>
            모달 콘텐츠 영역에 표시될 내용이 길어질 경우 세로 스크롤을 노출하여
            모두 확인할 수 있도록합니다.
          </p>
        </BasicModalLayout>
      }
    ></S.ConfirmPopup>
  );
}
