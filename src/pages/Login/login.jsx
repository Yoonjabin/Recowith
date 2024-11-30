import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import logo from '../../pages/Login/MainLogo.png';

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
        'http://localhost:8080/api/auth/login', // 로컬 백엔드 서버
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
        localStorage.setItem('accessToken', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('nickname', data.nickname);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('email', data.email);

        // 최초 로그인 여부 확인 요청
        try {
          const firstLoginResponse = await axios.post(
            'http://localhost:8080/api/auth/check-first-login',
            {},
            {
              headers: {
                'Authorization': `Bearer ${data.token}`,
              },
            }
          );

          console.log('최초 로그인 응답:', firstLoginResponse.data);

          if (firstLoginResponse.data.isFirstLogin) {
            console.log('최초 로그인: /signin으로 이동');
            navigate('/signin');
          } else {
            console.log('이미 로그인한 사용자: /main으로 이동');
            navigate('/main');
          }
        } catch (firstLoginError) {
          console.error('최초 로그인 확인 요청 중 에러 발생:', firstLoginError);
          setErrorMessage('최초 로그인 확인 중 오류가 발생했습니다.');
        }
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
      <img src={logo} alt="Hedgehog" className='LoginHedgehog' />  

      <div className="appName">러닝메이트 로그인</div>

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
        <span>러닝메이트  </span>| 
        <a href="/signup" className="signupLink"> 회원가입</a>
      </div>
    </div>
  );
};

export default Login;
