import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './InputFam.css';
import logo from '../../pages/Login/MainLogo.png';

const InputFam = () => {
  const navigate = useNavigate();
  const [familyname, setFamilyName] = useState('');
  const [isFamilyNameSaved, setIsFamilyNameSaved] = useState(false); // 가족 이름이 저장되었는지 여부
  const accessToken = localStorage.getItem("accessToken");

  const handleSkipClick = () => {
    // 건너뛰기 버튼 클릭 시 '/main'으로 이동
    navigate('/main');
  };

  const handleFamilySubmit = async () => {
    // 가족 이름이 비어있으면 경고
    if (!familyname.trim()) {
      alert('러닝메이트 친구를 입력해 주세요!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/group/create', {
        groupName: familyname,
      },{
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });

      if (response.status === 200) {
        // alert("등록 성공!");
        console.log("친구 저장 성공", response);
        setIsFamilyNameSaved(true); // 가족 이름이 저장되었으므로 버튼 활성화
      }
    } catch (error) {
      console.error("등록 실패:", error);
      alert("등록에 실패했습니다.");
    }
  };

  return (
    <div className="inputFamContainer">

      <div className="inputFam-d-top">
        <div className="inputFam-d-title">가입 완료</div>
      </div>

      <div className="inputFam-underline"></div>


      <div className="imageContainer">
        <img src={logo} alt="Hedgehog" className="cHedgehog" />
      </div>
      <input
        type="text"
        className="formText"
        placeholder="친구명을 입력해 주세요!"
        value={familyname}
        onChange={(e) => setFamilyName(e.target.value)}
        required
      />

      <button className='submit-family-name' onClick={handleFamilySubmit}>저장하기</button>

        <Link to="/FamilyPlus" className="registerLink">
         러닝 메이트 등록하기 &gt;
        </Link>
      
      <p className="mypageText">
        <span style={{ color: '#0004ff' }}>마이페이지</span>에서도 동료 러너를 등록할 수 있습니다.
      </p>


        <button className="skipButton" onClick={handleSkipClick}>나중에 하기</button>
    </div>
  );
};

export default InputFam;
