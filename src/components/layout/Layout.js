import React from 'react';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <NavBar />
      <div>
        <Outlet /> {/* Outlet은 라우팅된 컴포넌트를 렌더링하는 자리 */}
      </div>
    </>
  );
};

export default Layout;
