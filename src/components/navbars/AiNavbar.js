import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './MainNavbar.css'
import '../../App.css';
import InfoPage from '../../pages/ai/InfoPage';
import SubmitPage from '../../pages/ai/SubmitPage';
import Mypage from '../../pages/ai/Mypage';

import { useNavigate } from "react-router-dom";

function AI_Navbar() {
    const [active, setActive] = useState('');
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [subMenuStyle, setSubMenuStyle] = useState({});
    const menuRef = useRef(null);

    const menus = ['전문가에게 첨삭요청', 'AI 기반 자소서 첨삭하기', '합격자소서 모음집', '첨삭 요청 현황'];

    const handleMenuMouseOver = (menu) => {
        setActive(menu);
        if (menu === 'AI 기반 자소서 첨삭하기' && menuRef.current) {
            setShowSubMenu(true);
            const rect = menuRef.current.getBoundingClientRect();
            setSubMenuStyle({
                top: `${rect.bottom}px`,
                left: `${rect.left}px`,
                width: `${rect.width}px`
            });
        } else {
            setShowSubMenu(false);
        }
    };

    const handleMenuMouseOut = () => {
        setShowSubMenu(false);
    };
    const handleSubMenuMouseOver = () => {
        setShowSubMenu(true);
    };

    const handleSubMenuMouseOut = () => {
        setShowSubMenu(false);
    };

    const navigate = useNavigate();

    const handleMenuClick = (menu) => {
        if (menu === '전문가에게 첨삭요청') {
            navigate('/request-expert');
        } else if (menu === '합격자소서 모음집'){
            // 해당 페이지로 이동하는 로직 추가
        } else if (menu === '첨삭 요청 현황'){
            navigate('/request-status');
        }
    }

    const subMenus = [
        { name: '주요 정보 입력', path: '/info' },
        { name: '자기소개서 제출', path: '/submit' }
    ];

    return (
        <nav className="main-nav-bar-navbar">
            {menus.map((menu, index) => (
                <button
                    key={menu}
                    ref={menu === 'AI 기반 자소서 첨삭하기' ? menuRef : null}
                    className={`main-nav-bar-nav-button ${active === menu ? 'active' : ''}`}
                    onMouseOver={() => handleMenuMouseOver(menu)}
                    onMouseOut={handleMenuMouseOut}
                    onClick={() => handleMenuClick(menu)}
                >
                    {menu}
                </button>
            ))}
            {showSubMenu && (
                <div className="main-nav-bar-sub-menu" style={subMenuStyle} onMouseOver={handleSubMenuMouseOver} onMouseOut={handleSubMenuMouseOut}>
                    {subMenus.map(subMenu => (
                        <Link to={subMenu.path} key={subMenu.name} className="main-nav-bar-nav-button">
                            {subMenu.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}

export default AI_Navbar;