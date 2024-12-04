import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); 

  const handleSignUp = async () => {
    console.log('회원가입 요청 시작'); 
    console.log('요청 데이터:', { username, password, email, nickname }); 

    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/register',
        {
          username: username,
          password: password,
          email: email,
          nickname: nickname
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      console.log('응답 데이터:', response.data); 

      if (response.status === 200) {
        console.log('회원가입 성공:', response.data); 
        alert('회원가입 성공!');
        navigate('/'); 
      } else {
        console.log('회원가입 실패:', response.data); 
      }
    } catch (error) {
      console.error('회원가입 중 에러 발생:', error.message); 
      console.error('에러 응답:', error.response?.data || '응답 없음'); 
      console.error('에러 상태 코드:', error.response?.status || '상태 코드 없음'); 
      console.error('에러 요청 설정:', error.config); 
    }
  };

  return (
      <div className="signUpForm">

        <div className="signinGroup">
          <label htmlFor="id">
            <span className="required">*</span>아이디
          </label>
          <input
            type="text"
            id="id"
            name="id"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mandatoryId"
            placeholder="아이디를 입력하세요"
          />
        </div>

        <div className="signinGroup">
          <label htmlFor="password">
            <span className="required">*</span>비밀번호
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mandatoryPw"
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        <div className="signinGroup">
          <label htmlFor="email">
            <span className="required">*</span>이메일
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mandatoryEmail"
            placeholder="이메일을 입력하세요"
          />
        </div>

        <div className="signinGroup">
          <label htmlFor="nickname">
            <span className="required">*</span>닉네임
          </label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="mandatoryNickname"
            placeholder="닉네임을 입력하세요"
          />
        </div>

        <button type="submit" className="submitBtn" onClick={handleSignUp}>
        회원가입 완료
      </button>

      </div>

  );
};

export default SignUp;