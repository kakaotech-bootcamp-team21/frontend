import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import './ExpertInfoPage.css';
import { notification } from 'antd';
import AIHeaderNavbar from "../ai/AIHeaderNavbar";
function ChattingPage() {




  return (
    <>
      <AIHeaderNavbar></AIHeaderNavbar>
      <div className="container">
        <h1>채팅하기</h1>
        
      </div>
    </>
  );
}

export default ChattingPage;