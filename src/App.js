import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from "./components/Nav/Nav.jsx";
import Main from "./pages/Main/Main.jsx";
import MissionMain from "./pages/Mission/Mission_main.jsx"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<><Nav /><Main /></>} />
        <Route path='/MissionMain' element={<><Nav /><MissionMain /></>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
