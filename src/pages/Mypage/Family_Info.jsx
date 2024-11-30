import React, { useState, useEffect } from "react";
import back from "./images/back.png";
import "./Family_Info.css";
import profile from "./images/profile.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Family_Info() {
  const [userData, setUserData] = useState({ members: [] });
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");
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
        console.log(response.data); // API 응답 확인
        if (response.status === 200) {
          setUserData(response.data.data);
        } else {
          setError("유저 데이터를 불러오는 데 실패했습니다.");
        }
      } catch (err) {
        setError(err.message);
        console.error("API 요청 오류:", err);
      }
    };

    fetchData();
  }, [userId, accessToken]);

  const navigate = useNavigate();

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData || !userData.members) {
    return <div>Loading...</div>;
  }

  return (
    <div className="family-info-container">
      <div className="mission-d-top-6">
        <div className="mission-d-back-img-1" onClick={() => navigate("/MypageMain")}>
          <img src={back} alt="뒤로가기" />
        </div>
        <div className="mission-d-title">가족 소개</div>
      </div>
      <div className="user-edit-line"></div>
  
      <div className="family-info-top-container">
        <div className="family-info-title">
          {userData.groupName || "가족 이름"} <span>가족 구성원</span>
        </div>
        <div className="family-info-edit-button" onClick={() => navigate("/FamilyEdit")}>
          <button>가족 정보 수정</button>
        </div>
      </div>
  
      <div className="family-info-main-container">
        {userData.members?.length > 0 ? (
          userData.members.map((user, index) => (
            <div className="family-info-box" key={index}>
              <div className="family-info-profile">
                <img src={profile} alt={`${user.nickname} 프로필`} />
              </div>
              <div className="family-info-profile-text">
                <div className="family-info-nickname">
                  <span>닉네임</span>
                  <div className="family-info-nick-input">{user.nickname}</div>
                </div>
                <div className="family-info-username">
                  <span>아이디</span>
                  <div className="family-info-username-input">{user.username}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>가족 구성원이 없습니다.</div>
        )}
      </div>
    </div>
  );
}  
