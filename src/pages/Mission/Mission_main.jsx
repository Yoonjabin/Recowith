import "./Mission_main.css"
import { useNavigate } from 'react-router-dom'; 
import mission1 from "./images/mission1.png"
import mission2 from "./images/mission2.png"
import mission3 from "./images/mission3.png"
import back from "./images/back.png"

export default function Mission_main(){
  const navigate = useNavigate(); 

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
        <div className="mission-main-1">
          <div className="mission-main-1-text">
            <div className="mission-main-1-sub">
              지역 축제 방문하기! <br />
              <span>가을 축제 방문하기</span>
            </div>
            <div className="mission-main-1-daypoint">
              <div className="mission-main-1-day">D-5</div>
              <div className="mission-main-1-point">135P</div>
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
              <div className="mission-main-2-day">D-7</div>
              <div className="mission-main-2-point">260P</div>
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
              <div className="mission-main-3-day">D-15</div>
              <div className="mission-main-3-point">310P</div>
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