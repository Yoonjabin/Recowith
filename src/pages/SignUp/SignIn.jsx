// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './SignIn.css';
// import dochi from '../../pages/Login/loginDochi.png';

// const SignIn = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigate('/inputFam');
//     }, 3000); // 3초 후 이동

//     // 컴포넌트가 언마운트되면 타이머 정리
//     return () => clearTimeout(timer);
//   }, [navigate]);

//   return (
//     <div className="signContainer">
//       <img src={dochi} alt="Hedgehog" className="SignHedgehog" />
//       <div className="textContainer">
//         <span>가입 완료!</span>
//         <p>도치둥지에 오신걸, 환영해요!</p>
//       </div>
//     </div>
//   );
// };

// export default SignIn;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './SignIn.css';
// import dochi from '../../pages/Login/loginDochi.png';

// const SignIn = () => {
//   const navigate = useNavigate();
//   const [isVisible, setIsVisible] = useState(false); // 애니메이션 시작 상태 관리

//   useEffect(() => {
//     // 0.1초 후 애니메이션 시작
//     const animationTimer = setTimeout(() => {
//       setIsVisible(true);
//     }, 100);

//     // 8초 후 페이지 이동
//     const navigateTimer = setTimeout(() => {
//       navigate('/inputFam');
//     }, 100000);

//     return () => {
//       clearTimeout(animationTimer);
//       clearTimeout(navigateTimer);
//     };
//   }, [navigate]);

//   return (
//     <div className="signContainer">
//       <img src={dochi} alt="Hedgehog" className="SignHedgehog" />
//       {/* 애니메이션을 시작하기 위해 visible 클래스 추가 */}
//       <div className={`textContainer ${isVisible ? 'visible' : ''}`}>
//         <span>가입 완료!</span>
//         <p>도치둥지에 오신걸, 환영해요!</p>
//       </div>
//     </div>
//   );
// };

// export default SignIn;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import dochi from '../../pages/Login/loginDochi.png';

const SignIn = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false); // 등장 여부
  const [isBlinking, setIsBlinking] = useState(false); // 깜빡임 여부

  useEffect(() => {
    // 0.1초 후 등장 애니메이션 시작
    const animationTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // 3초 후 깜빡임 애니메이션 시작
    const blinkTimer = setTimeout(() => {
      setIsBlinking(true);
    }, 3000); // 모든 요소가 나타난 뒤에 실행

    // 8초 후 페이지 이동
    const navigateTimer = setTimeout(() => {
      navigate('/inputFam');
    }, 6000);

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(blinkTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);

  return (
    <div className="signContainer">

      <div className="inputFam-d-top">
        {/* <div className="mission-d-back-img-1" onClick={() => navigate("/main")}>
          <img src={back} alt="뒤로가기" />
        </div> */}
        <div className="inputFam-d-title">가입 완료</div>
      </div>

      <div className="signin-underline"></div>

      <img src={dochi} alt="Hedgehog" className="SignHedgehog" />
      <div className={`textContainer ${isVisible ? 'visible' : ''} ${isBlinking ? 'blinking' : ''}`}>
        <span>가입 완료!</span>
        <p>도치둥지에 오신걸, 환영해요!</p>
      </div>
    </div>
  );
};

export default SignIn;
