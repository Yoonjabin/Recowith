import React, { useState, useEffect } from 'react';
import './ChatBot.css';
import Modal from "react-modal";
import user from "./images/user.png";
import chatbot from "./images/chatbot.png";

Modal.setAppElement("#root");

export default function ChatBot({ initialMessage }) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiEndpoint = "https://api.openai.com/v1/chat/completions";

    useEffect(() => {
        if (initialMessage) {
            addMessage("user", initialMessage); // 초기 메시지 추가
            handleSendMessage(initialMessage);  // 바로 메시지를 보내도록 호출
        }
    }, [initialMessage]); 

    const addMessage = (sender, message) => {
        setMessages((prevMessages) => [...prevMessages, { sender, message }]);
    };

    const handleSendMessage = async (message) => {
        if (message.trim().length === 0) return;

        // addMessage("user", message); 
        setLoading(true);

        const summaryRequest = `Please summarize your answer in 3 sentences: ${message}`;

        try {
            const response = await fetch(apiEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: "gpt-4o",
                    messages: [{ role: "user", content: summaryRequest }],
                    max_tokens: 150,
                    temperature: 1,
                    top_p: 1,
                    frequency_penalty: 0.5,
                    presence_penalty: 0.5,
                    stop: ["문장 생성 중단 단어"],
                }),
            });

            if (!response.ok) {
                throw new Error(`API 요청 실패! 상태 코드: ${response.status}`);
            }

            const data = await response.json();
            const aiResponse = data.choices?.[0]?.message?.content || "No response";
            addMessage("bot", aiResponse); // GPT의 응답 추가
        } catch (error) {
            console.error("오류 발생!", error);
            addMessage("bot", "오류 발생!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='chatBot'>
            <Modal isOpen={true} contentLabel="챗지피티" className="gptmodal" overlayClassName="gptoverlay">
                <div className="gptModal-container">
                    {/* <div className="gptModal-title-container"> */}
                        <div className="X-img" onClick={() => Modal.setAppElement(false)}>
                            {/* <img src={Ximg} alt="close-img" /> */}
                        {/* </div> */}
                    </div>
                    <div className="gptModal-chat">
                        {loading && <span className="gptModal-messageWait">답변을 기다리고 있습니다...</span>}
                        {messages.map((msg, index) => (
                            <div key={index} className={`gptModal-message ${msg.sender}`}>
                                {msg.sender === "user" && (
                                    <div className="gptModal-message user">
                                        <div className="message-content"><p>{msg.message}</p></div>
                                        <div className='user-img'><img src={user} alt="User" /></div>
                                    </div>
                                )}

                                {msg.sender === "bot" && (
                                    <div className="gptModal-message bot">
                                        <div className='chatbot-img2'><img src={chatbot} alt="GPT" /></div>
                                        <div className="message-content"><p>{msg.message}</p></div>
                                    </div>
                                )}

                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </div>
    );
}