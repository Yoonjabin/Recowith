import { useNavigate } from "react-router-dom"
import "./Mission_finish.css"
import character from "./images/character.png"

export default function Mission_finish(){

  const navigate= useNavigate()

  return(
    <div className="mission-finish-container">
        <div className="mission-finish-character">
          <img src={character} alt="" />
        </div>
        <div className="mission-finish-text">
          참여 완료! <br />
          <span>포인트는 추후에 지급될 예정이며<br />
          시간이 소요될 수 있습니다.</span>
        </div>
        <div className="mission-finish-textsub">
          <span onClick={() => navigate("/MypageMain")}>마이페이지</span>를 확인해 주세요.
        </div>
    </div>
  )
}