import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './NavUp.css';
import back from "./back.png"

const NavUp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [headerText, setHeaderText] = useState("");  // 상태 변수 추가

    useEffect(() => {
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
        navigate("/");
    };

    return (
        <div className="header">
            <button className="backButton" onClick={handleBackButtonClick}>
                <img src={back} alt="" />
            </button>
            <span className="headerText">{headerText}</span>
        </div>
    );
};

export default NavUp;