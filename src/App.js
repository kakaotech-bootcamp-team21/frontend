import React from "react";
import {
    Routes,
    Route, Link
} from "react-router-dom";
import styled from "styled-components";
//Pages
import MainPage from './components/page/MainPage';
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import PrivacyPolicyPage from "./Pages/PrivacyPolicyPage";

import Button from "react-bootstrap/Button";
import RedirectPage from "./Pages/RedirectPage";

const MainTitleText = styled.p`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
`;

const StyledButton = styled.button`
    background-color: #4682B4;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin: 10px 5px;
`;

function App(props) {
  return (
     <div>
          <MainTitleText>임시페이지</MainTitleText>
          <div>도커실행테스트 12345</div>
          <div>도커실행테스트 12345</div>

          <nav>
              <Link to="/login">
                  <Button>로그인 페이지로 이동</Button>
                  <Link to="/signup"><StyledButton>회원가입</StyledButton></Link>
                  <Link to="/privacy-policy"><StyledButton>개인정보 취급방침</StyledButton></Link>

              </Link>
          </nav>
          <Routes>
              <Route index element={<MainPage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/auth" element={<RedirectPage />} />

          </Routes>
     </div>
  );
}

export default App;
