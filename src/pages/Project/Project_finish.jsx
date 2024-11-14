import "./Project_finish.css";
import character from "./images/character.png";

export default function Project_finish() {
  return (
    <div className="project-finish-container">
      <div className="project-finish-character">
        <img src={character} alt="" />
      </div>
      <div className="project-finish-text">
        참여 완료! <br />
        <span>
          <span className="highlight">500P</span> 추후에 지급될 예정이며
          <br />
          시간이 소요될 수 있습니다.
        </span>
      </div>
      <div className="project-finish-textsub">
        <span>마이페이지</span>를 확인해 주세요.
      </div>
    </div>
  );
}
