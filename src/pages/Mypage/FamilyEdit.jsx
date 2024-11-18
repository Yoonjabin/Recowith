import React from "react";
import back from "./images/back.png";
import remove from "./images/remove.png"
import "./FamilyEdit.css"
import profile from "./images/profile.png";
import familyPlus from "./images/familyPlus.png"
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
    <div className="family-edit-container">
      <div className="mission-d-top">
        <div className="mission-d-back-img" onClick={() => navigate("/FamilyInfo")}>
          <img src={back} alt="뒤로가기" />
        </div>
        <div className="mission-d-title">가족 정보 수정</div>
      </div>
      <div className="user-edit-line"></div>

      <div className="family-edit-top-container">
        <div className="family-edit-title">
          도치가족 <span>가족 구성원</span>
        </div>
        <div className="family-edit-edit-button">
          <button onClick={() => navigate("/FamilyInfo")}>수정 완료</button>
        </div>
      </div>

      <div className="family-edit-main-container">
        {userProfile.map((user, index) => (
          <div className="family-edit-box" key={index}>
            <div className="family-plus-remove">
              <img src={remove} alt="" />
            </div>
            <div className="family-edit-profile">
              <img src={user.img} alt={`${user.nickname} 프로필`} />
            </div>
            <div className="family-edit-profile-text">
              <div className="family-edit-nickname">
                <span>닉네임</span>
                <div className="family-edit-nick-input">{user.nickname}</div>
              </div>
              <div className="family-edit-username">
                <span>아이디</span>
                <div className="family-edit-username-input">{user.username}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="family-edit-plus-container">
        <img src={familyPlus} alt="" />
        <button onClick={() => navigate("/FamilyPlus")}>가족 구성원 추가</button>
      </div>
    </div>
  );
}
