import { useState } from "react";
import "./Mypage_main.css";
import back from "./images/back.png";
import profile from "./images/profile.png";
import project from "./images/project.png";
import tape from "./images/tape.png";
import { useNavigate } from "react-router-dom";

export default function Mypage_main() {
  const familyProfile = [
    { nickname: "아기도치", img: profile },
    { nickname: "엄마도치", img: profile },
    { nickname: "첫째도치", img: profile },
    { nickname: "둘째도치", img: profile },
    // { nickname: "셋째도치", img: profile },
  ];

  const familyProject = [
    { title: "가족 텃밭 일기", day: "2024-10-1", img: project },
    { title: "도치 가족 여행", day: "2024-11-10", img: project },
    { title: "가족 운동회", day: "2024-12-5", img: project },
  ];

  const [slideDirection, setSlideDirection] = useState(0); // 슬라이드 방향 초기화 (0: 정지, 1: 오른쪽, -1: 왼쪽)

  const handleMouseMove = (e) => {
    // 화면의 중간을 기준으로 왼쪽 또는 오른쪽으로 마우스가 움직이는지 판단
    const middleX = window.innerWidth / 2;
    if (e.clientX > middleX) {
      setSlideDirection(1); // 오른쪽으로 슬라이드
    } else {
      setSlideDirection(-1); // 왼쪽으로 슬라이드
    }
  };

  const navigate = useNavigate();

  return (
    <div className="mypage-main-container" onMouseMove={handleMouseMove}>
      <div className="mission-d-top">
        <div className="mission-d-back-img" onClick={() => navigate("/main")}>
          <img src={back} alt="" />
        </div>
        <div className="mission-d-title">마이페이지</div>
      </div>

      <div className="mypage-main-profile-container">
        <div className="mypage-main-profile-img">
          <img src={profile} alt="" />
        </div>
        <div className="mypage-main-profile-text">
          <div className="mypage-main-profile-kind">
            <span>닉네임</span>
            <span>아이디</span>
          </div>
          <div className="mypage-main-profile-nickid">
            <span>간지도치</span>
            <span>aaaaaa</span>
            <button onClick={() => navigate("/UserEdit")}>회원정보 수정</button>
          </div>
        </div>
      </div>

      <div className="mypage-main-family-container">
        <div className="mypage-main-family-title">
          간지도치네 <span>가족구성원</span>
        </div>
        <div className="mypage-main-family-box">
          <div className="mypage-m-f-box-top">도치 가족</div>
          <div className="mypage-m-f-box-family">
            {familyProfile.map((member, index) => (
              <div className="mypage-family-member" key={index}>
                <img src={member.img} alt={member.nickname} />
                <span>{member.nickname}</span>
              </div>
            ))}
          </div>
          <div className="mypage-main-line"></div>
          <div className="mypage-m-f-menu">
            <span onClick={() => navigate("FamilyInfo")}>가족 소개</span>
            <span onClick={() => navigate("/PointMain")}>5000P</span>
            <span>도전 과제</span>
          </div>
        </div>
      </div>

      <div className="mypage-main-project-container">
        <div className="mypage-main-project-title">
          간지도치네 <span>프로젝트</span>
        </div>

        <div className="mypage-main-project-contents-container">
          {familyProject.map((projectItem, index) => (
            <div
              className="mypage-main-project-contents"
              key={index}
              style={{
                transform: `translateX(${
                  slideDirection === 1 ? "-100%" : slideDirection === -1 ? "100%" : "0"
                })`,
                transition: "transform 0.5s ease",
              }}
            >
              <div className="mypage-main-project-box">
                <img src={tape} alt="" className="mypage-project-tape" />
                <div className="mypage-main-project">
                  <img src={projectItem.img} alt={projectItem.title} />
                  <span className="mypage-project-date">{projectItem.day}</span>
                  <span className="mypage-project-title">{projectItem.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
