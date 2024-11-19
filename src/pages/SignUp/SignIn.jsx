import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import dochi from '../../pages/Login/loginDochi.png';

const SignIn = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');
  const nickname = localStorage.getItem('nickname');

  const handlePageClick = () => {
    navigate('/inputFam');
  };

  return (

    <div className="signContainer" onClick={handlePageClick}>

      <img src={dochi} alt="Hedgehog" className="SignHedgehog" />

      <div className="textContainer">
        <span>가입 완료!</span>
        <p>{nickname}님, 환영해요!</p>
      </div>
    </div>
    
  );
};

export default SignIn;