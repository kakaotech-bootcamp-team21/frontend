import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './MainNavbar.css';
import '../../App.css';
import Modal from 'react-bootstrap/Modal';  // 모달 창을 위한 임포트
import { Button as BootstrapButton } from 'react-bootstrap'; // 모달의 버튼을 위한 임포트

function AI_Navbar() {
    const [active, setActive] = useState('');
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [subMenuStyle, setSubMenuStyle] = useState({});
    const [showModal, setShowModal] = useState(false); // 모달 상태 추가
    const [timerId, setTimerId] = useState(null); // 타이머 ID를 저장

    const menuRef = useRef(null);
    const navigate = useNavigate();

    const menus = ['전문가에게 첨삭요청', 'AI 기반 자소서 첨삭하기', '합격자소서 모음집', '첨삭 요청 현황'];

    // 예시 userType을 로컬 스토리지에서 가져오기
    const userType = localStorage.getItem('userType');

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

    const handleMenuClick = (menu) => {
        // 특정 탭에 대해서만 로그인 여부 체크 (userType이 null일 경우 모달을 띄움)
        const requiresLogin = ['전문가에게 첨삭요청', 'AI 기반 자소서 첨삭하기', '첨삭 요청 현황'].includes(menu);

        if (userType === null && requiresLogin) {
            // 로그인이 필요할 때 모달을 띄우기
            setShowModal(true);
            const id = setTimeout(() => {
                setShowModal(false);
                navigate('/login'); // 3초 후 로그인 페이지로 이동
            }, 3000);
            setTimerId(id); // 타이머 ID 저장
        } else {
            // 로그인 상태이거나 로그인 불필요한 메뉴 클릭 시 페이지 이동
            if (menu === '전문가에게 첨삭요청') {
                navigate('/request-expert');
            } else if (menu === '합격자소서 모음집'){
                navigate('/pass-list');
            } else if (menu === '첨삭 요청 현황'){
                navigate('/request-status');
            }
        }
    };

    const subMenus = [
        { name: 'AI 자소서 답변 생성기', path: '/info' },
        { name: 'AI 자소서 첨삭기', path: '/submit' }
    ];

    const handleImmediateLoginRedirect = () => {
        if (timerId) {
            clearTimeout(timerId); // 타이머를 취소
        }
        setShowModal(false);
        navigate('/login'); // 모달 클릭 시 즉시 로그인 페이지로 이동
    };

    const handleSubMenuClick = (path) => {
        if (userType === null) {
            // 로그인이 필요할 때 모달을 띄우기
            setShowModal(true);
            const id = setTimeout(() => {
                setShowModal(false);
                navigate('/login'); // 3초 후 로그인 페이지로 이동
            }, 3000);
            setTimerId(id); // 타이머 ID 저장
        } else {
            // 로그인 상태라면 해당 서브메뉴 경로로 이동
            navigate(path);
        }
    };

    return (
        <>
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
                            <button
                                key={subMenu.name}
                                className="main-nav-bar-nav-button"
                                onClick={() => handleSubMenuClick(subMenu.path)}
                            >
                                {subMenu.name}
                            </button>
                        ))}
                    </div>
                )}
            </nav>

            {/* 모달 창 */}
            <Modal
                show={showModal}
                onHide={handleImmediateLoginRedirect} // 모달 외부 클릭 시 로그인 페이지로 이동
                backdrop={true} // 모달 외부 클릭 감지
                keyboard={true} // ESC 키로 닫기 가능
            >
                <Modal.Header closeButton>
                    <Modal.Title>로그인이 필요합니다</Modal.Title>
                </Modal.Header>
                <Modal.Body onClick={handleImmediateLoginRedirect}> {/* 모달 본문 클릭 시 로그인 페이지로 이동 */}
                    로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.
                </Modal.Body>
                <Modal.Footer>
                    <BootstrapButton
                        variant="secondary"
                        onClick={handleImmediateLoginRedirect} // 닫기 버튼 클릭 시 즉시 이동
                    >
                        닫기
                    </BootstrapButton>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AI_Navbar;
