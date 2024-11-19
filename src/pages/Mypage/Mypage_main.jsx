import { useState, useEffect } from "react";
import "./Mypage_main.css";
import back from "./images/back.png";
import profile from "./images/profile.png";
import tape from "./images/tape.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Mypage_main() {
  const [userData, setUserData] = useState(null); // 사용자 데이터 상태
  const [error, setError] = useState(null); // 에러 상태
  const [slideDirection, setSlideDirection] = useState(0); // 슬라이드 방향 초기화 (0: 정지, 1: 오른쪽, -1: 왼쪽)

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  const nickname = localStorage.getItem('nickname');
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://44.193.101.200:80/api/auth/search/${userId}`,{
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        });
        if (response.status === 200) {
          setUserData(response.data.data); // API에서 받은 데이터를 상태에 저장
          console.log(response)
        } else {
          console.log(response)
        }
      } catch (err) {
        setError(err.message); // 에러 메시지 저장
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

  // 슬라이드 방향에 따른 클래스 결정
  const getSlideClass = () => {
    if (slideDirection === 1) {
      return "slide-right";
    } else if (slideDirection === -1) {
      return "slide-left";
    }
    return "";
  };

  return (
    <div className="mypage-main-container" onMouseMove={handleMouseMove}>
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
              {userData.groupName} <span>  가족구성원</span>
            </div>
            <div className="mypage-main-family-box">
              <div className="mypage-m-f-box-top">{userData.groupName}</div>
              <div className="mypage-m-f-box-family">
                {userData.members?.length > 0 ? (
                  userData.members.map((member, index) => (
                    <div className="mypage-family-member" key={index}>
                      <img src={member.user_img || profile} alt={member.nickname} />
                      <span>{member.nickname}</span>
                    </div>
                  ))
                ) : (
                  <div>가족 구성원이 없습니다.</div>
                )}
              </div>
              <div className="mypage-main-line"></div>
              <div className="mypage-m-f-menu">
                <span onClick={() => navigate("/FamilyInfo")}>가족 소개</span>
                <span onClick={() => navigate("/PointMain")}>{userData.point}P</span>
                <span>도전 과제</span>
              </div>
            </div>
          </div>

           {/* 프로젝트 섹션 */}
            <div className="mypage-main-project-container">
            <div className="mypage-main-project-title">
              {userData.groupName} <span>프로젝트</span>
            </div>
            <div className={`mypage-main-project-contents-container ${slideDirection === 1 ? 'slide-right' : slideDirection === -1 ? 'slide-left' : ''}`}>
              {userData.projects?.length > 0 ? (
                userData.projects.map((project, index) => (
                  <div className="mypage-main-project-contents" key={index}>
                    <div className="mypage-main-project-box">
                      <img src={tape} alt="테이프" className="mypage-project-tape" />
                      <div className="mypage-main-project">
                        <img
                          src={`http://44.193.101.200:80/${project.url}`}  // 이미지 URL 설정
                          alt={project.projectName}
                        />
                        <span className="mypage-project-date">{project.updatedAt.split('T')[0]}</span>
                        <span className="mypage-project-title">{project.projectName}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>프로젝트가 없습니다.</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
