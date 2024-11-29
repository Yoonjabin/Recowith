import "./ProjectMap.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import back from "../Mission/images/back.png";

export default function Project_write() {
  const navigate = useNavigate();

  useEffect(() => {
    // Kakao 지도 API를 초기화
    const container = document.getElementById("map"); // 지도가 표시될 HTML 요소
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 지도 중심 좌표 (서울시청)
      level: 3, // 확대 레벨
    };

    const map = new window.kakao.maps.Map(container, options); // 지도 생성
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

      {/* 지도 카드 컨테이너 */}
      <div className="map-card-container">
        <div className="map-card">
          <div id="map" className="map-content"></div>
        </div>
      </div>
    </div>
  );
}
