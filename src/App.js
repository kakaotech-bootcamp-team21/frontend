import React, {useEffect, useState} from "react";
import {
    Routes,

    Route, Link, useNavigate, useLocation

} from "react-router-dom";
import styled from "styled-components";
import './AI_Main.css';
//Pages
import MainPage from './components/page/MainPage';
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import PrivacyPolicyPage from "./Pages/PrivacyPolicyPage";

import Button from "react-bootstrap/Button";
import RedirectPage from "./Pages/RedirectPage";

import AuthVerificationPage from "./Pages/AuthVerificationPage";
import UserInfoPage from "./Pages/UserInfoPage";
import InfoPage from './InfoPage';
import SubmitPage from './SubmitPage';
import Mypage from './Mypage';

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
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('userInfo');
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        } else {
            setUser(null);
        }
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        navigate('/login');
    };

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const getUserTypeKorean = (type) => {
        switch(type) {
            case 'user': return '사용자';
            case 'pro': return '전문가';
            case 'admin': return '관리자';
            default: return '';
        }
    };

  return (
     <div>
         {user ? (
             <>
                 <MainTitleText>
                     안녕하세요 {getUserTypeKorean(user.type)} {user.name}님!
                 </MainTitleText>
                 <nav>
                     <Link to="/">
                         <StyledButton variant="primary">메인 페이지</StyledButton>
                     </Link>
                     <StyledButton variant="secondary" onClick={handleLogout}>로그아웃</StyledButton>
                 </nav>
             </>
         ) : (
             <>
                 <MainTitleText>임시 페이지</MainTitleText>
                 <nav>
                     <Link to="/login">
                         <StyledButton variant="primary">로그인 페이지로 이동</StyledButton>
                     </Link>
                 </nav>
             </>
         )}


          <Routes>
              <Route index element={<MainPage/>}/>




              {/*로그인 및 회원가입*/}
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/auth" element={<RedirectPage />} />

              <Route path="/auth-verification-page" element={<AuthVerificationPage />} />
              <Route path="/user-info" element={<UserInfoPage />} />

              <Route path="/info" element={<InfoPage />} />
              <Route path="/submit" element={<SubmitPage />} />
              <Route path="/Mypage" element={<Mypage />} />
          </Routes>
     </div>
  );
}

export default App;
