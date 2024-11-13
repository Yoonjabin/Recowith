import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import "./Nav.css";
import home from "./images/home.png";
import mission from "./images/mission.png";
import project from "./images/project.png";
import mypage from "./images/mypage.png";

export default function Nav() {
    const navigate = useNavigate(); 
    return (
        <div className='nav-container'>
            <div className='nav-contents'>
                <div className='nav-home' onClick={() => navigate('/')}>
                    <div className='nav-home-img'>
                        <img src={home} alt="홈" />
                    </div>
                    <div className='nav-home-kor'>홈</div>
                </div>
                <div className='nav-mission' onClick={() => navigate('/MissionMain')}>
                    <div className='nav-mission-img'>
                        <img src={mission} alt="도전과제" />
                    </div>
                    <div className='nav-mission-kor'>도전과제</div>
                </div>
                <div className='nav-project' onClick={() => navigate('/project')}>
                    <div className='nav-project-img'>
                        <img src={project} alt="가족프로젝트" />
                    </div>
                    <div className='nav-project-kor'>가족프로젝트</div>
                </div>
                <div className='nav-mypage' onClick={() => navigate('/mypage')}>
                    <div className='nav-mypage-img'>
                        <img src={mypage} alt="마이페이지" />
                    </div>
                    <div className='nav-mypage-kor'>마이페이지</div>
                </div>
            </div>
        </div>
    );
}
