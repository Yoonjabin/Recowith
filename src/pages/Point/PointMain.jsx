import React, { useState } from "react";
import "./PointMain.css";
import back from "./images/back.png";
import point1 from "./images/point1.png";
import point2 from "./images/point2.png";
import point3 from "./images/point3.png";
import earn from "./images/earn.png";
import pay from "./images/pay.png";

export default function PointMain() {
  const [showIframe, setShowIframe] = useState(false);

  const family = {
    points: 1300,
    name: "도치 가족",
  };

  const handleImageClick = () => {
    setShowIframe(true);
  };

  return (
    <div className="point-main-container">
      <div className="mission-d-top-7">
        <div className="mission-d-back-img-2" >
          <img src={back} alt="" />
        </div>
        <div className="mission-d-title">포인트</div>
      </div>
      <div className="user-edit-line"></div>

      <div className="point-main-title">포인트</div>

      <div className="point-main-contents">
        <div className="point-main-family-point">{family.name} 보유 포인트</div>
        <div className="point-main-point">{family.points}P</div>
        <div className="point-main-line"></div>
        <div className="point-main-nav-page">
          <div className="point-main-nav-earn">
            <img src={earn} alt="" />
            <span>적립 내역</span>
          </div>
          <div className="point-main-nav-pay">
            <img src={pay} alt="" />
            <span>소비 내역</span>
          </div>
        </div>
      </div>

      <div className="point-main-coalition">제휴 이벤트 및 혜택 할인</div>
      <div className="point-main-coalition-img">
        <div
          className="point-main-img-1"
          onClick={handleImageClick}
          style={{ cursor: "pointer" }}
        >
          <img src={point1} alt="" />
        </div>

        {showIframe && (
          <div
            style={{
              position: "fixed",
              top: '3.2%',
              left: "39.8%",
              width: "393px",
              height: "852px",
              backgroundColor: "white",
              zIndex: 1000,
            }}
          >
            <iframe
              src="https://me2.do/xdpx1otY"
              style={{ width: "100%", height: "100%", border: "none" }}
              title="Embedded Web Page"
            ></iframe>
          </div>
        )}

        <div className="point-main-img-2-3">
          <img src={point2} alt="" />
          <img src={point3} alt="" />
        </div>
      </div>
    </div>
  );
}
