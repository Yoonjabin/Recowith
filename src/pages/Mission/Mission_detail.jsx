// import "./Mission_detail.css"
// import { useNavigate } from 'react-router-dom'; 
// import autumn from "./images/autumn.png"
// import back from "./images/back.png"

// export default function Mission_detail(){
//   const navigate = useNavigate(); 

//   return(
//     <div className="Mission-d-container">

//       <div className="mission-d-top">
//         <div className="mission-d-back-img" onClick={() => navigate('/MissionMain')}>
//           <img src={back} alt="" />
//         </div>
//         <div className="mission-d-title">도전 과제 안내</div>
//       </div>

//       <div className="mission-d-img">
//         <img src={autumn} alt="" />
//       </div>
//       <div className="mission-d-img-gradation"></div>

//       <div className="mission-d-contents-container">
//         <div className="mission-d-contents">
//           <div className="mission-d-contents-bar-img"></div>
//           <div className="mission-d-contents-bar">
//             <span>기간</span>
//             <span>장소</span>
//             <span>요금</span>
//             <span>소개</span>
//           </div>
//           <div className="mission-d-contents-main">
//             <span>2024.10.18. (금)~ 2024.11.17 (일)</span>
//             <span>화담숲</span>
//             <span>유료</span>
//             <span className="mission-d-contents-d">
//               화담숲이 10월 18일부터 11월 17일까지 한달여 간 '가을 단풍 축제'를 진행한다. 
//               국내 단풍 명소로 자리 잡은 화담숲은 올 해에도 어김없이 청명한하늘 아래 시원한 바람과 함께 가을이 찾아와 내장단풍, 당단풍, 털단풍, 노르웨이단풍 등 400여 품종의 형형색색 단풍이 장관을 이룬다. 화담숲은 연중 쾌적하고 안전한 관람을 위해 1일 최대 관람 인원수를 1만명 이내로 관리하고 있다. 보다 간편하고 편리한 관람을 위해 화담숲 입장과 모노레일 탑승 모두 온라인 사전 예약제 운영한다.
//             </span>
//           </div>
//         </div>
//         <div className="mission-d-join">
//           <button  onClick={() => navigate('/MissionWrite')}>도전하기</button>
//         </div>
//       </div>

//     </div>
//   )
// }


import "./Mission_detail.css";
import { useNavigate, useParams } from 'react-router-dom'; 
import axios from 'axios';
import { useState, useEffect } from 'react';
import autumn from "./images/autumn.png";
import back from "./images/back.png";

export default function Mission_detail() {
  const navigate = useNavigate(); 
  const { id } = useParams();  
  const [missionDetail, setMissionDetail] = useState(null);  

  useEffect(() => {
    const fetchMissionDetail = async () => {
      const accessToken = localStorage.getItem('accessToken');
      try {
        const response = await axios.get(`http://server-api/api/challenges/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        
        if (response.data.code === 200) {
          setMissionDetail(response.data.data); 
        } else {
          console.error('Failed to fetch mission details:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching mission details:', error);
      }
    };

    fetchMissionDetail();
  }, [id]);  

  return (
    <div className="Mission-d-container">
      <div className="mission-d-top">
        <div className="mission-d-back-img" onClick={() => navigate('/MissionMain')}>
          <img src={back} alt="" />
        </div>
        <div className="mission-d-title">도전 과제 안내</div>
      </div>

      <div className="mission-d-img">
        <img src={autumn} alt="" />
      </div>
      <div className="mission-d-img-gradation"></div>

      <div className="mission-d-contents-container">
        <div className="mission-d-contents">
          <div className="mission-d-contents-bar-img"></div>
          <div className="mission-d-contents-bar">
            <span>기간</span>
            <span>장소</span>
            <span>요금</span>
            <span>소개</span>
          </div>
          <div className="mission-d-contents-main">
            <span>{missionDetail.period}</span>
            <span>{missionDetail.location}</span>
            <span>{missionDetail.fee}</span>
            <span className="mission-d-contents-d">
              {missionDetail.description}
            </span>
          </div>
        </div>
        <div className="mission-d-join">
          <button onClick={() => navigate(`/MissionWrite/${missionDetail.id}`)}>도전하기</button>
        </div>
      </div>
    </div>
  );
}
