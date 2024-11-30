import "./ProjectMap.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import back from "../Mission/images/back.png";

export default function Project_write() {
  const navigate = useNavigate();

  useEffect(() => {
    // Kakao 지도 API 초기화
    const container = document.getElementById("map"); // 지도가 표시될 HTML 요소
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 임시 지도 중심 좌표 (서울시청)
      level: 3, // 확대 레벨
    };

    const map = new window.kakao.maps.Map(container, options); // 지도 생성

    // 사용자 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude; // 사용자 위도
          const lng = position.coords.longitude; // 사용자 경도

          const currentLocation = new window.kakao.maps.LatLng(lat, lng); // 현재 위치 좌표

          // 지도 중심을 현재 위치로 변경
          map.setCenter(currentLocation);

          // 현재 위치에 마커 표시
          const marker = new window.kakao.maps.Marker({
            position: currentLocation,
          });
          marker.setMap(map);
        },
        (error) => {
          console.error("위치 정보를 가져올 수 없습니다:", error);
          alert("위치 정보를 가져올 수 없어 기본 위치로 설정됩니다.");
        }
      );
    } else {
      alert("이 브라우저에서는 위치 정보 사용이 지원되지 않습니다.");
    }
  }, []);

  return (
    <div className="project-map-container">
      {/* 상단 헤더 */}
      <div className="map-d-top-4">
        <div className="map-main-back-img" onClick={() => navigate("/main")}>
          <img src={back} alt="뒤로가기" />
        </div>
        <div className="map-d-title">지도</div>
      </div>

      <div className="map-message">
        러닝 경로를 <span className="highlight">쉽게</span> 찾아보세요!
      </div>

      <div className="map-card-container">
      
        <div className="map-card">
          <div id="map" className="map-content"></div>
        </div>
      </div>
    </div>
  );
}
