/* eslint-disable */ //warning 메세지 없애는 용도
import React, { useState, useRef, useEffect } from 'react';
import { BellIcon, UserIcon, HomeIcon } from '@heroicons/react/24/outline';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './AI_Main.css';
import InfoPage from './InfoPage';
import SubmitPage from './SubmitPage';
import Mypage from './Mypage';
// 마이페이지나 추후 만들 페이지에서도 컴포넌트만 재활용하면 상단바를 쉽게 만들수 있음
// 컴포넌트 재사용할것 밑에 주석 지워보면 코드가 엄청 깔끔해지는 것을 알수 있다.
import AI_Header from '../components/headers/Header'
import AI_Navbar from '../components/navbars/AiNavbar'
//
// function AI_Header() {
//   return (
//     <header className="header">
//       <div className="icons">
//           <Link to="/">
//               <HomeIcon className="icon" />
//           </Link>
//               <BellIcon className="icon" />
//         <Link to="/Mypage">
//           <UserIcon className="icon" />
//         </Link>
//       </div>
//       <div class="nine">
//         <h1>Logo<span>Personal statement editing system</span></h1>
//       </div>
//     </header>
//   );
// }
//
// function AI_Navbar() {
//   const [active, setActive] = useState('');
//   const [showSubMenu, setShowSubMenu] = useState(false);
//   const [subMenuStyle, setSubMenuStyle] = useState({});
//   const menuRef = useRef(null);  // 메인 메뉴 아이템에 대한 ref
//
//   const menus = ['메뉴1', 'AI 기반 자소서 첨삭하기', '메뉴3', '메뉴4', '메뉴5', '메뉴6'];
//
//   const handleMenuMouseOver = (menu) => {
//     setActive(menu);
//     if (menu === 'AI 기반 자소서 첨삭하기' && menuRef.current) {
//         setShowSubMenu(true);
//         const rect = menuRef.current.getBoundingClientRect();
//         setSubMenuStyle({
//             top: `${rect.bottom}px`,
//             left: `${rect.left}px`,
//             width: `${rect.width}px`
//         });
//     } else {
//         setShowSubMenu(false);
//     }
// };
//
//   const handleMenuMouseOut = () => {
//     setShowSubMenu(false);
//   };
//   const handleSubMenuMouseOver = () => {
//     setShowSubMenu(true);
//   };
//
//   const handleSubMenuMouseOut = () => {
//     setShowSubMenu(false);
//   };
//
//   const subMenus = [
//     { name: '주요 정보 입력', path: '/info' },
//     { name: '자기소개서 제출', path: '/submit' }
//   ];
//
//   return (
//     <nav className="navbar">
//       {menus.map((menu, index) => (
//         <button
//           key={menu}
//           ref={menu === 'AI 기반 자소서 첨삭하기' ? menuRef : null}
//           className={`nav-button ${active === menu ? 'active' : ''}`}
//           onMouseOver={() => handleMenuMouseOver(menu)}
//           onMouseOut={handleMenuMouseOut}
//         >
//           {menu}
//         </button>
//       ))}
//       {showSubMenu && (
//         <div className="sub-menu" style={subMenuStyle} onMouseOver={handleSubMenuMouseOver} onMouseOut={handleSubMenuMouseOut}>
//           {subMenus.map(subMenu => (
//             <Link to={subMenu.path} key={subMenu.name} className="nav-button">
//               {subMenu.name}
//             </Link>
//           ))}
//         </div>
//       )}
//     </nav>
//   );
// }

function AI_Main() {
  return (
      <div>
        <AI_Header/>
        <AI_Navbar/>
        <Routes> 
          <Route path="/info" element={<InfoPage />} />
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/Mypage" element={<Mypage />} />
        </Routes>
      </div>

  );
}

export default AI_Main;