/* import "./Shop.css";
import React from "react";
import back from "./images/back.png";
import { useNavigate } from "react-router-dom";

export default function Shop() {
  const navigate = useNavigate();

  // 수동으로 상품 데이터 입력
  const items = [
    {
      id: 1,
      title: "온 러닝 x 포스트 아카이브 팩션 (파프) 클라우드몬스터 2 블랙 마그넷",
      price: "₩380,000",
      image: require("./images/shoe1.png"),
      link: "https://kream.co.kr/products/272073?fetchRelated=true", // 상품 링크
    },
    {
      id: 2,
      title: "나이키 줌 플라이 6 엘리우드 킵초게",
      price: "₩129,000",
      image: require("./images/shoe2.png"),
      link: "https://kream.co.kr/products/379514?fetchRelated=true", // 상품 링크
    },
    {
      id: 3,
      title: "온 러닝 x 포스트 아카이브 팩션 (파프) 클라우드벤쳐 피크 올 블랙",
      price: "₩365,000",
      image: require("./images/shoe3.png"),
      link: "https://kream.co.kr/products/370901?fetchRelated=true", // 상품 링크
    },
    {
      id: 4,
      title: "나이키 줌X 베이퍼플라이 넥스트% 3 화이트 그레이",
      price: "₩180,000",
      image: require("./images/shoe4.png"),
      link: "https://kream.co.kr/products/107805?fetchRelated=true", // 상품 링크
    },
    {
      id: 5,
      title: "아디다스 아디제로 보스턴 12 클라우드 화이트 코어 블랙 나이트 메탈릭",
      price: "₩113,000",
      image: require("./images/shoe5.png"),
      link: "https://kream.co.kr/products/241441?fetchRelated=true", // 상품 링크
    },
    {
      id: 6,
      title: "호카 본디 8 블랙 - 와이드",
      price: "₩180,000",
      image: require("./images/shoe6.png"),
      link: "https://kream.co.kr/products/78196?fetchRelated=true", // 상품 링크
    },
    {
      id: 7,
      title: "아식스 슈퍼블라스트 2 블랙 화이트",
      price: "₩316,000",
      image: require("./images/shoe7.png"),
      link: "https://kream.co.kr/products/344453?fetchRelated=true", // 상품 링크
    },
    {
      id: 8,
      title: "(W) 온 러닝 x 포스트 아카이브 팩션 (파프) 클라우드몬스터 2 문더스트 초크",
      price: "₩349,000",
      image: require("./images/shoe8.png"),
      link: "https://kream.co.kr/products/272076?fetchRelated=true", // 상품 링크
    },
    {
      id: 9,
      title: "아식스 노바블라스트 4 LE 버치 문락",
      price: "₩139,000",
      image: require("./images/shoe9.png"),
      link: "https://kream.co.kr/products/332749?fetchRelated=true", // 상품 링크
    },
    {
      id: 10,
      title: "뉴발란스 퓨어셀 레벨 v4 울트라 핑크 블랙 - 2E Wide",
      price: "₩209,000",
      image: require("./images/shoe10.png"),
      link: "https://kream.co.kr/products/342763?fetchRelated=true", // 상품 링크
    },
    {
      id: 11,
      title: "아식스 메타스피드 엣지 파리 세이프티 옐로우 블랙",
      price: "₩349,000",
      image: require("./images/shoe11.png"),
      link: "https://kream.co.kr/products/314348?fetchRelated=true", // 상품 링크
    },
    {
      id: 12,
      title: "온 러닝 x 포스트 아카이브 팩션 (파프) 클라우드몬스터 2 문더스트 초크",
      price: "₩529,000",
      image: require("./images/shoe12.png"),
      link: "https://kream.co.kr/products/272074?fetchRelated=true", // 상품 링크
    },
    {
      id: 13,
      title: "(W) 온 러닝 클라우드 5 올 블랙",
      price: "₩3169,000",
      image: require("./images/shoe13.png"),
      link: "https://kream.co.kr/products/291084?fetchRelated=true," // 상품 링크
    },
    {
      id: 14,
      title: "아식스 슈퍼블라스트 2 화이트 쿨 그레이",
      price: "₩290,000",
      image: require("./images/shoe14.png"),
      link: "https://kream.co.kr/products/343160?fetchRelated=true", // 상품 링크
    },
    {
      id: 15,
      title: "아디다스 아디제로 EVO SL 클라우드 화이트 코어 블랙",
      price: "₩219,000",
      image: require("./images/shoe15.png"),
      link: "https://kream.co.kr/products/363672?fetchRelated=true", // 상품 링크
    },
    // 원하는 만큼 상품 추가
  ];

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
            <div
              key={item.id}
              className="shop-item"
              onClick={() => window.open(item.link, "_blank")} // 카드 클릭 시 링크로 이동
              style={{ cursor: "pointer" }} // 커서 모양을 손 모양으로 변경
            >
              <img src={item.image} alt={item.title} />
              <div className="shop-item-title">{item.title}</div>
              <div className="shop-item-price">{item.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}  */

  import "./Shop.css";
