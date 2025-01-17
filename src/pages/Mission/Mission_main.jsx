import "./Mission_main.css"
import React, { useState, useEffect } from 'react';
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
        const response = await axios.get('http://localhost:8080/api/challenges', {
          headers: {
            Authorization: `Bearer ${accessToken}`, 
          }
        });

        if (response.status === 200) {
          setmissionPost(response.data); 
          console.log("조회 성공", response); 
        } else {
          console.error('Failed to post:', response);
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

  const handleNavigateNo = (id) =>{
    navigate(`/MissionNoDetail/${id}`)
  }

  // const missionId1 = missionPost.length > 0 ? missionPost.find((item) => item.id === 1) : null;
  // const missionId2 = missionPost.length > 1 ? missionPost.find((item) => item.id === 2) : null;
  // const missionId3 = missionPost.length > 2 ? missionPost.find((item) => item.id === 3) : null;

  const missionId1 = missionPost.length > 0 ? missionPost[0] : null;
  const missionId2 = missionPost.length > 1 ? missionPost[1] : null;
  const missionId3 = missionPost.length > 2 ? missionPost[2] : null;

  return (
    <div className="mission-main-container">
      <div className="mission-main-top">
        <div className="mission-main-back-img" onClick={() => navigate('/main')}>
          <img src={back} alt="" />
        </div>
        <div className="mission-main-title">
          모든 <span>러닝 이벤트</span><br />확인하기
        </div>
      </div>

      <div className="mission-main-contents">
        <div className="mission-main-1" onClick={() => handleNavigate(1)}>
          <div className="mission-main-1-text">
            <div className="mission-main-1-sub">
              지역 축제에서 마음껏 걸어봐요! <br />
              <span>가을 축제 방문하고 단풍과 함께걸어요</span>
            </div>
            <div className="mission-main-1-daypoint">
              <div className="mission-main-1-day">
                D-{missionId1 ? missionId1.dday : 'N/A'}
              </div>
              <div className="mission-main-1-point">
                {missionId1 && missionId1.points ? missionId1.points : 'N/A'}P
              </div>
            </div>
          </div>
          <div className="mission-main-1-img">
            <img src={mission1} alt="" />
          </div>
        </div>

        <div className="mission-main-2" onClick={()=>handleNavigate(2)}>
          <div className="mission-main-2-text">
            <div className="mission-main-2-sub">
              엔젤스 헤이븐<br />
              <span>마라톤과 장애인식 개선 관심 있는 누구나</span>
            </div>
            <div className="mission-main-2-daypoint">
              <div className="mission-main-2-day">
                D-{missionId2 ? missionId2.dday : 'N/A'}
              </div>
              <div className="mission-main-2-point">
                {missionId2 && missionId2.points ? missionId2.points : 'N/A'}P
              </div>
            </div>
          </div>
          <div className="mission-main-2-img">
            <img src={mission2} alt="" />
          </div>
        </div>

        <div className="mission-main-3"  onClick={()=>handleNavigate(3)}>
          <div className="mission-main-3-text">
            <div className="mission-main-3-sub">
              소방관과 함께하는 <br />
              <span>달리는 두근두근런</span>
            </div>
            <div className="mission-main-3-daypoint">
              <div className="mission-main-3-day">
                D-{missionId3 ? missionId3.dday : 'N/A'}
              </div>
              <div className="mission-main-3-point">
                {missionId3 && missionId3.points ? missionId3.points : 'N/A'}P
              </div>
            </div>
          </div>
          <div className="mission-main-3-img">
            <img src={mission3} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}