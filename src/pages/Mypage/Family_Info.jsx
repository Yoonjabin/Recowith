import React, { useState } from "react";
import FamilyPlus from "./FamilyPlus";

export default function Family_Info() {
  const [familyMembers, setFamilyMembers] = useState([]);

  // 구성원 추가 함수
  const handleAddFamilyMember = (member) => {
    setFamilyMembers([...familyMembers, member]); // 새로운 구성원 추가
  };

  return (
    <div className="family-info-container">
      <h2>가족 구성원</h2>
      
      {/* 기존 구성원 목록 표시 */}
      <div className="family-members-list">
        {familyMembers.map((member, index) => (
          <div key={index} className="family-member">
            <img src={member.profileImage} alt="profile" className="profile-img" />
            <p>닉네임: {member.nickname}</p>
            <p>아이디: {member.id}</p>
          </div>
        ))}
      </div>

      {/* 가족 구성원 검색 및 추가 기능 */}
      <FamilyPlus onAddFamilyMember={handleAddFamilyMember} />
    </div>
  );
}
