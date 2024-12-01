import { useState, useEffect } from "react";
import "./Mypage_main.css";
import back from "./images/back.png";
import profile from "./images/profile.png";
import tape from "./images/tape.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Mypage_main() {
  const [userData, setUserData] = useState(null); 
  const [error, setError] = useState(null); 
  const [slideDirection, setSlideDirection] = useState(0);

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  const nickname = localStorage.getItem('nickname');
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/auth/search/${userId}`,{
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        });
        if (response.status === 200) {
          setUserData(response.data.data); 
          console.log(response)
        } else {
          console.log(response)
        }
      } catch (err) {
        setError(err.message); 
        console.error("API 요청 오류:", err);
      }
    };
    fetchData(); // 함수 호출
  }, [userId]);

  const handleMouseMove = (e) => {
    const middleX = window.innerWidth / 2;
    if (e.clientX > middleX) {
      setSlideDirection(1); // 오른쪽으로 슬라이드
    } else {
      setSlideDirection(-1); // 왼쪽으로 슬라이드
    }
  };

  // 터치 이벤트 처리 함수
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

  // 슬라이드 방향에 따른 클래스 결정
  const getSlideClass = () => {
    if (slideDirection === 1) {
      return "slide-right";
    } else if (slideDirection === -1) {
      return "slide-left";
    }
    return "";
  };

  // 프로젝트 클릭 시 해당 프로젝트 상세 페이지로 이동
  const handleProjectClick = (projectId) => {
    navigate(`/FamilyProject/${projectId}`); // 해당 프로젝트 ID를 포함하여 이동
  };

  return (
    <div 
      className="mypage-main-container" 
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart} // 터치 시작 이벤트
      onTouchEnd={handleTouchEnd}    // 터치 끝 이벤트
    >
      <div className="mission-d-top-5">
        <div className="mission-d-back-img-1" onClick={() => navigate("/main")}>
          <img src={back} alt="뒤로가기" />
        </div>
        <div className="mission-d-title">마이페이지</div>
      </div>

      <div className="mypage-underline"></div>

      {userData && ( 
        <>
          <div className="mypage-main-profile-container">
            <div className="mypage-main-profile-img">
              <img src={userData.user_img || profile} alt="프로필 이미지" />
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
            <div className="mypage-main-family-title">
            {userData.groupName || "러닝메이트"} <span>크루구성원</span>
            </div>
            <div className="mypage-main-family-box">
              <div className="mypage-m-f-box-top">{userData.groupName || "러닝메이트"}</div>
              <div className="mypage-m-f-box-family">
                {userData.members?.length > 0 ? (
                  userData.members.map((member, index) => (
                    <div className="mypage-family-member" key={index}>
                      <img src={member.user_img || profile} alt={member.nickname} />
                      <span>{member.nickname}</span>
                    </div>
                  ))
                ) : (
                  <div>크루 구성원이 없습니다.</div>
                )}
              </div>
              <div className="mypage-main-line"></div>
              <div className="mypage-m-f-menu">
                <span onClick={() => navigate("/FamilyInfo")}>러닝 크루 소개</span>
                <span onClick={() => navigate("/PointMain")}>{userData.point}P</span>
                <span onClick={() => navigate("/Family_mission")}>도전 과제</span>
              </div>
            </div>
          </div>

          {/* 프로젝트 섹션 */}
          <div className="mypage-main-project-container">
            <div className="mypage-main-project-title">
            {userData.groupName || "러닝메이트"} <span>크루 게시판</span>
            </div>
            <div className={`mypage-main-project-contents-container ${slideDirection === -1 ? 'slide-right' : slideDirection === 1 ? 'slide-left' : ''}`}>
              {userData.projects?.length > 0 ? (
                userData.projects.map((project, index) => (
                  <div className="mypage-main-project-contents" key={index} onClick={() => handleProjectClick(project.projectId)}>
                    <div className="mypage-main-project-box">
                      <img src={tape} alt="테이프" className="mypage-project-tape" />
                      <div className="mypage-main-project">
                        <img
                          src={`http://localhost:8080/${project.url}`}  // 이미지 URL 설정
                          alt={project.projectName}
                        />
                        <span className="mypage-project-date">{project.updatedAt.split('T')[0]}</span>
                        <span className="mypage-project-title">{project.projectName}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-project-">프로젝트가 없습니다.</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}