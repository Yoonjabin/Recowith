import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './NavUp.css';

const NavUp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [headerText, setHeaderText] = useState("");  // 상태 변수 추가

    useEffect(() => {
        console.log(location.pathname); // 현재 경로 출력

        const getHeaderText = () => {
            if (location.pathname === "/signup") {
                return "회원가입";
            } else if (location.pathname === "/signin" || location.pathname === "/inputFam") {
                return "가입완료";  // signin과 inputfam 모두 동일한 텍스트
            }
            return "회원가입"; // 기본값
        };

        setHeaderText(getHeaderText());
    }, [location.pathname]);

    const handleBackButtonClick = () => {
        navigate("/login");
    };

    return (
        <div className="header">
            <button className="backButton" onClick={handleBackButtonClick}>←</button>
            <span className="headerText">{headerText}</span>
        </div>
    );
};

export default NavUp;