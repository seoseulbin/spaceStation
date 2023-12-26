import * as S from "../hooks/useCustomDialog.styles.ts";
import { GeoLocationPopupLayout } from "./GeoLocationPopup.styles.ts";

export default function GeoLocationPopup({
  isOpen,
  afterOpenDialog,
  beforeCloseDialog,
  toggleDialog,
  opacity,
}: {
  isOpen: boolean;
  afterOpenDialog: () => void;
  beforeCloseDialog: () => void;
  toggleDialog: () => void;
  opacity: number;
}) {
  const buttons = [
    {
      name: "취소",
      usage: "NEUTRAL",
      onClick: () => {
        toggleDialog();
      },
    },
    {
      name: "저장",
      usage: "SUBMIT",
      onClick: () => {
        toggleDialog();
      },
    },
  ];

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
        <GeoLocationPopupLayout
          opacity={opacity}
          description="위치 정보 검색"
          buttons={buttons}
        >
          <p>
            레이아웃 템플릿에 지정된 내용 외에도, 엘리먼트 또는 컴포넌트를 직접
            추가하여 내용 표시도 가능합니다.
          </p>
          <div id="map"></div>
        </GeoLocationPopupLayout>
      }
    ></S.ConfirmPopup>
  );
}
