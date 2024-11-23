import "./Family_mission.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import back from '../Mission/images/back.png';
import mission1 from '../Mission/images/mission1.png';

export default function Family_mission() {
    const navigate = useNavigate();
    const [missionPost, setMissionPost] = useState([]); // 기본값을 빈 배열로 설정

    useEffect(() => {
        const fetchPosts = async () => {
            const accessToken = localStorage.getItem('accessToken');
            try {
                const response = await axios.get('https://dochi-nest-api.shop/api/user/challenges', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                });

                if (response.status === 200) {
                    // 응답 데이터가 배열인지 확인하고, 배열이 아니면 빈 배열로 설정
                    setMissionPost(Array.isArray(response.data.data) ? response.data.data : []);
                    console.log("조회 성공", response); 
                } else {
                    console.error('Failed to fetch:', response);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);

    // 오늘 날짜
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const todayDate = getTodayDate();

    const handleNavigate = (id) => {
        // 해당 아이디를 가지고 상세 페이지로 이동
        navigate(`/FamilyDiary/${id}`);
    };

    return (
        <div className="missionContainer">
            <div className="missionTop">
                <div className="mission_back_img" onClick={() => navigate('/MypageMain')}>
                    <img src={back} alt="back" />
                </div>
                <div className="missionTitle">도전 과제 내역</div>
            </div>
            <div className="mission-family-underline"></div>

            <div className="missionContent">
                <div className="missionDate">{todayDate}</div>

                {Array.isArray(missionPost) && missionPost.length > 0 ? (
                    missionPost.map((mission, index) => (
                        <div key={index} className="mission1" onClick={() => handleNavigate(mission.id)}>
                            <div className="mission_1_text">
                                <div className="mission_main_sub">
                                    {mission.title} <br />
                                    <span>{mission.category}</span>
                                </div>
                                <div className="mission_1_daypoint">
                                    <div className="mission_1_day">
                                        D-{mission.dday || 'N/A'}
                                    </div>
                                    <div className="mission_1_point">
                                        {mission.points || 'N/A'}P
                                    </div>
                                </div>
                            </div>
                            <div className="mission_1_img">
                                <img src={mission1} alt="mission1" />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-missions">도전 과제가 없습니다.</div>
                )}
            </div>
        </div>
    );
}
