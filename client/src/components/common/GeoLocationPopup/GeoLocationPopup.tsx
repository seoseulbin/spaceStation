import { Label } from "@/components/CreateFeed/CreateFeed.styles.ts";
import * as SDialog from "../hooks/useCustomDialog.styles.ts";
import { GeoLocationInnerLayout } from "./GeoLocationPopup.styles.ts";
import { useCustomDialog } from "../hooks/useCustomDialog";
//import { useEffect } from "react";
//import { Map } from 'react-kakao-maps-sdk';

// declare global {
//   interface Window {
//     kakao: any;
//   }
// }

export default function GeoLocationPopup() {
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

  // useEffect(() => {
  //   const container = document.getElementById('map');
  //   const options = {
  //     center: new window.kakao.maps.LatLng(33.450701, 126.570667),
  //     level: 3
  //   };

  //   let map = new window.kakao.maps.Map(container, options);
  // }, []);

  return (
    <>
      <Label htmlFor="geolocation">위치</Label>
      <button
        onClick={() => {
          toggleDialog();
        }}
      >
        위치 정보 추가하기
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
              <section>
                <label>위치 정보</label>
                <div className="input-w-button">
                  <input
                    name="geoInfo"
                    type="text"
                    placeholder="위치를 입력해주세요"
                    onChange={() => {
                      console.log("change");
                    }}
                  />
                  <button
                    disabled={false}
                    onClick={() => {
                      console.log("go");
                    }}
                  >
                    미리보기
                  </button>
                </div>
              </section>
              <div id="map"></div>
            </GeoLocationInnerLayout>
          </ConfirmPopupLayout>
        }
      ></SDialog.ConfirmPopup>
    </>
  );
}
