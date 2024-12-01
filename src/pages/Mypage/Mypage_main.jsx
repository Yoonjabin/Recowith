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
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const nickname = localStorage.getItem("nickname");
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/auth/search/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          setUserData(response.data.data);
        } else {
          console.error(response);
        }
      } catch (err) {
        setError(err.message);
        console.error("API 요청 오류:", err);
      }
    };
    fetchData();
  }, [userId]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - e.currentTarget.offsetLeft); // 드래그 시작 X 좌표
    setScrollLeft(e.currentTarget.scrollLeft); // 현재 스크롤 위치 저장
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return; // 드래그 중이 아닐 때 동작하지 않음
    const container = e.currentTarget;
    const x = e.pageX - container.offsetLeft; // 현재 마우스 X 좌표
    const walk = (x - startX) * 1; // 이동 거리 계산
    container.scrollLeft = scrollLeft - walk; // 스크롤 이동
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleProjectClick = (projectId) => {
    navigate(`/FamilyProject/${projectId}`);
  };

  return (
    <div className="mypage-main-container">
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
                <button onClick={() => navigate("/UserEdit")}>
                  회원정보 수정
                </button>
              </div>
            </div>
          </div>

          {/* 가족 구성원 섹션 */}
          <div className="mypage-main-family-container">
            <div className="mypage-main-family-title">
              {userData.groupName || "러닝메이트"} <span>크루구성원</span>
            </div>
            <div className="mypage-main-family-box">
              <div className="mypage-m-f-box-top">
                {userData.groupName || "러닝메이트"}
              </div>
              <div className="mypage-m-f-box-family">
                {userData.members?.length > 0 ? (
                  userData.members.map((member, index) => (
                    <div
                      className="mypage-family-member"
                      key={index}
                    >
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
                <span onClick={() => navigate("/PointMain")}>
                  1300P
                </span>
                
              </div>
            </div>
          </div>

          {/* 프로젝트 섹션 */}
          <div className="mypage-main-project-container">
            <div className="mypage-main-project-title">
              {userData.groupName || "러닝메이트"} <span>크루 게시판</span>
            </div>
            <div
              className="mypage-main-project-contents-container"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              style={{
                cursor: isDragging ? "grabbing" : "grab",
                overflowX: "scroll",
                whiteSpace: "nowrap",
              }}
            >
              {userData.projects?.length > 0 ? (
                userData.projects.map((project, index) => (
                  <div
                    className="mypage-main-project-contents"
                    key={index}
                    onClick={() => handleProjectClick(project.projectId)}
                  >
                    <div className="mypage-main-project-box">
                      <img src={tape} alt="테이프" className="mypage-project-tape" />
                      <div className="mypage-main-project">
                        <img
                          src={`http://localhost:8080/${project.url}`} // 이미지 URL 설정
                          alt={project.projectName}
                        />
                        <span className="mypage-project-date">
                          {project.updatedAt.split("T")[0]}
                        </span>
                        <span className="mypage-project-title">
                          {project.projectName}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-project-">게시글이 없습니다.</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
