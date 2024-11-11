import React from 'react'
import "./Nav.css"
import home from "./images/home.png"
import mission from "./images/mission.png"
import project from "./images/project.png"
import mypage from "./images/mypage.png"

export default function Nav() {
    return (
        <div className='nav-container'>
            <div className='nav-contents'>
                <div className='nav-home'>
                    <div className='nav-home-img'>
                        <img src={home} alt="" />
                    </div>
                    <div className='nav-home-kor'>홈</div>
                </div>
                <div className='nav-mission'>
                    <div className='nav-mission-img'>
                        <img src={mission} alt="" />
                    </div>
                    <div className='nav-mission-kor'>도전과제</div>
                </div>
                <div className='nav-project'>
                    <div className='nav-project-img'>
                        <img src={project} alt="" />
                    </div>
                    <div className='nav-project-kor'>가족프로젝트</div>
                </div>
                <div className='nav-mypage'>
                    <div className='nav-mypage-img'>
                        <img src={mypage} alt="" />
                    </div>
                    <div className='nav-mypage-kor'>마이페이지</div>
                </div>
            </div>

        </div>
    )
}
