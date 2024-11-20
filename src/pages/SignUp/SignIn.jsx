import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import dochi from '../../pages/Login/loginDochi.png';

const SignIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/inputFam');
    }, 3000); // 3초 후 이동

    // 컴포넌트가 언마운트되면 타이머 정리
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="signContainer">
      <img src={dochi} alt="Hedgehog" className="SignHedgehog" />
      <div className="textContainer">
        <span>가입 완료!</span>
        <p>도치둥지에 오신걸, 환영해요!</p>
      </div>
    </div>
  );
};

export default SignIn;
