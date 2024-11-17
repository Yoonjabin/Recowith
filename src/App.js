import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from "./components/Nav/Nav.jsx";
import Main from "./pages/Main/Main.jsx";
import MissionMain from "./pages/Mission/Mission_main.jsx"
import MissionDetail from "./pages/Mission/Mission_detail.jsx"
import MissionWrite from "./pages/Mission/Mission_write.jsx"
import MissionFinish from "./pages/Mission/Mission_finish.jsx"
import ProjectWrite from "./pages/Project/Project_write.jsx"
import ProjectFinish from "./pages/Project/Project_finish.jsx"
import MypageMain from "./pages/Mypage/Mypage_main.jsx"
import UserEdit from "./pages/Mypage/UserEdit.jsx"
import FamilyPlus from "./pages/Mypage/FamilyPlus.jsx"
import PointMain from "./pages/Point/PointMain.jsx"
import Login from "./pages/Login/login.jsx";
import SignUp from "./pages/SignUp/signup.jsx";
import SignIn from "./pages/SignUp/SignIn.jsx";
import InputFam from "./pages/Family/InputFam.jsx";
import NavUp from "./components/NavUp/NavUp.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<><Nav /><Main /></>} />
        <Route path='/MissionMain' element={<><Nav /><MissionMain /></>}/>
        <Route path='/MissionDetail/:id' element={<><Nav /><MissionDetail /></>}/>
        <Route path='/MissionWrite/1' element={<><Nav /><MissionWrite /></>}/>
        <Route path='/MissionFinish' element={<MissionFinish/>}/>
        <Route path='/ProjectWrite' element={<><Nav /><ProjectWrite /></>}/>
        <Route path='/ProjectFinish' element={<ProjectFinish/>}/>
        <Route path='/MypageMain' element={<><Nav /><MypageMain /></>}/>
        <Route path='/UserEdit' element={<><Nav /><UserEdit /></>}/>
        <Route path='/FamilyPlus' element={<><Nav /><FamilyPlus /></>}/>
        <Route path='/PointMain' element={<><Nav /><PointMain /></>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<><NavUp /><SignUp /></>} />
        <Route path='/signin' element={<><NavUp /><SignIn /></>} />
        <Route path='/inputFam' element={<><NavUp /><InputFam /></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