import React, { useState } from "react";
import back from "./images/back.png";
import shopInIcon from "./images/shopin.png"; // 장바구니 아이콘 이미지 추가
import { useNavigate } from "react-router-dom";

export default function Shop() {
  const navigate = useNavigate();

  // 좋아요 상태 관리
  const [likedItems, setLikedItems] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
    // 상품 데이터
    const items = [
      {
        id: 1,
        title: "온 러닝 x 포스트 아카이브 팩션 (파프) 클라우드몬스터 2 블랙 마그넷",
        price: "₩380,000",
        image: require("./images/shoe1.png"),
        link: "https://kream.co.kr/products/272073?fetchRelated=true", // 상품 링크
      },
      {
        id: 2,
        title: "나이키 줌 플라이 6 엘리우드 킵초게",
        price: "₩129,000",
        image: require("./images/shoe2.png"),
        link: "https://kream.co.kr/products/379514?fetchRelated=true", // 상품 링크
      },
      {
        id: 3,
        title: "온 러닝 x 포스트 아카이브 팩션 (파프) 클라우드벤쳐 피크 올 블랙",
        price: "₩365,000",
        image: require("./images/shoe3.png"),
        link: "https://kream.co.kr/products/370901?fetchRelated=true", // 상품 링크
      },
      {
        id: 4,
        title: "나이키 줌X 베이퍼플라이 넥스트% 3 화이트 그레이",
        price: "₩180,000",
        image: require("./images/shoe4.png"),
        link: "https://kream.co.kr/products/107805?fetchRelated=true", // 상품 링크
      },
      {
        id: 5,
        title: "아디다스 아디제로 보스턴 12 클라우드 화이트 코어 블랙 나이트 메탈릭",
        price: "₩113,000",
        image: require("./images/shoe5.png"),
        link: "https://kream.co.kr/products/241441?fetchRelated=true", // 상품 링크
      },
      {
        id: 6,
        title: "호카 본디 8 블랙 - 와이드",
        price: "₩180,000",
        image: require("./images/shoe6.png"),
        link: "https://kream.co.kr/products/78196?fetchRelated=true", // 상품 링크
      },
      {
        id: 7,
        title: "아식스 슈퍼블라스트 2 블랙 화이트",
        price: "₩316,000",
        image: require("./images/shoe7.png"),
        link: "https://kream.co.kr/products/344453?fetchRelated=true", // 상품 링크
      },
      {
        id: 8,
        title: "(W) 온 러닝 x 포스트 아카이브 팩션 (파프) 클라우드몬스터 2 문더스트 초크",
        price: "₩349,000",
        image: require("./images/shoe8.png"),
        link: "https://kream.co.kr/products/272076?fetchRelated=true", // 상품 링크
      },
      {
        id: 9,
        title: "아식스 노바블라스트 4 LE 버치 문락",
        price: "₩139,000",
        image: require("./images/shoe9.png"),
        link: "https://kream.co.kr/products/332749?fetchRelated=true", // 상품 링크
      },
      {
        id: 10,
        title: "뉴발란스 퓨어셀 레벨 v4 울트라 핑크 블랙 - 2E Wide",
        price: "₩209,000",
        image: require("./images/shoe10.png"),
        link: "https://kream.co.kr/products/342763?fetchRelated=true", // 상품 링크
      },
      {
        id: 11,
        title: "아식스 메타스피드 엣지 파리 세이프티 옐로우 블랙",
        price: "₩349,000",
        image: require("./images/shoe11.png"),
        link: "https://kream.co.kr/products/314348?fetchRelated=true", // 상품 링크
      },
      {
        id: 12,
        title: "온 러닝 x 포스트 아카이브 팩션 (파프) 클라우드몬스터 2 문더스트 초크",
        price: "₩529,000",
        image: require("./images/shoe12.png"),
        link: "https://kream.co.kr/products/272074?fetchRelated=true", // 상품 링크
      },
      {
        id: 13,
        title: "(W) 온 러닝 클라우드 5 올 블랙",
        price: "₩3169,000",
        image: require("./images/shoe13.png"),
        link: "https://kream.co.kr/products/291084?fetchRelated=true," // 상품 링크
      },
      {
        id: 14,
        title: "아식스 슈퍼블라스트 2 화이트 쿨 그레이",
        price: "₩290,000",
        image: require("./images/shoe14.png"),
        link: "https://kream.co.kr/products/343160?fetchRelated=true", // 상품 링크
      },
      {
        id: 15,
        title: "아디다스 아디제로 EVO SL 클라우드 화이트 코어 블랙",
        price: "₩219,000",
        image: require("./images/shoe15.png"),
        link: "https://kream.co.kr/products/363672?fetchRelated=true", // 상품 링크
      },
      // 원하는 만큼 상품 추가
    ];
  
      // 좋아요 버튼 클릭 핸들러
      const toggleLike = (item) => {
        if (likedItems.some((liked) => liked.id === item.id)) {
          setLikedItems(likedItems.filter((liked) => liked.id !== item.id));
        } else {
          setLikedItems([...likedItems, item]);
        }
      };
    
      return (
        <div className="shop-container">
          <div className="shop-d-top-4">
            <div className="shop-back-img" onClick={() => navigate("/main")}>
              <img src={back} alt="뒤로가기" />
            </div>
            <div className="shop-title">러닝마켓</div>
            <div className="cart-icon" onClick={() => setIsPopupOpen(!isPopupOpen)}>
            <img src={shopInIcon} alt="장바구니 열기" />
            </div>
          </div>
          {isPopupOpen && (
  <div className="cart-popup">
    <h3>장바구니</h3>
    {likedItems.length > 0 ? (
      likedItems.map((item) => (
        <div key={item.id} className="cart-item">
          <img
            src={item.image}
            alt={item.title}
            onClick={() => window.open(item.link, "_blank")} // 클릭 시 URL로 이동
            className="cart-item-image"
          />
          <div className="cart-item-title">{item.title}</div>
        </div>
      ))
    ) : (
      <p>장바구니가 비어 있습니다.</p>
    )}
    <button className="close-popup" onClick={() => setIsPopupOpen(false)}>
      닫기
    </button>
  </div>
)}
    
          {/* 상품 리스트 */}
          <div className="shop-main-container">
            <div className="shop-grid">
              {items.map((item) => (
                <div key={item.id} className="shop-item">
                  {/* 이미지 컨테이너 */}
                  <div className="image-container">
                    <img
                      src={item.image}
                      alt={item.title}
                      onClick={() => window.open(item.link, "_blank")}
                    />
                    {/* 좋아요 버튼 */}
                    <button
                      className={`like-button ${
                        likedItems.some((liked) => liked.id === item.id)
                          ? "liked"
                          : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation(); // 부모 클릭 이벤트 방지
                        toggleLike(item);
                      }}
                    >
                      ❤
                    </button>
                  </div>
                  <div className="shop-item-title">{item.title}</div>
                  <div className="shop-item-price">{item.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }