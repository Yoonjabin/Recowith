import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import "./Nav.css";
import home from "./images/home.png";
import home2 from "./images/home2.png";
import mission from "./images/mission.png";
import mission2 from "./images/mission2.png";
import project from "./images/project.png";
import project2 from "./images/project2.png";
import mypage from "./images/mypage.png";
import mypage2 from "./images/mypage2.png";

export default function Nav() {
    const navigate = useNavigate(); 
    const [activeTab, setActiveTab] = useState("home"); // 현재 활성화된 탭 추적

    // 탭 변경 함수
    const handleTabClick = (tab, path) => {
        setActiveTab(tab); // 클릭한 탭을 활성화
        navigate(path);    // 해당 경로로 이동
    };

    return (
        <div className='nav-container'>
            <div className='nav-contents'>
                <div
                    className={`nav-home ${activeTab === "home" ? "active" : ""}`}
                    onClick={() => handleTabClick("home", "/main")}
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
                    onClick={() => handleTabClick("mission", "/MissionMain")}
                >
                    <div className='nav-mission-img'>
                        <img src={activeTab === "mission" ? mission2 : mission} alt="도전과제" />
                    </div>
                    <div className={`nav-mission-kor ${activeTab === "mission" ? "active-text" : ""}`}>
                        도전과제
                    </div>
                </div>
                <div
                    className={`nav-project ${activeTab === "project" ? "active" : ""}`}
                    onClick={() => handleTabClick("project", "/ProjectWrite")}
                >
                    <div className='nav-project-img'>
                        <img src={activeTab === "project" ? project2 : project} alt="가족프로젝트" />
                    </div>
                    <div className={`nav-project-kor ${activeTab === "project" ? "active-text" : ""}`}>
                        가족프로젝트
                    </div>
                </div>
                <div
                    className={`nav-mypage ${activeTab === "mypage" ? "active" : ""}`}
                    onClick={() => handleTabClick("mypage", "/MypageMain")}
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
