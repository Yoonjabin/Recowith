import React, { useState, useRef, useEffect } from "react";
import "./Mypage_main.css";
import back from "./images/back.png";
import profile from "./images/profile.png";
import startbtn from "./images/startbtn.png";
import pausebtn from "./images/pausebtn.png";
import stopbtn from "./images/stopbtn.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Mypage_main() {
  const [time, setTime] = useState(0); // 시간 (밀리초 단위)
  const [isRunning, setIsRunning] = useState(false); // 타이머 상태
  const [showPopup, setShowPopup] = useState(false); // 팝업 표시 상태
  const [records, setRecords] = useState([]); // 기록된 시간 저장
  const [userData, setUserData] = useState(null); // 유저 데이터 상태
  const [error, setError] = useState(null); // 에러 상태
  const timerRef = useRef(null); // 타이머 관리
  const navigate = useNavigate();

  // 로컬스토리지에서 유저 정보 가져오기
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const nickname = localStorage.getItem("nickname");
  const accessToken = localStorage.getItem("accessToken");

  // 시간 형식 변환
  const formatTime = (ms) => {
    const hours = String(Math.floor(ms / (1000 * 60 * 60))).padStart(2, "0");
    const minutes = String(Math.floor((ms / (1000 * 60)) % 60)).padStart(2, "0");
    const seconds = String(Math.floor((ms / 1000) % 60)).padStart(2, "0");
    const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
    return `${hours}시간 ${minutes}분 ${seconds}초 ${milliseconds}`;
  };

  // 타이머 시작
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 10); // 10ms 단위로 증가
      }, 10);
    }
  };

  // 타이머 일시정지
  const pauseTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(timerRef.current);
    }
  };

  // 정지 버튼 클릭 (팝업 표시)
  const stopTimer = () => {
    pauseTimer(); // 타이머를 먼저 멈춤
    setShowPopup(true);
  };

  // 팝업 종료 버튼 클릭 (시간 저장)
  const saveTime = () => {
    setShowPopup(false);
    setRecords((prevRecords) => [...prevRecords, formatTime(time)]);
    setTime(0); // 시간 초기화
  };

  // 팝업 취소 버튼 클릭
  const cancelPopup = () => {
    setShowPopup(false);
  };

  // 유저 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/auth/search/${userId}`, // API 호출
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          setUserData(response.data.data); // 유저 데이터 저장
        } else {
          setError("유저 데이터를 불러오는 데 실패했습니다.");
        }
      } catch (err) {
        setError("API 요청 중 오류가 발생했습니다.");
        console.error(err);
      }
    };
    fetchData(); // 데이터 가져오기
  }, [userId, accessToken]);

  return (
    <div className="mypage-main-container">
      <div className="mission-d-top-5">
        <div className="mission-d-back-img-1" onClick={() => navigate("/main")}>
          <img src={back} alt="뒤로가기" />
        </div>
        <div className="mission-d-title">마이페이지</div>
      </div>

      <div className="mypage-underline"></div>

      {/* 유저 데이터가 있으면 표시 */}
      {userData && (
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
              <span>{userData.nickname || nickname}</span>
              <span>{userData.username || username}</span>
              <button onClick={() => navigate("/UserEdit")}>
                회원정보 수정
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 타이머 섹션 */}
      <div className="mypage-main-family-container">
        <div className="mypage-main-family-box">
          <div className="mypage-m-f-box-top">달린 시간 기록하기</div>
          <div className="mypage-main-line"></div>
          <div className="timer-container">
            <h2>{formatTime(time)}</h2>

            <div className="timer-buttons">
              <button
                onClick={startTimer}
                disabled={isRunning}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: isRunning ? "not-allowed" : "pointer",
                }}
              >
                <img
                  src={startbtn}
                  alt="시작 버튼"
                  style={{
                    width: "50px", // 버튼 크기 조정
                    opacity: isRunning ? 0.5 : 1,
                  }}
                />
              </button>

              <button
                onClick={pauseTimer}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                }}
              >
                <img
                  src={pausebtn}
                  alt="일시정지 버튼"
                  style={{
                    width: "50px", // 버튼 크기 조정
                    opacity: isRunning ? 1 : 0.5,
                  }}
                />
              </button>

              <button
                onClick={stopTimer}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                }}
              >
                <img
                  src={stopbtn}
                  alt="정지 버튼"
                  style={{
                    width: "50px", // 버튼 크기 조정
                    opacity: isRunning ? 1 : 0.5,
                  }}
                />
              </button>
            </div>
          </div>
        </div>

        {/* 기록된 시간 */}
        <div className="record-container">
          <h3>기록된 시간</h3>
          <ul>
            {records.map((record, index) => (
              <li key={index}>{record}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* 팝업 */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>러닝을 종료하시겠습니까?</p>
            <button onClick={saveTime}>종료</button>
            <button onClick={cancelPopup}>취소</button>
          </div>
        </div>
      )}

      {/* 에러 메시지 표시 */}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
