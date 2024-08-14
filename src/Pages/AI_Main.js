/* eslint-disable */ //warning 메세지 없애는 용도
import React, { useState, useRef, useEffect } from 'react';
import { BellIcon, UserIcon } from '@heroicons/react/24/outline'; 
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '../css_ai/AI_Main.css';
import InfoPage from './InfoPage';
import SubmitPage from './SubmitPage';
import Mypage from './Mypage';
import PassList from './PassList';
import Chatting from './Chatting';
import Chatroom from './Chatroom';

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
    // setShowSubMenu(false);
    setTimeout(() => {
      if (!document.querySelector('.sub-menu:hover')) {
        setShowSubMenu('');
      }
    }, 100);
  };

  const handleSubMenuMouseOver = () => {
    // setShowSubMenu(true);
  };

  const handleSubMenuMouseOut = () => {
    // setShowSubMenu(false);
    setTimeout(() => {
      if (!document.querySelector('.nav-button:hover')) {
        setShowSubMenu('');
      }
    }, 100);
  };

  const aisubMenus = [
    { name: '주요 정보 입력', path: '/info' },
    { name: '자기소개서 제출', path: '/submit' }
  ];
  
  const editsubMenus = [
    { name: '게시글', path: '/post' },
    { name: '채팅', path: '/Chatting' },
    { name: '영상 통화', path: '/video' }
  ];

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
        <div className="sub-menu" style={subMenuStyle} onMouseOver={handleSubMenuMouseOver} onMouseOut={handleSubMenuMouseOut}>
          {aisubMenus.map(subMenu => (
            <Link to={subMenu.path} key={subMenu.name} className="nav-button">
              {subMenu.name}
            </Link>
          ))}
        </div>
      )}
      {showSubMenu === 'expert' && (
        <div className="sub-menu" style={subMenuStyle} onMouseOver={handleSubMenuMouseOver} onMouseOut={handleSubMenuMouseOut}>
          {editsubMenus.map(subMenu => (
            <Link to={subMenu.path} key={subMenu.name} className="nav-button">
              {subMenu.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <AI_Header />
        <AI_Navbar />
        <Routes> 
          <Route path="/info" element={<InfoPage />} />
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/Mypage" element={<Mypage />} />
          <Route path="/PassList" element={<PassList />} />
          <Route path="/Chatting" element={<Chatting />} />
          <Route path="/Chatroom" element={<Chatroom />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;