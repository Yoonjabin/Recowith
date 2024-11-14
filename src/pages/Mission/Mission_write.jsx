import "./Mission_write.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import back from "./images/back.png";
import camera from "./images/camera.png";
import calendarIcon from "./images/date.png"; 
import Calendar from 'react-calendar';

export default function Mission_write() {
  const navigate = useNavigate(); 

  const [charCount, setCharCount] = useState(0);
  const [description, setDescription] = useState('');
  const [imageSrc, setImageSrc] = useState(null);
  const [filename, setFilename] = useState(null); 
  const [binaryImageFile, setBinaryImageFile] = useState(null); 

  const [selectedDate, setSelectedDate] = useState(null); 
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // 날짜 선택 시 호출되는 함수: 날짜를 선택하고 캘린더를 닫음
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };
    // 입력 상자 클릭 시 달력 모달 닫기
    const toggleCalendar = () => {
      setIsCalendarOpen(!isCalendarOpen); 
    };

  const handleClick = () => {
    document.getElementById('fileInput').click();
  };

  const onUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageSrc(reader.result || null);
      };
      setFilename(file.name);
      setBinaryImageFile(file);
    }
  };
  const maxChars = 500;
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setDescription(value);
      setCharCount(value.length);
    }
  };

  return (
    <div className="mission-write-container">
      <div className="mission-d-top">
        <div className="mission-d-back-img">
          <img src={back} alt="" />
        </div>
        <div className="mission-d-title">도전 과제 작성</div>
      </div>

      <div className="mission-write-main-container">
        <div className="mission-write-date">
          <div className="mission-write-date-input" onClick={toggleCalendar}>
            <span>{selectedDate ? `작성일자    ${selectedDate.toLocaleDateString()}` : "작성일자"}</span>
            <img src={calendarIcon} alt="Calendar Icon" className="calendar-icon" />
          </div>

          {isCalendarOpen && (
            <div className="mission-write-calendar-modal">
              <div className="mission-write-calendar-content">
                <Calendar
                  onChange={handleDateChange} // 날짜 선택 시 이벤트
                  value={selectedDate || new Date()}
                />
              </div>
            </div>
          )}
        </div>

        <div className="mission-write-title">가을 축제 방문하기</div>
        <div className="mission-write-input-img" onClick={handleClick}>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={onUpload}
          />
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Preview"
              style={{ width: '100%', height: '100%', borderRadius: '20px' }}
            />
          ) : (
            <span className="mission-write-camera-img">
              <img src={camera} alt="" />
            </span>
          )}
        </div>

        <div className="mission-write-contents-container">
          <textarea
            className="mission-write-contents"
            placeholder="내용을 입력해 주세요"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
          <div className="mission-write-char-count">({charCount}/{maxChars})</div>
        </div>
        <div className="mission-d-join" onClick={() => navigate('/MissionFinish')}>
          <button>등록하기</button>
        </div>
      </div>
    </div>
  );
}
