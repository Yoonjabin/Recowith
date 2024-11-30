import "./AddCom.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import back from "./images/back.png";
import camera from "./images/camera.png";
import axios from "axios";
import calendarIcon from "./images/date.png"; 

export default function AddCom() {
  const navigate = useNavigate(); 

  const [title, setTitle] = useState(''); // 제목 상태 추가
  const [location, setLocation] = useState(''); // 장소 상태 추가
  const [charCount, setCharCount] = useState(0);
  const [description, setDescription] = useState('');
  const [imageSrc, setImageSrc] = useState(null);
  const [filename, setFilename] = useState(null); 
  const [binaryImageFile, setBinaryImageFile] = useState(null); 
  const todayDate = new Date(); // 오늘 날짜 고정

  // 게시물 등록 함수
  const handleProjectSubmit = async () => {
    const accessToken = localStorage.getItem('accessToken');
    
    const formData = new FormData();
    formData.append("projectName", title);
    formData.append("content", description);
    formData.append("location", location);
    formData.append("updated_at", todayDate.toISOString()); 
    if (binaryImageFile) {
      formData.append("url", binaryImageFile);
    }

    try {
      const response = await axios.post('http://localhost:8080/api/project/create', formData,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log(response)
      if (response.status === 200) {
        console.log(response.data);
        navigate('/MissionFinish');
      } else {
        console.error('등록 실패:', response);
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
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
      <div className="mission-d-top-4">
        <div className="mission-d-back-img" onClick={() => navigate('/MissionMain')}>
          <img src={back} alt="" />
        </div>
        <div className="mission-d-title">러닝 게시글</div>
      </div>

      <div className="project-write-main-container">
        <div className="project-write-date">
          <div className="project-write-date-input">
            <span>작성일자: {todayDate.toLocaleDateString()}</span>
            <img src={calendarIcon} alt="Calendar Icon" className="calendar-icon" />
          </div>
        </div>

        <div className="project-write-title">
          <input
            type="text" 
            placeholder="러닝크루 공지글을 입력해 주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // 제목 변경 핸들러
            required
          />
        </div>
        <div className="project-write-location">
          <input
            type="text" 
            placeholder="장소를 입력해 주세요"
            value={location}
            onChange={(e) => setLocation(e.target.value)} // 장소 변경 핸들러
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
        <div className="add-d-join" onClick={handleProjectSubmit}>
  <button className="mission-d-join">등록하기</button>
</div>
      </div>
    </div>
  );
}