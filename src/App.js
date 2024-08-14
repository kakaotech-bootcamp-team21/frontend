import React, { useEffect, useState } from "react";
import {
    Routes,

    Route, Link, useNavigate, useLocation

} from "react-router-dom";
// import styled from "styled-components";
//css
import AIHeaderNavbar from "./AIHeaderNavbar";

//pages
import MainPage from './pages/home/MainPage';
import LoginPage from "./pages/login/LoginPage";
import SignUpPage from "./pages/login/SignUpPage";
import PrivacyPolicyPage from "./pages/login/PrivacyPolicyPage";
import RedirectPage from "./pages/login/RedirectPage";

import RequestExpert from "./pages/expert/RequestExpert";
import HowToEdit from "./pages/expert/HowToEdit";

import AuthVerificationPage from "./pages/login/AuthVerificationPage";
import UserInfoPage from "./pages/login/UserInfoPage";

// 앨리스가 만든 페이지들
import AI_Main from "./pages/AI_Main";
import Mypage from './pages/Mypage';
import InfoPage from './pages/InfoPage';
import SubmitPage from './pages/SubmitPage';
import VideoChat from "./pages/VideoChat";
import AILayout from "./AILayout";

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
        switch (type) {
            case 'user': return '사용자';
            case 'pro': return '전문가';
            case 'admin': return '관리자';
            default: return '';
        }
    };

    return (



            <Routes>

                <Route path="/" element={<MainPage />} />

                {/*로그인 및 회원가입*/}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/auth" element={<RedirectPage />} />

                <Route path="/auth-verification-page" element={<AuthVerificationPage />} />
                <Route path="/user-info" element={<UserInfoPage />} />

                {/*전문가 첨삭*/}
                <Route path="/request-expert" element={<RequestExpert />} />
                <Route path="/how-to-edit" element={<HowToEdit />} />

                {/*ai 패이지*/}
                <Route path="/ai" element={<AILayout />}>
                    <Route index element={<AI_Main />} />
                    <Route path="info" element={<InfoPage />} />
                    <Route path="submit" element={<SubmitPage />} />
                    <Route path="mypage" element={<Mypage />} />
                    <Route path="video-chat" element={<VideoChat />} />
                </Route>
          </Routes>

  );
}

export default App;
