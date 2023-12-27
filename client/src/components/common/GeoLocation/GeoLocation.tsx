import { Label } from "@/components/CreateFeed/CreateFeed.styles.ts";
import * as SDialog from "../hooks/useCustomDialog.styles.ts";
import { GeoLocationInnerLayout } from "./GeoLocation.styles.ts";
import { useCustomDialog } from "../hooks/useCustomDialog.tsx";
import KakaoMap from "./GeoLocation.Popup.kakaomap.tsx";

export default function GeoLocation() {
  const {
    toggleDialog,
    afterOpenDialog,
    beforeCloseDialog,
    opacity,
    isOpen,
    ConfirmPopupLayout,
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
      name: "위치 정보 저장",
      usage: "SUBMIT",
      onClick: () => {
        toggleDialog();
      },
    },
  ];

  return (
    <>
      <Label htmlFor="geolocation">위치</Label>
      <button
        onClick={() => {
          toggleDialog();
        }}
      >
        위치 정보 설정하기
      </button>
      <SDialog.ConfirmPopup
        isOpen={isOpen}
        afterOpen={afterOpenDialog}
        beforeClose={beforeCloseDialog}
        onBackgroundClick={toggleDialog}
        onEscapeKeydown={toggleDialog}
        opacity={opacity}
        backgroundProps={{ opacity }}
        children={
          <ConfirmPopupLayout buttons={buttons}>
            <GeoLocationInnerLayout>
              <KakaoMap />
            </GeoLocationInnerLayout>
          </ConfirmPopupLayout>
        }
      ></SDialog.ConfirmPopup>
    </>
  );
}
