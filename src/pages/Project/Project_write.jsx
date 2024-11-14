import "./Project_write.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import back from "./images/back.png";
import camera from "./images/camera.png";
import calendarIcon from "./images/date.png"; 
import Calendar from 'react-calendar';

export default function Project_write() {
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
    <div className="project-write-container">
      <div className="mission-d-top">
        <div className="mission-d-back-img" onClick={() => navigate('/')}>
          <img src={back} alt="" />
        </div>
        <div className="mission-d-title">가족 프로젝트</div>
      </div>

      <div className="project-write-main-container">
        <div className="project-write-date">
          <div className="project-write-date-input" onClick={toggleCalendar}>
            <span>{selectedDate ? `작성일자    ${selectedDate.toLocaleDateString()}` : "작성일자"}</span>
            <img src={calendarIcon} alt="Calendar Icon" className="calendar-icon" />
          </div>

          {isCalendarOpen && (
            <div className="project-write-calendar-modal">
              <div className="project-write-calendar-content">
                <Calendar
                  onChange={handleDateChange} // 날짜 선택 시 이벤트
                  value={selectedDate || new Date()}
                />
              </div>
            </div>
          )}
        </div>

        <div className="project-write-title">
          <input
            type="text" 
            placeholder="프로젝트 제목을 입력해 주세요"
            // value={title}
            // onChange={}
            required
          />
        </div>
        <div className="project-write-location">
          <input
            type="text" 
            placeholder="장소를 입력해 주세요"
            // value={location}
            // onChange={}
            required
          />
        </div>
        <div className="project-write-input-img" onClick={handleClick}>
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
            <span className="project-write-camera-img">
              <img src={camera} alt="" />
            </span>
          )}
        </div>

        <div className="project-write-contents-container">
          <textarea
            className="project-write-contents"
            placeholder="내용을 입력해 주세요"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
          <div className="project-write-char-count">({charCount}/{maxChars})</div>
        </div>
        <div className="mission-d-join" onClick={() => navigate('/ProjectFinish')}>
          <button>등록하기</button>
        </div>
      </div>
    </div>
  );
}
