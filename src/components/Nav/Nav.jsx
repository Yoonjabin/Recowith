import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./Nav.css";
import home from "./images/home.png";
import home2 from "./images/home2.png";
import mission from "./images/mission.png";
import mission2 from "./images/mission2.png";
import shop from "./images/shop.png";
import shop2 from "./images/shop2.png";
import mypage from "./images/mypage.png";
import mypage2 from "./images/mypage2.png";
import map from "./images/map.png";
import map2 from "./images/map2.png";

export default function Nav() {
    const navigate = useNavigate(); 
    const location = useLocation(); // 현재 경로를 가져옴

    // URL 경로에 따라 활성화된 탭 설정
    const getActiveTab = () => {
        switch (location.pathname) {
            case "/main":
                return "home";
            case "/MissionMain":
                return "mission";
            case "/Shop":
                return "shop";
            case "/ProjectMap":
                return "map";
            case "/MypageMain":
                return "mypage";
            default:
                return ""; // 기본적으로 어떤 탭도 활성화하지 않음
        }
    };

    const activeTab = getActiveTab();

    return (
        <div className='nav-container'>
            <div className='nav-contents'>
                <div
                    className={`nav-home ${activeTab === "home" ? "active" : ""}`}
                    onClick={() => navigate("/main")}
                >
                    <div className='nav-home-img'>
                        <img src={activeTab === "home" ? home2 : home} alt="홈" />
                    </div>
                    <div className={`nav-home-kor ${activeTab === "home" ? "active-text" : ""}`}>
                        홈
                    </div>
                </div>
                <div
                    className={`nav-mission ${activeTab === "mission" ? "active" : ""}`}
                    onClick={() => navigate("/MissionMain")}
                >
                    <div className='nav-mission-img'>
                        <img src={activeTab === "mission" ? mission2 : mission} alt="도전과제" />
                    </div>
                    <div className={`nav-mission-kor ${activeTab === "mission" ? "active-text" : ""}`}>
                        도전과제
                    </div>
                </div>
                <div
                    className={`nav-shop ${activeTab === "Shop" ? "active" : ""}`}
                    onClick={() => navigate("/Shop")}
                >
                    <div className='nav-shop-img'>
                        <img src={activeTab === "shop" ? shop2 : shop} alt="러닝마켓" />
                    </div>
                    <div className={`nav-shop-kor ${activeTab === "shop" ? "active-text" : ""}`}>
                        러닝마켓
                    </div>
                </div>

                <div
                    className={`nav-map ${activeTab === "map" ? "active" : ""}`}
                    onClick={() => navigate("/ProjectMap")}
                >
                    <div className='nav-map-img'>
                        <img src={activeTab === "map" ? map2 : map} alt="지도" />
                    </div>
                    <div className={`nav-map-kor ${activeTab === "map" ? "active-text" : ""}`}>
                         지도
                    </div>
                </div>

                <div
                    className={`nav-mypage ${activeTab === "mypage" ? "active" : ""}`}
                    onClick={() => navigate("/MypageMain")}
                >
                    <div className='nav-mypage-img'>
                        <img src={activeTab === "mypage" ? mypage2 : mypage} alt="마이페이지" />
                    </div>
                    <div className={`nav-mypage-kor ${activeTab === "mypage" ? "active-text" : ""}`}>
                        마이페이지
                    </div>
                </div>
            </div>
        </div>
    );
}
