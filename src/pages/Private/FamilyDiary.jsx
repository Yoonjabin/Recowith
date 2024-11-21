import "./FamilyDiary.css";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import back from "./images/back.png";
import axios from "axios";
import calendarIcon from "./images/date.png";

export default function FamilyDiary() {
    const navigate = useNavigate();
    const { id } = useParams(); // URL에서 'id' 파라미터 가져오기
    const [missionPost, setMissionPost] = useState(null); // 챌린지 상세 정보 저장

    // 챌린지 상세 정보 가져오기
    useEffect(() => {
        const fetchMission = async () => {
            const accessToken = localStorage.getItem('accessToken');
            try {
                const response = await axios.get(`https://dochi-nest-api.shop/api/user/challenges/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                });

                if (response.status === 200) {
                    setMissionPost(response.data[0]);
                    console.log("조회 성공", response);
                } else {
                    console.error('Failed to fetch:', response);
                }
            } catch (error) {
                console.error('Error fetching mission:', error);
            }
        };

        fetchMission();
    }, [id]);

    const postDate = missionPost ? new Date(missionPost.uploadDate) : new Date();

    return (
        <div className="project-write-container">
            <div className="missionTop-2">
                <div className="mission_back_img" onClick={() => navigate('/Family_mission')}>
                    <img src={back} alt="back" />
                </div>
                <div className="missionTitle">도전 과제 내역</div>
            </div>
            <div className="mission-family-underline-2"></div>


            {missionPost && (
                <div className="diary-write-main-container">
                    <div className="diary-write-date">
                        <div className="diary-write-date-input">
                            <span>작성일자: {postDate.toLocaleDateString()}</span>
                            <img src={calendarIcon} alt="Calendar Icon" className="calendar-icon" />
                        </div>
                    </div>

                    <div className="diary-write-title">
                        <input
                            type="text"
                            value={missionPost.challenge.title}
                            readOnly
                        />
                    </div>

                    <div className="diary-write-input-img">
                        <span className="diary-write-camera-img">
                            <img alt="mission" src={missionPost.image} />
                        </span>
                    </div>

                    <div className="diary-write-contents-container">
                        <textarea
                            className="diary-write-contents"
                            value={missionPost.review}
                            readOnly
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
