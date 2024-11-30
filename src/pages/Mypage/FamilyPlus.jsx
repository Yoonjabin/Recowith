import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FamilyPlus.css";
import back from "./images/back.png";
import search from "./images/search.png";
import profileImg from "./images/profile.png";

export default function FamilyPlus() {
  const [query, setQuery] = useState(""); // 검색어
  const [searchResults, setSearchResults] = useState(null); // 검색 결과 저장
  const [error, setError] = useState(false); // 에러 상태
  const [isAdded, setIsAdded] = useState(false); // 버튼 상태
  const accessToken = localStorage.getItem("accessToken"); // 토큰 가져오기
  const navigate = useNavigate();

// 검색 기능
  const handleSearch = async () => {
    if (!query.trim()) {
      alert("검색할 아이디를 입력하세요.");
      return;
    }

  try {
    const response = await axios.get(`http://localhost:8080/api/group/search/${query}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    // 백엔드 응답 데이터 확인
    console.log("응답 데이터:", response.data);

    // 응답 상태 확인
    if (response.status === 200 && response.data.code === 200) {
      setSearchResults(response.data);
      setError(false);
      // alert("사용자 검색 성공");
    } else if (response.status === 200 &&response.data.code === 400) {
      alert("이미 등록된 그룹이 있는 사용자입니다.");
      setSearchResults(null);
      setError(true);
    } else if (response.status === 200 &&response.data.code === 404) {
      alert("사용자 정보를 찾을 수 없습니다.");
      setSearchResults(null);
      setError(true);
    } else {
      alert("알 수 없는 오류가 발생했습니다.");
      setSearchResults(null);
      setError(true);
    }
  } catch (error) {
    console.error("검색 중 오류가 발생했습니다.", error);
    alert("검색 중 오류가 발생했습니다.");
    setSearchResults(null);
    setError(true);
  }
};


  // 구성원 추가 기능
  const handleAddMember = async () => {
    if (searchResults) {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/group/add`,
          { userId: searchResults.data.userId },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          console.log("구성원 추가 성공:", response.data);
          // alert("구성원이 성공적으로 추가되었습니다.");
          setIsAdded(true); // 버튼 상태 변경
        } else {
          console.error("구성원 추가 실패: 예상하지 못한 상태 코드", response.status);
          alert("구성원을 추가하는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("구성원 추가 중 오류가 발생했습니다.", error);
        alert("구성원을 추가하는 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="family-plus-container">
      <div className="mission-d-top-10">
        <div className="mission-d-back-img" onClick={() => navigate("/FamilyInfo")}>
          <img src={back} alt="" />
        </div>
        <div className="mission-d-title">러닝메이트 등록</div>
      </div>

      <div className="mypage-underline"></div>

      <div className="family-plus-main-container">
        <div className="family-plus-search-bar">
          <input
            type="text"
            placeholder="러닝메이트의 아이디를 조회해 보세요"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)} // 입력 값 관리
          />
          <img src={search} alt="search icon" onClick={handleSearch} />
        </div>
        <div className="family-plus-line"></div>

        {error && <p className="no-results">검색 결과가 없습니다. 올바른 아이디를 입력해 보세요.</p>}

        {searchResults && searchResults.data && (
          <div className="family-plus-search-results">
            <img
              src={searchResults.profileImage || profileImg}
              alt="profile"
              className="family-plus-profile-img"
            />
            <div className="family-plus-search-result-text">
              <div className="family-plus-search-result-textbox1">
                <span>닉네임</span> <div className="family-plus-search-user-info">{searchResults.data.nickname}</div>
              </div>
              <div className="family-plus-search-result-textbox2">
                <span>아이디</span> <div className="family-plus-search-user-info">{searchResults.data.username}</div>
              </div>
            </div>

            <button
              onClick={handleAddMember}
              disabled={isAdded} // 버튼 비활성화
              className={isAdded ? "added-button" : ""}
            >
              {isAdded ? "추가됨" : "추가"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

