import "./Mission_write.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import back from "./images/back.png";
import camera from "./images/camera.png";

export default function Mission_write() {
  const navigate = useNavigate(); 

  const [charCount, setCharCount] = useState(0);
  const [description, setDescription] = useState('');
  const [imageSrc, setImageSrc] = useState(null);
  const [filename, setFilename] = useState(null); 
  const [binaryImageFile, setBinaryImageFile] = useState(null); 
  const todayDate = new Date(); // 오늘 날짜 고정

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

  // 게시물 등록 함수
  const handlePostSubmit = async () => {
    const accessToken = localStorage.getItem('accessToken');
    
    const formData = new FormData();
    formData.append("review", description);
    formData.append("uploadDate", todayDate.toISOString()); 
    if (binaryImageFile) {
      formData.append("image", binaryImageFile);
    }

    try {
      const response = await axios.post('https://dochi-nest-api.shop/api/challenges/1/upload', formData,
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

  return (
    <div className="mission-write-container">
      <div className="mission-d-top-3">
        <div className="mission-d-back-img" onClick={() => navigate('/MissionMain')}>
          <img src={back} alt="" />
        </div>
        <div className="mission-d-title">도전 과제 작성</div>
      </div>

      <div className="mission-write-main-container">
        <div className="mission-write-date">
          {/* 날짜를 고정된 값으로 표시 */}
          <div className="mission-write-date-input">
            <span>작성일자: {todayDate.toLocaleDateString()}</span>
          </div>
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
        <div className="mission-d-join" onClick={handlePostSubmit}>
          <button>등록하기</button>
        </div>
      </div>
    </div>
  );
}
