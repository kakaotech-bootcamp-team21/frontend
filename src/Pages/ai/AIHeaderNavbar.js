/* eslint-disable */ //warning 메세지 없애는 용도
import React, { useState, useRef } from 'react';
import { BellIcon, UserIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import '../../css_ai/AI_Main.css';

function AI_Header() {
    return (
        <header className="header">
            <div className="icons">
                <BellIcon className="icon" />
                <Link to="/Mypage">
                    <UserIcon className="icon" />
                </Link>
            </div>
            <div class="nine">
                <h1>Logo<span>Personal statement editing system</span></h1>
            </div>
        </header>
    );
}

function AI_Navbar() {
    const [active, setActive] = useState('');
    const [showSubMenu, setShowSubMenu] = useState('');
    const [subMenuStyle, setSubMenuStyle] = useState({});
    const menuRef = useRef(null);
    const expertMenuRef = useRef(null);
    const menus = ['전문가에게 첨삭 요청하기', 'AI 기반 자소서 첨삭하기', '합격 자소서 모아보기', '메뉴4', '메뉴5', '메뉴6'];

    const handleMenuMouseOver = (menu) => {
        setActive(menu);
        if (menu === 'AI 기반 자소서 첨삭하기' && menuRef.current) {
            setShowSubMenu('AI');
            updateSubmenuStyle(menuRef);
        } else if (menu === '전문가에게 첨삭 요청하기' && expertMenuRef.current) {
            setShowSubMenu('expert');
            updateSubmenuStyle(expertMenuRef);
        }
    };

    const updateSubmenuStyle=(ref)=>{
        const rect = ref.current.getBoundingClientRect();
        setSubMenuStyle({
            top: `${rect.bottom}px`,
            left: `${rect.left}px`,
            width: `${rect.width}px`
        });
    };

    const handleMenuMouseOut = () => {
        setTimeout(() => {
            if (!document.querySelector('.sub-menu:hover')) {
                setShowSubMenu('');
            }
        }, 100);
    };

    return (
        <nav className="navbar">
            {menus.map((menu) => (
                menu === '합격 자소서 모아보기' ? (
                    <Link
                        key={menu}
                        to="/PassList"
                        className={`nav-button ${active === menu ? 'active' : ''}`}
                        onMouseOver={() => setActive(menu)}
                        onMouseOut={handleMenuMouseOut}
                    >
                        {menu}
                    </Link>
                ) : (
                    <button
                        key={menu}
                        ref={menu === 'AI 기반 자소서 첨삭하기' ? menuRef : (menu === '전문가에게 첨삭 요청하기' ? expertMenuRef : null)}
                        className={`nav-button ${active === menu ? 'active' : ''}`}
                        onMouseOver={() => handleMenuMouseOver(menu)}
                        onMouseOut={handleMenuMouseOut}
                    >
                        {menu}
                    </button>
                )
            ))}
            {showSubMenu === 'AI' && (
                <div className="sub-menu" style={subMenuStyle}>
                    <Link to="/info" className="nav-button">주요 정보 입력</Link>
                    <Link to="/submit" className="nav-button">자기소개서 제출</Link>
                </div>
            )}
            {showSubMenu === 'expert' && (
                <div className="sub-menu" style={subMenuStyle}>
                    <Link to="/post" className="nav-button">게시글</Link>
                    <Link to="/Chatting" className="nav-button">채팅</Link>
                    <Link to="/video-chat" className="nav-button">영상 통화</Link>
                </div>
            )}
        </nav>
    );
}

function AIHeaderNavbar() {
    return (
        <div className="App">
            <AI_Header />
            <AI_Navbar />
        </div>
    );
}

export default AIHeaderNavbar;