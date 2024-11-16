import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FamilyPlus.css";
import back from "./images/back.png";
import search from "./images/search.png";
import profileImg from "./images/profileImg.png";

export default function FamilyPlus() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(true);
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();


  // 검색 기능
  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://backend-server.com/api/group/search`, {
        params: { id: query },
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.data) {
        setSearchResults(response.data);
        setError(false);
      } else {
        setSearchResults(null);
        setError(true);
      }
    } catch (error) {
      console.error("검색 중 오류가 발생했습니다.", error);
      setSearchResults(null);
      setError(true);
    }
  };

  // 구성원 추가 기능 (백엔드에 정보 전송)
  const handleAddMember = async () => {
    if (searchResults) {
      try {
        await axios.post(
          `https://backend-server.com/api/group/add`, 
          { memberId: searchResults.id }, 
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json"
            }
          }
        );
        
        alert("구성원이 성공적으로 추가되었습니다.");
        setQuery("");
        setSearchResults(null);

        navigate("/FamilyInfo");
      } catch (error) {
        console.error("구성원 추가 중 오류가 발생했습니다.", error);
        alert("구성원을 추가하는 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="family-plus-container">
      <div className="mission-d-top">
        <div className="mission-d-back-img">
          <img src={back} alt="" />
        </div>
        <div className="mission-d-title">가족구성원 등록</div>
      </div>

      <div className="user-edit-line"></div>

      <div className="family-plus-main-container">
        <div className="family-plus-search-bar">
          <input
            type="text"
            placeholder="가족구성원의 아이디를 조회해 보세요"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <img src={search} alt="search icon" onClick={handleSearch} />
        </div>
        <div className="family-plus-line"></div>

        {error && <p className="no-results">검색 결과 없음</p>}

        
        {searchResults && (
          <div className="family-plus-search-results">
            <img src={searchResults.profileImage} alt="profile" className="family-plus-profile-img" />
            <p>닉네임: {searchResults.nickname}</p>
            <p>아이디: {searchResults.id}</p>
            <button onClick={handleAddMember}>추가</button>
          </div>
        )}
      </div>
    </div>
  );
}



// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./FamilyPlus.css";
// import back from "./images/back.png";
// import search from "./images/search.png";
// import profileImg from "./images/profileImg.png";

// export default function FamilyPlus() {
//   const [query, setQuery] = useState("");
//   const [searchResults, setSearchResults] = useState({
//     id: "user123",
//     nickname: "홍길동"
//   });
//   const [error, setError] = useState(false);
//   // const accessToken = localStorage.getItem("accessToken");
//   const navigate = useNavigate();

//   // 검색 기능 (더미 데이터로 테스트)
//   const handleSearch = async () => {
//     // 실제 API 호출은 생략하고 더미 데이터를 보여줍니다.
//     if (query) {
//       setSearchResults({
//         id: "user123",
//         nickname: "홍길동"
//       });
//       setError(false);
//     } else {
//       setSearchResults(null);
//       setError(true);
//     }
//   };

//   // 구성원 추가 기능 (백엔드에 정보 전송)
//   const handleAddMember = async () => {
//     if (searchResults) {
//       try {
//         // 더미 데이터로 추가 처리
//         alert("구성원이 성공적으로 추가되었습니다.");
//         setQuery("");
//         setSearchResults(null);
//         navigate("/FamilyInfo");
//       } catch (error) {
//         console.error("구성원 추가 중 오류가 발생했습니다.", error);
//         alert("구성원을 추가하는 중 오류가 발생했습니다.");
//       }
//     }
//   };

//   return (
//     <div className="family-plus-container">
//       <div className="mission-d-top">
//         <div className="mission-d-back-img">
//           <img src={back} alt="" />
//         </div>
//         <div className="mission-d-title">가족구성원 등록</div>
//       </div>

//       <div className="user-edit-line"></div>

//       <div className="family-plus-main-container">
//         <div className="family-plus-search-bar">
//           <input
//             type="text"
//             placeholder="가족구성원의 아이디를 조회해 보세요"
//             className="search-input"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//           />
//           <img src={search} alt="search icon" onClick={handleSearch} />
//         </div>
//         <div className="family-plus-line"></div>

//         {error && <p className="no-results">검색 결과 없음</p>}

//         {searchResults && (
//           <div className="family-plus-search-results">
//             <img
//               src={profileImg}
//               alt="profile"
//               className="family-plus-profile-img"
//             />
//             <div className="family-plus-info">
//               <p>닉네임 <span>{searchResults.nickname}</span></p>
//               <p>아이디 <span>{searchResults.id}</span></p>
//             </div>
//             <button onClick={handleAddMember}>추가</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
