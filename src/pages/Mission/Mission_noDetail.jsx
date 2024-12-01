import character from "./images/character.png"
import { useNavigate } from 'react-router-dom'; 
import "./Mission_noDetail.css"
import back from "./images/back.png";


export default function MissionNoDetail(){
  const navigate = useNavigate(); 

  return(
    <div className="mission-no-detail-container">
      <div className="mission-d-top-2">
        <div className="mission-d-back-img" onClick={() => navigate('/MissionMain')}>
          <img src={back} alt="" />
        </div>
        <div className="mission-d-title">도전 과제 안내</div>
      </div>

      <div className="m-n-line"></div>

      <div className="mission-no-detail-img">
        <img src={character} alt="" />
      </div>
      <div className="mission-no-detail-text">
        아직 공개되지 않은 미션입니다! <br />
        <span>추후 공개될 예정입니다</span>
      </div>
    </div>
  )
}