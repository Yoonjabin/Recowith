import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './InputFam.css';
import dochi from '../../pages/Login/loginDochi.png';

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
      alert('가족명을 입력해 주세요!');
      return;
    }

    try {
      const response = await axios.post('https://dochi-nest-api.shop/api/group/create', {
        groupName: familyname,
      },{
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });

      if (response.status === 200) {
        alert("등록 성공!");
        console.log("가족이름 저장 성공", response);
        setIsFamilyNameSaved(true); // 가족 이름이 저장되었으므로 버튼 활성화
      }
    } catch (error) {
      console.error("등록 실패:", error);
      alert("등록에 실패했습니다.");
    }
  };

  return (
    <div className="inputFamContainer">
      <div className="imageContainer">
        <img src={dochi} alt="Hedgehog" className="cHedgehog" />
      </div>
      <input
        type="text"
        className="formText"
        placeholder="가족명을 입력해 주세요!"
        value={familyname}
        onChange={(e) => setFamilyName(e.target.value)}
        required
      />

      <button className='submit-family-name' onClick={handleFamilySubmit}>저장하기</button>

      {/* "가족구성원 등록하기" 버튼은 가족명이 저장된 후에만 활성화 */}
      {isFamilyNameSaved && (
        <Link to="/FamilyPlus" className="registerLink">
          가족구성원 등록하기 &gt;
        </Link>
      )}
      
      {isFamilyNameSaved && (
      <p className="mypageText">
        <span style={{ color: '#F9957F' }}>마이페이지</span>에서도 가족 구성원을 등록할 수 있습니다.
      </p>
      )}

      {/* "나중에 하기" 버튼은 가족명이 저장된 후에만 활성화 */}
      {isFamilyNameSaved && (
        <button className="skipButton" onClick={handleSkipClick}>나중에 하기</button>
      )}
    </div>
  );
};

export default InputFam;
