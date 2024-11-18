import React from "react";
import back from "./images/back.png";
import "./Family_Info.css"
import profile from "./images/profile.png";
import { useNavigate } from "react-router-dom";

export default function Family_Info() {
  const userProfile = [
    {
      username: "aaaa",
      nickname: "아기도치",
      img: profile,
    },
    {
      username: "bbbb",
      nickname: "엄마도치",
      img: profile,
    },
    {
      username: "cccc",
      nickname: "첫째도치",
      img: profile,
    },
    {
      username: "dddd",
      nickname: "둘째도치",
      img: profile,
    },
    {
      username: "eeee",
      nickname: "셋째도치",
      img: profile,
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="family-info-container">
      <div className="mission-d-top">
        <div className="mission-d-back-img" onClick={() => navigate("/MypageMain")}>
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

      <div className="family-info-main-container">
        {userProfile.map((user, index) => (
          <div className="family-info-box" key={index}>
            <div className="family-info-profile">
              <img src={user.img} alt={`${user.nickname} 프로필`} />
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
    </div>
  );
}
