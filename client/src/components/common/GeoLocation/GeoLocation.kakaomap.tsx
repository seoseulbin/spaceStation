import {
  geoLocationAtom,
  geoLocationMarkerAtom,
} from "@/Atoms/GeoLocationAtom";
import { storage, storageKeys } from "@/global/storage";
import { GeoLocationType } from "@/global/types/GeoLocation";
import { useEffect, useRef, useState } from "react";
import { IoIosPin } from "react-icons/io";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useRecoilState, useRecoilValue } from "recoil";

export default function KakaoMap() {
  const mapRef = useRef<kakao.maps.Map>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [info, setInfo] = useState<GeoLocationType>();
  const [markers, setMarkers] = useState<GeoLocationType[]>([]);

  const geoLocation = useRecoilValue(geoLocationAtom);
  const [geoLocationMarker, setGeoLocationMarker] = useRecoilState(
    geoLocationMarkerAtom,
  );

  // 장소를 검색하는 함수입니다.
  function searchPlace(keyword: string) {
    const map = mapRef.current;
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        const markers = [];

        for (let i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: Number(data[i].y),
              lng: Number(data[i].x),
            },
            content: data[i].place_name,
          });
          bounds.extend(
            new kakao.maps.LatLng(Number(data[i].y), Number(data[i].x)),
          );
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }

      if (_pagination) return;
    });
  }

  const zoomIn = () => {
    const map = mapRef.current;
    if (!map) return;
    map.setLevel(map.getLevel() - 1);
  };

  const zoomOut = () => {
    const map = mapRef.current;
    if (!map) return;
    map.setLevel(map.getLevel() + 1);
  };

  // 위치 정보를 저장하는 함수
  function setGeoLocationInfo(marker: GeoLocationType) {
    setInfo(marker);
    setGeoLocationMarker(marker);
    storage.set(storageKeys.geoLocation, {
      content: marker.content,
      position: {
        lat: marker.position.lat,
        lng: marker.position.lng,
      },
    });
  }

  useEffect(() => {
    if (geoLocation && geoLocation.content !== "") {
      setMarkers([geoLocation]);
    }
  }, [geoLocation, geoLocation?.content]);

  return (
    <>
      <section>
        {/* <label>장소 검색</label> */}
        <div className="input-w-button">
          <input
            value={searchKeyword}
            name="geoInfo"
            type="text"
            placeholder="장소 검색 후 마커를 선택해주세요."
            onChange={(e: React.BaseSyntheticEvent) => {
              setSearchKeyword(e.target.value);
            }}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.code === "Enter") {
                searchPlace(searchKeyword);
              }
            }}
          />
          <button
            disabled={false}
            onClick={() => {
              searchPlace(searchKeyword);
            }}
          >
            검색하기
          </button>
        </div>
      </section>
      <Map
        ref={mapRef}
        id="map"
        center={{
          lat: geoLocation?.position.lat
            ? geoLocation.position.lat
            : 37.5468522347172,
          lng: geoLocation?.position.lng
            ? geoLocation.position.lng
            : 127.066289337018,
        }}
        style={{
          width: "100%",
          height: "240px",
        }}
        level={3} // 지도의 확대 레벨
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => {
              setGeoLocationInfo(marker);
            }}
          >
            {info && info.content === marker.content && (
              <div
                className="MapMarker"
                style={{ color: "#000", padding: "3px 8px 4px" }}
              >
                ✅ {marker.content}
              </div>
            )}
          </MapMarker>
        ))}
      </Map>
      {/* zoom control UI */}
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
      {/* selected map info field (read-only) */}
      <section>
        <label>선택된 장소</label>
        <div>
          <IoIosPin size={18} />
          <input
            value={
              geoLocationMarker && geoLocationMarker.content !== ""
                ? geoLocationMarker.content
                : "선택된 장소가 표시됩니다."
            }
            name="geoSelectedInfo"
            type="text"
            readOnly
          />
        </div>
      </section>
    </>
  );
}
