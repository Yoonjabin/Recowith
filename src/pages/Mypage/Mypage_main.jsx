import "./Mypage_main.css"
import back from "./images/back.png"
import profile from "./images/profile.png"
import { useNavigate } from 'react-router-dom'; 


export default function Mypage_main(){
  const navigate = useNavigate(); 

  return(
    <div className="mypage-main-container">
      <div className="mission-d-top">
        <div className="mission-d-back-img" onClick={() => navigate('/')}>
          <img src={back} alt="" />
        </div>
        <div className="mission-d-title">마이페이지</div>
      </div>

      <div className="mypage-main-profile-container">
        <div className="mypage-main-profile-img">
          <img src="" alt="" />
        </div>
        <div className="mypage-main-profile-text">
          <div className="mypage-main-profile-kind">
            <span>닉네임</span>
            <span>아이디</span>
          </div>
          <div className="mypage-main-profile-nickid">
            <span>간지도치</span>
            <span>aaaaaa</span>
            <button>회원정보 수정</button>
          </div>
        </div>
      </div>

      <div className="mypage-main-family-container">
        <div className="mypage-main-family-title">
          간지도치네 <span>가족구성원</span>
        </div>
        <div className="mypage-main-family-box">
          <div className="mypage-m-f-box-top">도치 가족</div>
          <div className="mypage-m-f-box-family">
            이미지 + 이름
          </div>
          <div className="mypage-main-line"></div>
          <div className="mypage-m-f-menu"></div>
        </div>
      </div>

      <div className="mypage-main-project-container"></div>
    </div>
  )
}