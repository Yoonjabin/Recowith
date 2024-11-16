import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 
import axios from 'axios';
import S_Hedgehog from '../../pages/Login/L_Hedgehog.png';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
        const response = await axios.post('http://moyeothon.limikju.com:8080/api/members/login', {
            username: username,
            password: password,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = response.data;
        if (data.Success) {
            localStorage.setItem('accessToken', data.result.accessToken);
            localStorage.setItem('username',data.username)
            localStorage.setItem('nickname',data.nickname)
            alert('로그인 성공!');
            navigate('/');
        } else {
            setErrorMessage(data.message || '로그인 실패');
        }
    } catch (error) {
        setErrorMessage(error.response?.data?.message || '로그인 중 오류가 발생했습니다.');
    }
};

  return (
    <div className="MainTheme">
      <img src={S_Hedgehog} alt="Hedgehog" className="hedgehog" />
      <h1 className="appName">고슴도치핑</h1>
      <form className="loginForm">
        <input 
          type='text'
          className="Id"
          placeholder='아이디' 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required 
        />
        <input 
          type='password'
          className="password"
          placeholder='비밀번호' 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <button type="submit" className="loginButton" onClick={handleLogin}>로그인</button>
      </form>
      <div className="bottomText">
        <span>고슴도치핑 | </span>
        <a href="/signup" className="signupLink">회원가입</a>
      </div>
    </div>
  );
}

export default Login;