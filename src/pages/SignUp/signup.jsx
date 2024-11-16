import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate를 임포트
import './SignUp.css';
import axios from "axios"

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();  // useNavigate 훅을 사용하여 navigate 함수 생성

  const handleSignUp = async () => {
    try {
        const response = await axios.post('http://url/api/auth/register', {
            username: username,
            password: password,
            email: email,
            nickname: nickname
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        });

        if (response.data.isSuccess) {
            alert('회원가입 성공!');
            navigate('/login');
        } else {
            alert(`회원가입 실패: ${response.data.message}`);
        }
    } catch (error) {
        console.error('회원가입 중 에러 발생:', error);
        alert('회원가입 중 오류가 발생했습니다.');
    }
};

  return (
    <div className="signUpForm">
      {/* <form onSubmit={handleSubmit}> */}
        <div className="inputGroup">
          <label htmlFor="id">
            아이디 <span className="required">*</span>
          </label>
          <input
            type="text"
            id="id"
            name="id"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="inputField Id"
            placeholder="아이디를 입력하세요"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="password">
            비밀번호 <span className="required">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="inputField Pw"
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="email">
            이메일 <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="inputField Email"
            placeholder="이메일을 입력하세요"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="nickname">
            닉네임 <span className="required">*</span>
          </label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="inputField Nickname"
            placeholder="닉네임을 입력하세요"
          />
        </div>

        <button type="submit" className="submitBtn" onClick={handleSignUp}>회원가입</button>
      {/* </form> */}
    </div>
  );
};

export default SignUp;