import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import styled from "styled-components";
//Pages
import MainPage from './components/page/MainPage';
import LoginPage from './components/page/LoginPage';
import MyPage from "./components/page/MyPage";

const MainTitleText = styled.p`
    top-padding: 100px;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
`;

function App(props) {
  return (
    <BrowserRouter>
      <MainTitleText>프로젝트 제목</MainTitleText>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/mypage" element={<MyPage/>} />
        
        
      </Routes>


    </BrowserRouter>
  );
}

export default App;
