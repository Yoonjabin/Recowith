import React, { useState, useEffect } from "react";
import back from "./images/back.png";
import remove from "./images/remove.png";
import "./FamilyEdit.css";
import profile from "./images/profile.png";
import familyPlus from "./images/familyPlus.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Family_Info() {
  const [userData, setUserData] = useState(null); // 사용자 데이터 상태
  const [error, setError] = useState(null); // 에러 상태

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
        if (response.status === 200) {
          setUserData(response.data.data || { members: [] }); // API에서 받은 데이터를 상태에 저장
          console.log(response);
        } else {
          console.log(response);
        }
      } catch (err) {
        setError(err.message); // 에러 메시지 저장
        console.error("API 요청 오류:", err);
      }
    };
    fetchData(); // 함수 호출
  }, [userId, accessToken]);

  const handleRemoveMember = async (memberId) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/group/remove/${memberId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        alert("멤버가 삭제되었습니다.");
        setUserData((prevData) => ({
          ...prevData,
          members: prevData.members.filter((member) => member.userId !== memberId),
        }));
      } else {
        setError(response.data.msg);
      }
    } catch (err) {
      setError("크루원 삭제 중 오류가 발생했습니다.");
      console.error("삭제 요청 오류:", err);
    }
  };

  const navigate = useNavigate();

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>; // Show a loading message while waiting for the data
  }

  return (
    <div className="family-edit-container">
      <div className="mission-d-top-22">
        <div
          className="mission-d-back-img-22"
          onClick={() => navigate("/FamilyInfo")}
        >
          <img src={back} alt="뒤로가기" />
        </div>
        <div className="mission-d-title">크루 정보 수정</div>
      </div>
      <div className="family-edit-line"></div>

      <div className="family-edit-top-container">
        {userData.groupName && (
          <div className="family-edit-title">
            {userData.groupName} <span>크루 구성원</span>
          </div>
        )}
        <div className="family-edit-edit-button">
          <button onClick={() => navigate("/FamilyInfo")}>수정 완료</button>
        </div>
      </div>

      {userData.members && (
        <div className="family-edit-main-container">
          {userData.members.map((user, index) => (
            <div className="family-edit-box" key={index}>
              <div
                className="family-plus-remove"
                onClick={() => handleRemoveMember(user.userId)}
              >
                <img src={remove} alt="삭제" />
              </div>
              <div className="family-edit-profile">
                <img src={profile} alt={`${user.nickname} 프로필`} />
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
      )}

      <div className="family-edit-plus-container">
        <img src={familyPlus} alt="크루원 추가" />
        <button onClick={() => navigate("/FamilyPlus")}>크루 구성원 추가</button>
      </div>
    </div>
  );
}
