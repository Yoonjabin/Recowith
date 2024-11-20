// import axios from 'axios';
// import { useEffect, useState } from 'react';
// export default function ProjectDetail() {
//   const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
//   const [projectDetail, setProjectDetail] = useState(null); // 초기값 null

//   useEffect(() => {
//     const fetchProjectDetail = async () => {
//       setIsLoading(true);
//       const accessToken = localStorage.getItem('accessToken');
//       try {
//         const response = await axios.get(`http://3.223.46.202:80/api/project/search/13`, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             // referrerPolicy: "no-referrer"
//           },
//         });

//         if (response.status === 200) {
//           console.log(response)
//           setProjectDetail(response.data); // 데이터를 상태에 저장
//         } else {
//           console.error('프로젝트 상세 정보 요청 실패:', response);
//         }
//       } catch (error) {
//         console.error('Error fetching project details:', error);
//       } finally {
//         setIsLoading(false); // 로딩 상태 종료
//       }
//     };

//     fetchProjectDetail();
//   }, []);

//   // 조건부 렌더링 추가
//   if (isLoading) {
//     return <div>로딩 중...</div>;
//   }

//   if (!projectDetail) {
//     return <div>프로젝트 정보를 불러오는 데 실패했습니다.</div>;
//   }

//   // 이미지 URL이 상대 경로일 경우 절대 경로로 변경
//   const imageUrl = `http://3.223.46.202:80/${projectDetail.data.url}`;

//   return (
//     <div>
//       <h2>{projectDetail.data.projectName}</h2>
//       <p>{projectDetail.data.content}</p>
//       {projectDetail.data.url && (
//         <img
//         // referrerPolicy="no-referrer"
//           src={imageUrl} 
//           alt="프로젝트 이미지"
//           style={{ width: "100%", borderRadius: "10px" }}
//         />
//       )}
//     </div>
//   );
// }


import axios from 'axios';
import { useEffect, useState } from 'react';
export default function ProjectDetail() {
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [projectDetail, setProjectDetail] = useState(null); // 초기값 null

  useEffect(() => {
    const fetchProjectDetail = async () => {
      setIsLoading(true);
      const accessToken = localStorage.getItem('accessToken');
      try {
        const response = await axios.get(`http://3.223.46.202:80/api/user/challenges/1`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        if (response.status === 200) {
          setProjectDetail(response.data[0]);
          console.log(response)
        } else {
          console.error('프로젝트 상세 정보 요청 실패:', response);
        }
      } catch (error) {
        console.error('Error fetching project details:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchProjectDetail();
  }, []);
  
  // 조건부 렌더링 추가: projectDetail이 null이 아닌지 확인
  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  
  if (!projectDetail) {
    return <div>프로젝트 정보를 불러오는 데 실패했습니다.</div>;
  }
  
  const imageUrl = `http://3.223.46.202:80/${projectDetail.image}`;

  return (
    <div>
      <h2>{projectDetail.uploadDate}</h2>
      <p>{projectDetail.review}</p>
      {projectDetail.image && (
        <img
          referrerPolicy="no-referrer"
          src={imageUrl} 
          alt="프로젝트 이미지"
          style={{ width: "100%", borderRadius: "10px" }}
        />
      )}
    </div>
  );
}
