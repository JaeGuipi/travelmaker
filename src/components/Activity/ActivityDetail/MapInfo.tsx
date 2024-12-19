"use client";

import { useState } from "react";
import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk";
import { useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import s from "./MapInfo.module.scss";

// Kakao Maps SDK를 로드하는 커스텀 훅
const useKakaoLoader = () => {
  useKakaoLoaderOrigin({
    appkey: process.env.NEXT_PUBLIC_KAKAO_APPKEY!, // 환경 변수에서 앱 키 가져오기
    libraries: ["clusterer", "drawing", "services"], // 필요한 라이브러리 명시
  });
};

interface MapInfoProps {
  address: string;
}

const MapInfo: React.FC<MapInfoProps> = ({ address }) => {
  useKakaoLoader(); // Kakao Maps SDK 로드
  const [isSdkLoaded, setIsSdkLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Kakao SDK 로드 상태 확인
    const checkKakaoLoaded = () => {
      if (typeof kakao !== "undefined") {
        setIsSdkLoaded(true);
      } else {
        setTimeout(checkKakaoLoaded, 300); // 비동기로 로드 상태 반복 확인
      }
    };

    checkKakaoLoaded(); // 확인 시작
  }, []);

  useEffect(() => {
    if (!isSdkLoaded || !address) return; // SDK 미로드 또는 주소 없음 시 종료

    // Kakao Maps API 로드 확인
    if (typeof kakao === "undefined" || !kakao.maps) {
      console.error("Kakao Maps SDK가 로드되지 않았습니다.");
      return;
    }

    const mapContainer = document.getElementById("map"); // 지도 컨테이너 선택
    if (!mapContainer) return;

    const mapOptions = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 초기 중심 좌표
      level: 3, // 초기 확대 수준
    };

    const map = new kakao.maps.Map(mapContainer, mapOptions); // 지도 생성

    const geocoder = new kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체 생성

    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(parseFloat(result[0].y), parseFloat(result[0].x));

        const marker = new kakao.maps.Marker({
          map: map, // 마커를 추가할 지도
          position: coords, // 마커 위치
        });

        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px 0;">${address}</div>`, // 정보창 내용
        });
        infowindow.open(map, marker); // 마커 위에 정보창 표시

        map.setCenter(coords); // 지도의 중심 이동
      }
    });

    // 지도 이벤트에 디바운스 처리 추가
    let debounceTimeout: NodeJS.Timeout;
    kakao.maps.event.addListener(map, "idle", () => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        // 요청 제한 처리
        const bounds = map.getBounds(); // 현재 지도 범위 가져오기
        console.log("현재 지도 범위:", bounds);

        // 이곳에서 API 요청 등을 처리할 수 있습니다.
        console.log("데이터 요청 제한");
      }, 500); // 500ms 대기
    });
  }, [address, isSdkLoaded]); // address나 SDK 로드 상태 변경 시 실행

  if (!isSdkLoaded) {
    return <LoadingSpinner />; // SDK 로딩 중이면 로딩 표시
  }

  return <div id="map" className={s.map} />;
};

export default MapInfo;
