import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import back from "./images/back.png";
import "./Mission_main.css";
import HihiImage from "./images/character.png";
import plus from "./images/Plus.png";

const Mission_main = () => {
  const navigate = useNavigate();
  const [cardsData, setCardsData] = useState([
    { id: 1, title: "마라톤 대회 참가하기", date: "2024-12-10", content: "2024년 마라톤 대회에 참가해 보세요! 함께 뛰는 즐거움을 느껴보세요.", imageUrl: HihiImage, isLiked: false },
    { id: 2, title: "새벽 러닝 모임", date: "2024-12-12", content: "새벽에 함께 달릴 러닝 회원을 모집합니다. 아침의 상쾌함을 느껴보세요.", imageUrl: HihiImage, isLiked: false },
    { id: 3, title: "런닝 클럽 개설", date: "2024-12-15", content: "새로운 러닝 클럽에서 회원을 모집합니다! 운동을 즐기고 싶은 사람은 누구나 환영입니다.", imageUrl: HihiImage, isLiked: false },
    { id: 4, title: "주말 러닝 워크샵", date: "2024-12-20", content: "주말에 러닝 워크샵을 진행합니다. 초보자도 환영! 함께 달리며 배워봅시다.", imageUrl: HihiImage, isLiked: false },
    { id: 5, title: "10km 러닝 도전", date: "2024-12-25", content: "10km 러닝 도전! 함께 목표를 향해 달려보자구요.", imageUrl: HihiImage, isLiked: false },
    { id: 6, title: "러닝 동호회 가입", date: "2025-01-05", content: "새로운 러닝 동호회가 시작됩니다. 운동을 좋아하는 모든 분들, 함께 뛰어요!", imageUrl: HihiImage, isLiked: false },
    { id: 7, title: "겨울철 실내 러닝", date: "2025-01-10", content: "겨울에도 실내에서 운동하자! 실내 러닝 모임에 가입하세요.", imageUrl: HihiImage, isLiked: false },
    { id: 8, title: "리더와 함께하는 그룹 러닝", date: "2025-01-15", content: "그룹 러닝에 참여하고 리더와 함께 목표를 달성해 보세요!", imageUrl: HihiImage, isLiked: false },
    { id: 9, title: "체력 키우는 5km 러닝", date: "2025-01-20", content: "체력을 키울 수 있는 5km 러닝 대회 참가자를 모집합니다.", imageUrl: HihiImage, isLiked: false },
    { id: 10, title: "봄맞이 러닝 챌린지", date: "2025-03-01", content: "봄맞이 러닝 챌린지! 운동을 시작하려는 분들에게 최적의 기회입니다.", imageUrl: HihiImage, isLiked: false },
  ]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const lastCardRef = (node) => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setLoading(true);  
      }
    });

    if (node) observer.current.observe(node);
  };

  return (
    <div className="mission-main-container">
      <div className="mission-main-back-img" onClick={() => navigate('/main')}>
          <img src={back} alt="" />
        </div>
      <h1 className="on-the-record">Runners Community</h1>
      <div className="add-community-img" onClick={() => navigate('/AddCom')}>
          <img src={plus} alt="" />
        </div>
      <div className="scrollable-cards-container">
        <div className="cards-container">
          {cardsData.map((card, index) => (
            <Card
              key={card.id}
              card={card}
              delay={index * 0.2}
              ref={index === cardsData.length - 1 ? lastCardRef : null}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Card = React.forwardRef(({ card, delay }, ref) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(card.isLiked);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div
      className={`card ${isExpanded ? "expanded" : ""}`}
      ref={ref}
      onClick={toggleExpand}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="card-content-wrapper">
        <div className="record-image-wrapper1">
          <img
            src={card.imageUrl || HihiImage}
            alt="Record"
            className="record-image"
          />
        </div>
        <div className="card-text">
          <div className="card-header">
            <p className="card-date">{card.date}</p>
            <p className="card-title">{card.title}</p>
          </div>
        </div>
      </div>
      <div
        className="card-content"
        style={{
          maxHeight: isExpanded ? "500px" : "0",
          opacity: "1",
          overflow: "hidden",
          transition: "max-height 1.0s ease",
        }}
      >
        {card.content}
      </div>
      <div className="card-actions">
        <div className="card-line"></div>
        {isExpanded && (
          <button
            className={`heart-button ${isLiked ? "active" : ""}`}
            onClick={toggleLike}
          >
             🏃‍♀️
          </button>
        )}
      </div>
    </div>
  );
});

export default Mission_main;
