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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<><Nav /><Main /></>} />
        <Route path='/MissionMain' element={<><Nav /><MissionMain /></>}/>
        <Route path='/MissionDetail' element={<><Nav /><MissionDetail /></>}/>
        <Route path='/MissionWrite' element={<><Nav /><MissionWrite /></>}/>
        <Route path='/MissionFinish' element={<MissionFinish/>}/>
        <Route path='/ProjectWrite' element={<><Nav /><ProjectWrite /></>}/>
        <Route path='/ProjectFinish' element={<ProjectFinish/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
