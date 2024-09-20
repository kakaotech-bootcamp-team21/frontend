import React, { useState, useRef, useEffect } from 'react';
import { BellIcon, UserIcon, HomeIcon } from '@heroicons/react/24/outline';
import {BrowserRouter as Router, Route, Routes, Link, useNavigate} from 'react-router-dom';
import '../../App.css';
import InfoPage from '../../pages/ai/InfoPage';
import SubmitPage from '../../pages/ai/SubmitPage';
import Mypage from '../../pages/ai/Mypage';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none; /* 밑줄 제거 */
  color: inherit;

  &:visited {
    text-decoration: none; /* 방문한 후에도 밑줄 제거 */
  }

  &:hover {
    text-decoration: none; /* 마우스를 올렸을 때도 밑줄 제거 */
  }

  &:focus {
    text-decoration: none; /* 포커스(클릭) 시에도 밑줄 제거 */
  }
`;

function AI_Header() {

    const [userType, setUserType] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserType = localStorage.getItem('userType');
        setUserType(storedUserType);
    }, []);

    const handleUserIconClick = (e) => {
        if (userType === null) {
            // userType이 null이면 로그인 페이지로 이동
            e.preventDefault(); // 기본 링크 동작 막기
            navigate('/login');
        }
        // userType이 있으면 기본 동작(마이페이지로 이동) 수행
    };


    return (
        <header className="header">
            <div className="icons">
                <Link to="/">
                    <HomeIcon className="icon"/>
                </Link>
                <BellIcon className="icon"/>
                {/* UserIcon을 클릭할 때 onClick 이벤트 발생 */}
                <Link to="/mypage" onClick={handleUserIconClick}>
                    <UserIcon className="icon"/>
                </Link>
            </div>

            <div className="nine">
                <StyledLink to="/">
                    <h1>
                        Cover Letter<span>Personal statement editing system</span>
                    </h1>
                </StyledLink>
            </div>
        </header>

    );
}

export default AI_Header;