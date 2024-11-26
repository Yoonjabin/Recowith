import React, { useState } from 'react';
import "./Main.css";
import profile from "./images/userImg.png";
import ChatBot from "./ChatBot/ChatBot.jsx";
import submit from "./images/submit.png";
import proj1 from "./images/project1.png";
import proj2 from "./images/project2.png";
import proj3 from "./images/project3.png";
import { useNavigate } from 'react-router-dom';

export default function Main() {
    const navigate = useNavigate();

    const hashtag = [
        { content: "#자녀나이" },
        { content: "#문화" },
        { content: "#교육" },
        { content: "#봉사" },
        { content: "#장소" },
        { content: "#행사" },
        { content: "#취미" },
        { content: "#나들이" },
    ];

    const [userInput, setUserInput] = useState("");
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [isChatBotVisible, setIsChatBotVisible] = useState(false);
    const [slideDirection, setSlideDirection] = useState(0);

    const handleInputChange = (e) => setUserInput(e.target.value);

    const handleSendMessage = () => {
        if (userInput.trim()) {
            setIsChatVisible(true);
            setTimeout(() => {
                setIsChatBotVisible(true);
            }, 400);
        }
    };

    // 마우스와 터치 슬라이드 처리
    const handleSlide = (e) => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX; // 터치에서는 e.touches, 마우스에서는 e.clientX
        const middleX = window.innerWidth / 2;
        if (clientX > middleX) {
            setSlideDirection(1); // 오른쪽으로 슬라이드
        } else {
            setSlideDirection(-1); // 왼쪽으로 슬라이드
        }
    };

    return (
        <div className='main-container'>
            <div className='main-title-container'>
                <div className='main-title-contents'>
                    <div className='main-title-contents-nickname'>
                        <span>{localStorage.nickname}</span>님,
                        <br />안녕하세요!
                    </div>
                    <div className='main-title-contents-sub'>
                        가족구성원 등록 후<br />
                        프로젝트를 진행해 주세요
                    </div>
                </div>
                <div className='main-title-myImg'>
                    <img src={profile} alt="프로필 이미지" />
                </div>
            </div>

            {/* main-chat-container */}
            <div className={`main-chat-container ${isChatVisible ? "hidden" : ""}`}>
                <div className='main-chat-title'>
                    자녀와 함께 할 <br /><span>프로젝트</span> 추천해 줄게!!
                </div>
                <div className='main-chat-hashtag'>
                    {hashtag.map((tag, index) => (
                        <div key={index} className='main-chat-hashtag-contents'>
                            {tag.content}
                        </div>
                    ))}
                </div>
                <div className='main-chat-chatting'>
                    <input
                        type="text"
                        placeholder="키워드를 참고해서 질문해 보세요!"
                        value={userInput}
                        onChange={handleInputChange}
                    />
                    <div className='main-chat-chatting-submit' onClick={handleSendMessage}>
                        <img src={submit} alt="전송 버튼" />
                    </div>
                </div>
            </div>
            {/* ChatBot component */}
            <div className={`chatbot-container ${isChatBotVisible ? "visible" : ""}`}>
                {isChatBotVisible && <ChatBot initialMessage={userInput} />}
            </div>

            <div 
                className='main-project-container' 
                onMouseMove={handleSlide} 
                onTouchMove={handleSlide} // 터치 이벤트 추가
            >
                <div className='main-project-title'>이 달의 <span>도전 프로젝트</span></div>
                <div className={`main-project-contents slide-${slideDirection}`} onClick={() => navigate("/MissionMain")}>
                    <div className='main-project-1'>
                        <span>가족과 함께<br />떠나는 단풍놀이</span>
                        <div className='main-project-1-img'>
                            <img src={proj1} alt="" />
                        </div>
                    </div>
                    <div className='main-project-2'>
                        <span>우리 가족이<br />살아갈 환경 지키기</span>
                        <div className='main-project-2-img'>
                            <img src={proj2} alt="" />
                        </div>                    
                    </div>
                    <div className='main-project-3'>
                        <span>함께 배우는<br />역사 탐방</span>
                        <div className='main-project-3-img'>
                            <img src={proj3} alt="" />
                        </div>                    
                    </div>
                </div>
            </div>
        </div>
    );
}

