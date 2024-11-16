import "./Mission_main.css"
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from "axios";
import mission1 from "./images/mission1.png"
import mission2 from "./images/mission2.png"
import mission3 from "./images/mission3.png"
import back from "./images/back.png"

export default function Mission_main(){
  const navigate = useNavigate(); 
  const [missionPost, setmissionPost] = useState([]); 

  useEffect(() => {
    const fetchPosts = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        const response = await axios.get('http://server-api//api/challenges',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`, 
                }
            });

        if (response.data.SUCCESS) {
        setmissionPost(response.data.data); 
        console.log("Fetched posts:", response.data.data); 
        } else {
        console.error('Failed to fetch post:', response.data.message);
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
    };
    fetchPosts();
  }, []);

  const handleNavigate = (id) => {
    navigate(`/MissionDetail/${id}`); 
  };

  return (
    <div className="mission-main-container">
      <div className="mission-main-top">
        <div className="mission-main-back-img" onClick={() => navigate('/')}>
          <img src={back} alt="" />
        </div>
        <div className="mission-main-title">
          모든 <span>도전 과제</span><br />확인하기
        </div>
      </div>

      <div className="mission-main-contents">
        <div className="mission-main-1" onClick={() => handleNavigate(1)}>
          <div className="mission-main-1-text">
            <div className="mission-main-1-sub">
              지역 축제 방문하기! <br />
              <span>가을 축제 방문하기</span>
            </div>
            <div className="mission-main-1-daypoint">
              <div className="mission-main-1-day">
                D-{missionPost.find(post => post.id === 1)?.remaining_days}
              </div>
              <div className="mission-main-1-point">
                {missionPost.find(post => post.id === 1)?.points}P
              </div>
            </div>
          </div>
          <div className="mission-main-1-img">
            <img src={mission1} alt="" />
          </div>
        </div>

        <div className="mission-main-2">
          <div className="mission-main-2-text">
            <div className="mission-main-2-sub">
              가족과 함께하는 외부 활동<br />
              <span>한강 플로깅 참여하기</span>
            </div>
            <div className="mission-main-2-daypoint">
              <div className="mission-main-2-day">
                D-{missionPost.find(post => post.id === 2)?.remaining_days}
              </div>
              <div className="mission-main-2-point">
                {missionPost.find(post => post.id === 2)?.points}P
              </div>
            </div>
          </div>
          <div className="mission-main-2-img">
            <img src={mission2} alt="" />
          </div>
        </div>

        <div className="mission-main-3">
          <div className="mission-main-3-text">
            <div className="mission-main-3-sub">
              역사 탐방하기 <br />
              <span>효창원의 역사적 의미 알기</span>
            </div>
            <div className="mission-main-3-daypoint">
              <div className="mission-main-3-day">
                D-{missionPost.find(post => post.id === 3)?.remaining_days}
              </div>
              <div className="mission-main-3-point">
                {missionPost.find(post => post.id === 3)?.points}P
              </div>
            </div>
          </div>
          <div className="mission-main-3-img">
            <img src={mission3} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}