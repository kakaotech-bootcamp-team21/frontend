/* eslint-disable */ //warning 메세지 없애는 용도
import React, { useState, useRef } from 'react';
import { BellIcon, UserIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import '../../css_ai/AIMain.css';

function AI_Header() {
    return (
        <header className="header">
            <div className="icons">
                <Link to="/request-status">
                    <BellIcon className="icon" />
                </Link>    
                <Link to="/Mypage">
                    <UserIcon className="icon" />
                </Link>
            </div>
            <div to="/" className="nine">
                <h1>
                    <Link to="/" className="logo-link">자소서 첨삭서비스</Link>
                    <span>Personal statement editing system</span>
                </h1>
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
    const menus = ['전문가에게 첨삭 요청하기', 'AI 기반 자소서 첨삭하기', '합격 자소서 모아보기', '첨삭 요청 현황', '후기 작성'];

    const handleMenuMouseOver = (menu) => {
        setActive(menu);
        if (menu === 'AI 기반 자소서 첨삭하기' && menuRef.current) {
            setShowSubMenu('AI');
            updateSubmenuStyle(menuRef);
        } else if (menu === '전문가에게 첨삭 요청하기' && expertMenuRef.current) {
            // setShowSubMenu('expert');
            // updateSubmenuStyle(expertMenuRef);
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
            if (!document.querySelector('.ai-sub-menu:hover')) {
                setShowSubMenu('');
            }
        }, 100);
    };

    const handleMenuMouseClick = (menu) => {
        setActive(menu);
        if (menu === '전문가에게 첨삭 요청하기' && expertMenuRef.current) {
            setShowSubMenu('expert');
            updateSubmenuStyle(expertMenuRef);
        }
    };

    return (
        <nav className="ai-navbar">
            {menus.map((menu) => (
                menu === '합격 자소서 모아보기' ? (
                    <Link
                        key={menu}
                        to="/pass-list"
                        className={`ai-nav-button ${active === menu ? 'active' : ''}`}
                        onMouseOver={() => setActive(menu)}
                        onMouseOut={handleMenuMouseOut}
                    >
                        {menu}
                    </Link>
                ) : (
                    <Link
                        key={menu}
                        to={
                            menu === '전문가에게 첨삭 요청하기' ? "/request-expert" :
                            menu === '첨삭 요청 현황' ? "/request-status" :
                            menu === '후기 작성' ? "/write-review" :
                             "#"
                            } // 클릭 시 이동할 경로 지정
                        ref={menu === 'AI 기반 자소서 첨삭하기' ? menuRef : (menu === '전문가에게 첨삭 요청하기' ? expertMenuRef : null)}
                        className={`ai-nav-button ${active === menu ? 'active' : ''}`}
                        onClick={() => handleMenuMouseClick(menu)}
                        onMouseOver={() => handleMenuMouseOver(menu)}
                        onMouseOut={handleMenuMouseOut}
                    >
                        {menu}
                    </Link>
                )
            ))}
            {showSubMenu === 'AI' && (
                <div className="ai-sub-menu" style={subMenuStyle}>
                    <Link to="/info" className="ai-nav-button">주요 정보 입력</Link>
                    <Link to="/submit" className="ai-nav-button">자기소개서 제출</Link>
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