import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './InputFam.css';
import dochi from '../../pages/Login/loginDochi.png';

const InputFam = () => {
  const navigate = useNavigate();
  const [familyname, setFamilyName] = useState('');

  const handleSkipClick = () => {
    // 건너뛰기 버튼 클릭 시 '/가족구성원페이지'로 이동
    navigate('/main');
  };

  const accessToken = localStorage.getItem("accessToken")

  const handleFamilySubmit = async () => {
    try {
      const response = await axios.post('http://3.223.46.202:80/api/group/create', {
        groupName: familyname,
      },{
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
      if (response.status === 200) {
        alert("등록 성공!");
        console.log("가족이름 저장 성공",response)
        // navigate('/MeetMain');
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
      <Link to="/FamilyPlus" className="registerLink">
        가족구성원 등록하기 &gt;
      </Link>

      <p className="mypageText">
        <span style={{ color: '#F9957F' }}>마이페이지</span>에서도 가족 구성원을 등록할 수 있습니다.
      </p>

      <button className="skipButton" onClick={handleSkipClick}>나중에 하기</button>
    </div>
  );
};

export default InputFam;