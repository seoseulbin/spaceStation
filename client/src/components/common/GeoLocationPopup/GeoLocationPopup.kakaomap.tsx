/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap() {
  const [map, setMap] = useState<any>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  //const [marker, setMarker] = useState<any>(null);

  const infowindow = window.kakao.maps.InfoWindow({ zIndex: 1 });

  //장소를 검색하는 함수입니다.
  function searchPlace(keyword: string) {
    // 장소 검색 객체를 생성합니다
    const ps = window.kakao.maps.services.Places();

    // 키워드로 장소를 검색합니다
    ps.keywordSearch(keyword, placesSearchCB);

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function placesSearchCB(
      data: string | any[],
      status: any,
      _pagination?: any,
    ) {
      console.log(_pagination);
      if (status === window.kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = window.kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(window.kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    }
  }

  // 지도에 마커를 표시하는 함수입니다
  function displayMarker(place: { y: any; x: any; place_name: string }) {
    // 마커를 생성하고 지도에 표시합니다
    const marker = window.kakao.maps.Marker({
      map: map,
      position: window.kakao.maps.LatLng(place.y, place.x),
    });

    // 마커에 클릭이벤트를 등록합니다
    window.kakao.maps.event.addListener(marker, "click", function () {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      infowindow.setContent(
        '<div style="padding:5px;font-size:12px;">' +
          place.place_name +
          "</div>",
      );
      infowindow.open(map, marker);
    });
  }

  // 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
  function zoomIn() {
    map.setLevel(map.getLevel() - 1);
  }

  // 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
  function zoomOut() {
    map.setLevel(map.getLevel() + 1);
  }

  useEffect(() => {
    if (!map) {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        setMap(new window.kakao.maps.Map(container, options));
        //setMarker(new window.kakao.maps.Marker());
      });
    }
  }, [map]);

  return (
    <>
      <section>
        <label>위치 정보</label>
        <div className="input-w-button">
          <input
            value={searchKeyword}
            name="geoInfo"
            type="text"
            placeholder="위치를 입력해주세요"
            onChange={(e: React.BaseSyntheticEvent) => {
              console.log("change");
              setSearchKeyword(e.target.value);
            }}
          />
          <button
            disabled={false}
            onClick={() => {
              console.log(searchKeyword);
              searchPlace(searchKeyword);
            }}
          >
            장소 검색
          </button>
        </div>
      </section>
      <div id="map" style={{ width: "100%", height: "300px" }}>
        <div className="custom_zoomcontrol radius_border">
          <span onClick={zoomIn}>
            <img
              src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"
              alt="확대"
            />
          </span>
          <span onClick={zoomOut}>
            <img
              src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"
              alt="축소"
            />
          </span>
        </div>
      </div>
    </>
  );
}
