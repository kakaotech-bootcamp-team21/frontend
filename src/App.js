import React, { useEffect, useState } from "react";
import {
    Routes,

    Route, Link, useNavigate, useLocation

} from "react-router-dom";
// import styled from "styled-components";
//css
// import AIHeaderNavbar from "./Pages/ai/AIHeaderNavbar";

//Pages
import MainPage from './Pages/home/MainPage';
import LoginPage from "./Pages/login/LoginPage";
import SignUpPage from "./Pages/login/SignUpPage";
import PrivacyPolicyPage from "./Pages/login/PrivacyPolicyPage";
import RedirectPage from "./Pages/login/RedirectPage";

import RequestExpert from "./Pages/expert/RequestExpert";
import HowToEdit from "./Pages/expert/HowToEdit";

import AuthVerificationPage from "./Pages/login/AuthVerificationPage";
import UserInfoPage from "./Pages/login/UserInfoPage";

// 앨리스가 만든 페이지들
import AI_Main from "./Pages/ai/AI_Main";
import Mypage from './Pages/ai/Mypage';
import InfoPage from './Pages/ai/InfoPage';
import SubmitPage from './Pages/ai/SubmitPage';
import VideoChat from "./Pages/ai/VideoChat";
// import AILayout from "./Pages/ai/AILayout";
import Chatroom from "./Pages/ai/Chatroom";
import Chatting from "./Pages/ai/Chatting";
import PassList from "./Pages/ai/PassList";

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

                {/*이 밑에 있는 페이지들은 return 문 들어가서 제일 처음에 <AIHeaderNavbar></AIHeaderNavbar> 컴포넌트를 집어넣음.(앨리스가 만든 상단바)*/}
                <Route path="ai-main" element={<AI_Main />} />
                    <Route path="info" element={<InfoPage />} />

                    <Route path="submit" element={<SubmitPage />} />
                    <Route path="Mypage" element={<Mypage />} />
                    <Route path="PassList" element={<PassList />} />
                    <Route path="Chatting" element={<Chatting />} />
                    <Route path="Chatroom" element={<Chatroom />} />
                    <Route path="video-chat" element={<VideoChat />} />

          </Routes>

  );
}

export default App;
