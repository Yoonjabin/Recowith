import { useState, useRef } from "react";
import "./Family_mission.css";
import { useNavigate } from "react-router-dom";
import startbtn from "./images/startbtn.png";
import pausebtn from "./images/pausebtn.png";
import stopbtn from "./images/stopbtn.png";
import back from "./images/back.png";

export default function Family_mission() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [records, setRecords] = useState([]);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const formatTime = (ms) => {
    const hours = String(Math.floor(ms / (1000 * 60 * 60))).padStart(2, "0");
    const minutes = String(Math.floor((ms / (1000 * 60)) % 60)).padStart(2, "0");
    const seconds = String(Math.floor((ms / 1000) % 60)).padStart(2, "0");
    const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }
  };

  const pauseTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(timerRef.current);
    }
  };

  const stopTimer = () => {
    pauseTimer();
    setShowPopup(true);
  };

  const saveTime = () => {
    setShowPopup(false);
    setRecords((prev) => [...prev, formatTime(time)]);
    setTime(0);
  };

  const cancelPopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="family-mission-container">
      {/* 상단 제목 섹션 */}
      <div className="mission-d-top-5">
        <div className="mission-d-back-img-1" onClick={() => navigate("/main")}>
          <img src={back} alt="뒤로가기" />
        </div>
        <div className="mission-d-title">미션 타이머</div>
      </div>

      <div className="timer-container">
        <h2>{formatTime(time)}</h2>
        <div className="timer-buttons">
          <button onClick={startTimer} disabled={isRunning}>
            <img src={startbtn} alt="시작" />
          </button>
          <button onClick={pauseTimer}>
            <img src={pausebtn} alt="일시정지" />
          </button>
          <button onClick={stopTimer}>
            <img src={stopbtn} alt="정지" />
          </button>
        </div>
      </div>

      <div className="record-container">
        <h3>기록된 시간</h3>
        <ul>
          {records.map((record, index) => (
            <li key={index}>{record}</li>
          ))}
        </ul>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>타이머를 종료하시겠습니까?</p>
            <button onClick={saveTime}>종료</button>
            <button onClick={cancelPopup}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
}
