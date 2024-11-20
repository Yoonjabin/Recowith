import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate를 임포트
import './SignUp.css';
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 생성

  const handleSignUp = async () => {
    console.log('회원가입 요청 시작'); // 요청 시작 로그
    console.log('요청 데이터:', { username, password, email, nickname }); // 입력된 데이터 확인

    try {
      const response = await axios.post(
        'https://dochi-nest-api.shop/api/auth/register',
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

      console.log('응답 데이터:', response.data); // 성공 시 응답 데이터 출력

      if (response.status === 200) {
        console.log('회원가입 성공:', response.data); // 성공 메시지 출력
        alert('회원가입 성공!');
        navigate('/'); //로그인으로 이동
      } else {
        console.log('회원가입 실패:', response.data); // 실패 시 응답 데이터 출력
      }
    } catch (error) {
      console.error('회원가입 중 에러 발생:', error.message); // 에러 메시지
      console.error('에러 응답:', error.response?.data || '응답 없음'); // 응답 데이터
      console.error('에러 상태 코드:', error.response?.status || '상태 코드 없음'); // 상태 코드
      console.error('에러 요청 설정:', error.config); // 요청 설정
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