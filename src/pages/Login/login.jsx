import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import dochi from '../../pages/Login/loginDochi.png';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    console.log('로그인 요청 시작');
    console.log('요청 데이터:', { username, password });

    try {
      const response = await axios.post(
        'https://dochi-nest-api.shop/api/auth/login',
        {
          username: username,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      console.log('응답 데이터:', response.data);
      console.log('응답 상태 코드:', response.status);

      const data = response.data;
      if (response.status === 200) {
        console.log('로그인 성공:', response);
        localStorage.setItem('accessToken', response.data.token);
        localStorage.setItem('username', data.username)
        localStorage.setItem('nickname', data.nickname)
        localStorage.setItem('userId', data.userId)
        localStorage.setItem('email', data.email)
        navigate('/signin');
      } else {
        console.warn('로그인 실패:', data.message || '로그인 실패');
        setErrorMessage(data.message || '로그인 실패');
      }
    } catch (error) {
      console.error('로그인 중 에러 발생:', error.message);
      console.error('에러 응답:', error.response?.data || '응답 없음');
      console.error('에러 상태 코드:', error.response?.status || '상태 코드 없음');
      console.error('에러 요청 설정:', error.config);
      setErrorMessage(error.response?.data?.message || '로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="MainTheme">
      <img src={dochi} alt="Hedgehog" className='LoginHedgehog' />

      <div className="appName">도치둥지 로그인</div>

      <form className="loginForm">
        <input
          type="text"
          className="enterId"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          className="enterPassword"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="button" className="loginButton" onClick={handleLogin}>로그인</button>


      </form>
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      <div className="bottomText">
        <span>도치둥지  </span>|
        <a href="/signup" className="signupLink"> 회원가입</a>
      </div>
    </div>
  );
};

export default Login;