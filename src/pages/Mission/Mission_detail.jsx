import "./Mission_detail.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import autumn from "./images/autumn.png"; // 화담숲 이미지
import Angel from "./images/hanRiver.png"; // 한강 플로깅 이미지
import Heart from "./images/Heart.png";
import defaultImage from "./images/default.png"; // 기본 이미지
import back from "./images/back.png";

export default function Mission_detail() {
  const navigate = useNavigate();
  const { id } = useParams(); // URL 파라미터에서 id 가져오기
  const [missionDetail, setMissionDetail] = useState(null); // 초기값 null
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가
  const [image, setImage] = useState(defaultImage); // 이미지 상태 관리

  useEffect(() => {
    const fetchMissionDetail = async () => {
      setIsLoading(true);
      const accessToken = localStorage.getItem("accessToken");

      try {
        // API 요청
        const response = await axios.get(`http://localhost:8080/api/challenges/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          setMissionDetail(response.data); // API 응답 데이터 설정
        } else {
          setError("데이터를 불러오지 못했습니다.");
          console.error("API 응답 실패:", response);
        }
      } catch (error) {
        // 요청 오류 처리
        setError("API 요청 중 오류가 발생했습니다.");
        console.error("Error fetching mission details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // ID에 따라 동작 결정
    if (id === "1") {
      setMissionDetail({
        period: "2024년 10월 18일 - 2024년 12월 9일",
        location: "화담숲",
        fee: "온라인 사전 예약제",
        description: "화담숲이 10월 18일부터 11월 17일까지 한달여 간 '가을 단풍 축제'를 진행한다. 국내 단풍 명소로 자리 잡은 화담숲은 올 해에도 어김없이 청명한 하늘 아래 시원한 바람과 함께 가을이 찾아와 내장단풍, 당단풍, 털단풍, 노르웨이단풍 등 400여 품종의 형형색색 단풍이 장관을 이룬다.",
      });
      setImage(autumn);
      setIsLoading(false);
    } else if (id === "2") {
      setMissionDetail({
        period: "2024년 8월 11일 - 2024년 12월 31일",
        location: "걷고 달릴 수 있는 장소 어디나",
        fee: "40,000원",
        description: "엔젤스헤이븐은 ‘몸이 불편한 것'으로 장애를 말하지 않습니다.가고 싶은 곳을 스스로 갈 수 있고, 하고 싶은 것을 할 수 있다면단지 몸의 불편함이 삶에 장애가 아님을 캠페인을 통해 알리고자 합니다. ‘차이'가 ‘차별'이 되지 않도록 세상의 모든 걸음을 응원해주세요!",
      });
      setImage(Angel);
      setIsLoading(false);
    } else if (id === "3") {
      setMissionDetail({
        period: "2024년 10월 20일 8:00~12:00",
        location: "서울 여의도한강공원 이벤트광장",
        fee: "35,000원",
        description: "현직 소방관의 CPR 교육을 듣고 하트세이버의 응원을 받으며 달리고 소생자들이 직접 메달을 걸어주는 두근두근런!",
      });
      setImage(Heart);
      setIsLoading(false);
    } 
    else {
      fetchMissionDetail();
    }
  }, [id]);

  return (
    <div className="Mission-d-container">
      <div className="mission-d-top-2">
        <div className="mission-d-back-img" onClick={() => navigate("/MissionMain")}>
          <img src={back} alt="뒤로가기" />
        </div>
        <div className="mission-d-title">러닝 이벤트 안내</div>
      </div>

      <div className="mission-d-img">
        <img src={image} alt="도전 과제 이미지" />
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
            {isLoading ? (
              <span>로딩 중...</span>
            ) : error ? (
              <span>{error}</span>
            ) : missionDetail ? (
              <>
                <span>{missionDetail.period || "기간 정보 없음"}</span>
                <span>{missionDetail.location || "장소 정보 없음"}</span>
                <span>{missionDetail.fee || "요금 정보 없음"}</span>
                <span className="mission-d-contents-d">
                  {missionDetail.description || "소개 정보 없음"}
                </span>
              </>
            ) : (
              <span>데이터를 가져오지 못했습니다.</span>
            )}
          </div>
        </div>
        <div className="mission-c-join">
          <button onClick={() => navigate("/AddCom")}>작성하기</button>
        </div>
      </div>
    </div>
  );
}
