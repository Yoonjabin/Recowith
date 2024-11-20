import React from "react";
import { useState, useEffect } from "react";
import back from "./images/back.png";
import "./Family_Info.css"
import profile from "./images/profile.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Family_Info() {

  const [userData, setUserData] = useState(null); // 사용자 데이터 상태
  const [error, setError] = useState(null); // 에러 상태

  const userId = localStorage.getItem('userId');
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://dochi-nest-api.shop/api/auth/search/${userId}`,{
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

  const navigate = useNavigate();

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
          도치가족 <span>가족 구성원</span>
        </div>
        <div className="family-info-edit-button" onClick={() => navigate("/FamilyEdit")}>
          <button>가족 정보 수정</button>
        </div>
      </div>
      {userData && ( 
        <>
          <div className="family-info-main-container">
          {userData.members.map((user, index) => (
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
          ))}
        </div>
        </>
      )}
  </div>
  );
}
