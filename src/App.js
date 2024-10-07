import React, {useEffect, useState} from "react";
import {
    Routes,

    Route, Link, useNavigate, useLocation

} from "react-router-dom";
import styled from "styled-components";
//css
import AIHeaderNavbar from "./pages/ai/AIHeaderNavbar";

//pages
import MainPage2 from './pages/home/MainPage2';
import LoginPage from "./pages/login/LoginPage";
import SignUpPage from "./pages/login/SignUpPage";
import PrivacyPolicyPage from "./pages/login/PrivacyPolicyPage";
import RedirectPage from "./pages/login/RedirectPage";

import RequestExpert from "./pages/expert/RequestExpertPage";
import HowToEdit from "./pages/expert/HowToEditPage";
import ExpertInfoPage from "./pages/expert/ExpertInfoPage";
import ExpertSubmitPage from "./pages/expert/ExpertSubmitPage";


import AuthVerificationPage from "./pages/login/AuthVerificationPage";
import UserInfoPage from "./pages/login/UserInfoPage";
import {BellIcon, UserIcon} from '@heroicons/react/24/outline';

// 앨리스가 만든 페이지들
import AIMain from "./pages/ai/AIMain";
import Mypage from './pages/ai/Mypage';
import EditingList from "./pages/ai/EditingList";
import EditedList from "./pages/ai/EditedList";
import InfoPage from './pages/ai/InfoPage';
import SubmitPage from './pages/ai/SubmitPage';
import VideoChat from "./pages/ai/VideoChat";
import Chatroom from "./pages/ai/Chatroom";
import Chatting from "./pages/ai/Chatting";
import PassList from "./pages/ai/PassList";
import RequestStatusPage from "./pages/status/RequestStatusPage";

import WriteReviewPage from "./pages/expert/WriteReviewPage";
import MyReviews from "./pages/ai/MyReviews";


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

        console.log(localStorage.getItem('userType'));

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
            case 'user':
                return '사용자';
            case 'pro':
                return '전문가';
            case 'admin':
                return '관리자';
            default:
                return '';
        }
    };

    return (
        <div>
            <Routes>
                <Route path="/" element={<MainPage2 />} />

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
                <Route path="/expert-info" element={<ExpertInfoPage />} />
                <Route path="/expert-submit" element={<ExpertSubmitPage />} />

                {/*ai 패이지*/}

                {/*이 밑에 있는 페이지들은 return 문 들어가서 제일 처음에 <AIHeaderNavbar></AIHeaderNavbar> 컴포넌트를 집어넣음.(앨리스가 만든 상단바)*/}
                <Route path="/ai-main" element={<AIMain />} />
                    <Route path="/info" element={<InfoPage />} />
                    <Route path="/submit" element={<SubmitPage />} />
                    <Route path="/mypage" element={<Mypage />} />
                    <Route path="/my-reviews" element={<MyReviews />} />
                    <Route path="/editing-list" element={<EditingList />} />
                    <Route path="/edited-list" element={<EditedList />} />
                    <Route path="/pass-list" element={<PassList />} />
                    <Route path="/chatting" element={<Chatting />} />
                    <Route path="/chat-room" element={<Chatroom />} />
                    <Route path="/video-chat" element={<VideoChat />} />

                {/*첨삭 요청 현황*/}
                <Route path="/request-status" element={<RequestStatusPage />} />
                {/*첨삭 후기 작성*/}
                <Route path="/write-review" element={<WriteReviewPage />} />

          </Routes>
     </div>
  );
}

export default App;
