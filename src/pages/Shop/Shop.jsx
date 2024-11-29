import "./Shop.css";
import React from "react";
import back from "./images/back.png";
import { useNavigate } from "react-router-dom";

export default function Shop() {
  const navigate = useNavigate();

  const items = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    title: `상품 ${index + 1}`,
    image: "https://via.placeholder.com/150", // 예제용 이미지
  }));

  return (
    <div className="shop-container">
      <div className="shop-d-top-4">
        <div className="shop-back-img" onClick={() => navigate("/main")}>
          <img src={back} alt="뒤로가기" />
        </div>
        <div className="shop-title">러닝마켓</div>
      </div>
      <div className="shop-main-container">
        <div className="shop-grid">
          {items.map((item) => (
            <div key={item.id} className="shop-item">
              <img src={item.image} alt={item.title} />
              <div className="shop-item-title">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
