import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import styled from "styled-components";
//Pages
import MainPage from './components/page/MainPage';

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
        <Route index element={<MainPage />} />
      </Routes>


    </BrowserRouter>
  );
}

export default App;
