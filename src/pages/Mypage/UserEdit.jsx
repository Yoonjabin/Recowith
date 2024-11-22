import React, { useState } from "react";
import "./UserEdit.css";
import back from "./images/back.png";
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

export default function UserEdit() {
  const navigate = useNavigate(); 

  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [email] = useState(localStorage.getItem("email"));
  const [username] = useState(localStorage.getItem("username"));
  const [userId] = useState(localStorage.getItem("userId"));

  const token = localStorage.getItem("accessToken");

  const handleSubmit = async () => {
    try {
      const response = await axios.put("https://dochi-nest-api.shop/api/auth/updateUser", {
        userId: String(userId),
        password: password,
        email: email,
        nickname: nickname
      },{
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });

      if (response.status === 200) {
        console.log(response);
        alert("회원정보 수정 완료!");

      // 로컬 스토리지 업데이트
      if (nickname) localStorage.setItem("nickname", nickname);
      if (email) localStorage.setItem("email", email);

        navigate("/MypageMain");
      } else {
        console.log(response);
        alert("회원정보 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원정보 수정 중 오류가 발생했습니다.", error);
      alert("회원정보 수정에 실패했습니다.");
    }
  };

  // 로그아웃 처리
  const handleLogout = async () => {
    try {
      const response = await axios.post("https://dochi-nest-api.shop/api/auth/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        localStorage.clear();
        alert("로그아웃 되었습니다.");
        navigate("/");
      } else {
        console.error("로그아웃 실패:", response);
        alert("로그아웃 실패");
      }
    } catch (error) {
      console.error("로그아웃 오류:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="user-edit-container">
      <div className="mission-d-top-10">
        <div className="mission-d-back-img" onClick={() => navigate('/MypageMain')}>
          <img src={back} alt="" />
        </div>
        <div className="mission-d-title">회원정보 수정</div>
      </div>

      <div className="mypage-underline"></div>

      <div className="user-logout-button">
        <button onClick={handleLogout}>로그아웃</button>
      </div>

      <div className="user-edit-contents">
        <div className="user-edit-id">
          <div>
            <span className="user-edit-highlight">*</span>
            <span>아이디</span>
          </div>
          <input
            type="text"
            value={username}
            readOnly
          />
        </div>

        <div className="user-edit-password">
          <div>
            <span className="user-edit-highlight">*</span>
            <span>비밀번호</span>
          </div>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="user-edit-email">
          <div>
            <span className="user-edit-highlight">*</span>
            <span>이메일</span>
          </div>
          <input
            type="email"
            value={email}
            readOnly
          />
        </div>

        <div className="user-edit-nickname">
          <div>
            <span className="user-edit-highlight">*</span>
            <span>닉네임</span>
          </div>
          <input 
            type="text" 
            placeholder="닉네임을 입력하세요."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />       
        </div>
      </div>

      <div className="user-edit-button">
        <button onClick={handleSubmit}>회원정보 수정 완료</button>
      </div>
    </div>
  );
}
