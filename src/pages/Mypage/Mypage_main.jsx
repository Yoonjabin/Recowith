import { useState } from "react";
import "./Mypage_main.css";
import back from "./images/back.png";
import profile from "./images/profile.png";
import tape from "./images/tape.png";
import { useNavigate } from "react-router-dom";

export default function Mypage_main() {
  const [slideDirection, setSlideDirection] = useState(0);

  const navigate = useNavigate();
  const nickname = "사용자 닉네임"; // 테스트용 데이터
  const username = "사용자 아이디"; // 테스트용 데이터

  const handleMouseMove = (e) => {
    const middleX = window.innerWidth / 2;
    if (e.clientX > middleX) {
      setSlideDirection(1); // 오른쪽으로 슬라이드
    } else {
      setSlideDirection(-1); // 왼쪽으로 슬라이드
    }
  };

  const handleTouchStart = (e) => {
    const touchStartX = e.touches[0].clientX; // 터치 시작 X 좌표
    setSlideDirection({ touchStartX });
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX; // 터치 끝 X 좌표
    if (touchEndX > slideDirection.touchStartX) {
      setSlideDirection(1); // 오른쪽으로 슬라이드
    } else if (touchEndX < slideDirection.touchStartX) {
      setSlideDirection(-1); // 왼쪽으로 슬라이드
    }
  };

  return (
    <div
      className="mypage-main-container"
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart} // 터치 시작 이벤트
      onTouchEnd={handleTouchEnd} // 터치 끝 이벤트
    >
      <div className="mission-d-top-5">
        <div className="mission-d-back-img-1" onClick={() => navigate("/main")}>
          <img src={back} alt="뒤로가기" />
        </div>
        <div className="mission-d-title">마이페이지</div>
      </div>

      <div className="mypage-underline"></div>

      <div className="mypage-main-profile-container">
        <div className="mypage-main-profile-img">
          <img src={profile} alt="프로필 이미지" />
        </div>
        <div className="mypage-main-profile-text">
          <div className="mypage-main-profile-kind">
            <span>닉네임</span>
            <span>아이디</span>
          </div>
          <div className="mypage-main-profile-nickid">
            <span>{nickname}</span>
            <span>{username}</span>
            <button onClick={() => navigate("/UserEdit")}>회원정보 수정</button>
          </div>
        </div>
      </div>

      {/* 가족 구성원 섹션 */}
      <div className="mypage-main-family-container">
        <div className="mypage-main-family-title">러닝 <span>타이머</span></div>
        <div className="mypage-main-family-box">
          <div className="mypage-m-f-box-top">달린 시간 기록하기</div>
          <div className="mypage-main-line"></div>
          <div className="mypage-m-f-menu">
            <span onClick={() => navigate("/FamilyInfo")}>가족 소개</span>
            <span onClick={() => navigate("/PointMain")}>0P</span>
            <span onClick={() => navigate("/Family_mission")}>도전 과제</span>
          </div>
        </div>
      </div>

      {/* 프로젝트 섹션 */}
      <div className="mypage-main-project-container">
        <div className="mypage-main-project-title">도치둥지 <span>프로젝트</span></div>
        <div
          className={`mypage-main-project-contents-container ${slideDirection === -1 ? 'slide-right' : slideDirection === 1 ? 'slide-left' : ''}`}
        >
          <div className="no-project-">프로젝트가 없습니다.</div>
        </div>
      </div>
    </div>
  );
}
