import "./FamilyProject.css";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import back from "./images/back.png";
import axios from "axios";
import calendarIcon from "./images/date.png"; 

export default function Project_write() {
  const navigate = useNavigate(); 
  const { id } = useParams(); // URL에서 'id' 파라미터 가져오기
  const [ProjectPost, setProjectPost] = useState(null); // 챌린지 상세 정보 저장

  // 챌린지 상세 정보 가져오기
  useEffect(() => {
    const fetchMission = async () => {
      const accessToken = localStorage.getItem('accessToken');
      try {
        const response = await axios.get(`https://dochi-nest-api.shop/api/project/search/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        });

        if (response.status === 200) {
          setProjectPost(response.data.data);
          console.log("조회 성공", response);
        } else {
          console.error('Failed to fetch:', response);
        }
      } catch (error) {
        console.error('Error fetching mission:', error);
      }
    };

    fetchMission();
  }, [id]);

  // ProjectPost가 로딩 중일 때 기본값을 표시하거나 로딩 상태 처리
  if (!ProjectPost) {
    return (
      <div>로딩 중...</div>
    );
  }

  const projectDate = new Date(ProjectPost.updated_at);

  return (
    <div className="project-write-container">
      <div className="mission-d-top-4">
        <div className="fam-project-d-back-img" onClick={() => navigate('/MypageMain')}>
          <img src={back} alt="" />
        </div>
        <div className="mission-d-title">프로젝트</div>
      </div>

      <div className="family-write-main-container">
        <div className="family-write-date">
          <div className="family-write-date-input">
            <span>작성일자: {projectDate.toLocaleDateString()}</span>
            <img src={calendarIcon} alt="Calendar Icon" className="calendar-icon" />
          </div>
        </div>

        <div className="family-write-title">
          <input
            type="text" 
            value={ProjectPost.projectName}
            readOnly
          />
        </div>
        <div className="family-write-location">
          <input
            type="text" 
            value={ProjectPost.location}
            readOnly
          />
        </div>

        <div className="fam-project-write-input-img">
          <span className="diary-write-camera-img">
            <img alt="mission" src={ProjectPost.image} />
          </span>
        </div>

        <div className="family-write-contents-container">
          <textarea
            className="family-write-contents"
            value={ProjectPost.content}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
