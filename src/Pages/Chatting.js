import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css_ai/Chatting.css';
import chatImage1 from '../img/chat_img1.png'; 
import chatImage2 from '../img/chat_img2.png'; 
import Chatroom from '../Pages/Chatroom';

const Chatting = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  return (
    <div className="chatting-container">
      <div className="chatting-info">
        <h1 className="chatting-title">전문가에게 첨삭요청하기(채팅)</h1>
        <p className="description">
          실시간으로 전문가와 소통하며 자기소개서를 첨삭받아보세요. <br />
          즉각적인 피드백과 맞춤형 조언을 받을 수 있습니다.
          우리의 전문가들은 다양한 산업 분야와 기업의 채용 과정에 대한 
          풍부한 경험을 보유하고 있어, 채용 담당자의 시선에서 자기소개서를 
          검토받을 수 있습니다. 실시간 채팅을 통해 지원하는 기업과 직무에 
          최적화된 자기소개서를 작성할 수 있도록 도와드립니다. 
        </p>
        <ul className="benefits">
          <li>실시간 대화로 빠른 피드백</li>
          <li>전문가의 개인화된 조언</li>
          <li>질문과 답변을 통한 깊이 있는 개선</li>
        </ul>
        <Link to="../Chatroom" className="chat-button">
          채팅하기 →
        </Link>
      </div>
      <div className={`chat-examples ${showAnimation ? 'show' : ''}`}>
        <img src={chatImage1} alt="Chat Example 1" className="chat-img1" />
        <img src={chatImage2} alt="Chat Example 2" className="chat-img2" />
      </div>
    </div>
  );
};

export default Chatting;