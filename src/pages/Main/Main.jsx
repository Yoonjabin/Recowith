import React, { useState } from 'react';
import "./Main.css";
import profile from "./images/userImg.png";
import ChatBot from "./ChatBot/ChatBot.jsx";
import submit from "./images/submit.png";

export default function Main() {
    const user = { nickname: "간지 도치" };
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
    const [isChatVisible, setIsChatVisible] = useState(false); // 슬라이드 상태
    const [isChatBotVisible, setIsChatBotVisible] = useState(false); // 챗봇 보이기 상태

    const handleInputChange = (e) => setUserInput(e.target.value);

    const handleSendMessage = () => {
        if (userInput.trim()) {
            // main-chat-container 숨기기
            setIsChatVisible(true);

            // 일정 시간 후에 챗봇을 보이게 하도록 설정 (애니메이션이 끝날 때까지 대기)
            setTimeout(() => {
                setIsChatBotVisible(true);
            }, 400); // 500ms 후에 챗봇이 보이도록 설정
        }
    };

    return (
        <div className='main-container'>
            <div className='main-title-container'>
                <div className='main-title-contents'>
                    <div className='main-title-contents-nickname'>
                        <span>{user.nickname}</span>님,
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
                    나의 자녀와 함께 할 <br /><span>프로젝트</span> 추천해 줄게!!
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
        </div>
    );
}
