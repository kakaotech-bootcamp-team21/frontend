import React, { useState, useRef, useEffect } from 'react';
import { BellIcon, UserIcon } from '@heroicons/react/24/outline'; 
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './AI_Main.css';
import InfoPage from './InfoPage';
import SubmitPage from './SubmitPage';
import Mypage from './Mypage';

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