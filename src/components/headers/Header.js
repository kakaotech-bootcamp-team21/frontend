import React, { useState, useRef, useEffect } from 'react';
import { BellIcon, UserIcon, HomeIcon } from '@heroicons/react/24/outline';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import '../../App.css';
import InfoPage from '../../pages/InfoPage';
import SubmitPage from '../../pages/SubmitPage';
import Mypage from '../../pages/Mypage';


function AI_Header() {
    return (
      <header className="header">
        <div className="icons">
            <Link to="/">
                <HomeIcon className="icon" />
            </Link>
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
  export default AI_Header;