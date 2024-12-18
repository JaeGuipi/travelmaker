"use client";

import { useState } from "react";
import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk";
import { useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import s from "./MapInfo.module.scss";

const useKakaoLoader = () => {
  useKakaoLoaderOrigin({
    appkey: process.env.NEXT_PUBLIC_KAKAO_APPKEY!,
    libraries: ["clusterer", "drawing", "services"],
  });
};

interface MapInfoProps {
  address: string;
}

const MapInfo: React.FC<MapInfoProps> = ({ address }) => {
  useKakaoLoader(); // 카카오맵 SDK 로드
  const [isSdkLoaded, setIsSdkLoaded] = useState<boolean>(false);

  useEffect(() => {
    // 카카오 SDK 로드 여부를 확인하는 함수
    const checkKakaoLoaded = () => {
      if (typeof kakao !== "undefined") {
        setIsSdkLoaded(true);
      } else {
        setTimeout(checkKakaoLoaded, 300); // SDK가 로드되었는지 확인
      }
    };

    checkKakaoLoaded(); // SDK 로드 확인 시작
  }, []);

  useEffect(() => {
    if (!isSdkLoaded || !address) return; // SDK가 로드되지 않으면 종료

    // 지도를 표시할 div
    const mapContainer = document.getElementById("map");
    if (!mapContainer) return;

    const mapOptions = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 기본 지도 중심
      level: 3, // 지도의 확대 레벨
    };

    // 지도를 생성
    const map = new kakao.maps.Map(mapContainer, mapOptions);

    // 주소-좌표 변환 객체를 생성
    const geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색
    geocoder.addressSearch(address, (result, status) => {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(
          parseFloat(result[0].y), // y (latitude)를 숫자로 변환
          parseFloat(result[0].x), // x (longitude)를 숫자로 변환
        );

        // 결과값으로 받은 위치를 마커로 표시
        const marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });

        // 인포윈도우로 장소에 대한 설명을 표시
        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px 0;">${address}</div>`,
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동
        map.setCenter(coords);
      }
    });
  }, [address, isSdkLoaded]);

  if (!isSdkLoaded) {
    return <LoadingSpinner />; // SDK 로딩 중이면 로딩 표시
  }

  return <div id="map" className={s.map} />;
};

export default MapInfo;
