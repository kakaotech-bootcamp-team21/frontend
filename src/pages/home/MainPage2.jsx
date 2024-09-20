import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css_ai/Chatting.css';
import chatImage1 from '../../img/chat_img1.png';
import chatImage2 from '../../img/chat_img2.png';
import Chatroom from '../ai/Chatroom';
import AIHeaderNavbar from "../ai/AIHeaderNavbar";
import MainPage from './MainPage';

const MainPage2 = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  return (
      <div>
        <AIHeaderNavbar></AIHeaderNavbar>
    <div className="chatting-container">
    <div className="chatting-info">
        <h1 className="chatting-title">AI기반 자소서 첨삭</h1>
        <p className="chatting-description">
        AI기반 자소서 첨삭 기능을 통해 맞춤형 답변을 생성하거나, 맞춤법과 문법을 교정해 보세요.  <br />
        AI기반 자소서 첨삭 서비스는 지원자의 질문과 기본 정보를 입력하면, 이를 기반으로 최적화된 자소서 답변을 자동으로 생성해줍니다. 또한, 이미 작성된 자소서를 입력하면, AI가 맞춤법과 문법을 교정하고 문장 흐름을 개선하여 더 완성도 높은 글로 다듬어줍니다. 우리의 AI는 다양한 산업 분야의 채용 과정과 기업의 요구사항을 반영하여, 각 직무에 맞는 맞춤형 자소서를 작성할 수 있도록 돕습니다. 이 서비스는 특히 시간이 부족한 지원자나, 자소서를 처음 작성하는 사람들에게 유용하며, 실시간으로 빠른 피드백을 제공하여 효율적인 자소서 작성 과정을 지원합니다. 
        </p>
        <ul className="chatting-benefits">
          <li>질문 입력과 기본 정보를 통해 맞춤형 자소서 답변 생성</li>
          <li>작성된 자소서의 맞춤법, 문법, 문장 흐름 교정</li>
        </ul>
        <Link to="../info" className="chatting-chat-button">
          AI 첨삭하기 →
        </Link>
      </div>
      <div className="chatting-info">
        <h1 className="chatting-title">전문가에게 첨삭요청</h1>
        <p className="chatting-description">
          실시간으로 전문가와 소통하며 자기소개서를 첨삭받아보세요. <br />
          즉각적인 피드백과 맞춤형 조언을 받을 수 있습니다.
          우리의 전문가들은 다양한 산업 분야와 기업의 채용 과정에 대한 
          풍부한 경험을 보유하고 있어, 채용 담당자의 시선에서 자기소개서를 
          검토받을 수 있습니다. 실시간 채팅을 통해 지원하는 기업과 직무에 
          최적화된 자기소개서를 작성할 수 있도록 도와드립니다. 
        </p>
        <ul className="chatting-benefits">
          <li>실시간 대화로 빠른 피드백</li>
          <li>전문가의 개인화된 조언</li>
          <li>질문과 답변을 통한 깊이 있는 개선</li>
        </ul>
        <Link to="../chat-room" className="chatting-chat-button">
          채팅하기 →
        </Link>
      </div>
      <div className={`chatting-chat-examples ${showAnimation ? 'show' : ''}`}>
        <img src={chatImage1} alt="Chat Example 1" className="chatting-chat-img1" />
        <img src={chatImage2} alt="Chat Example 2" className="chatting-chat-img2" />
      </div>
    </div>
      </div>
  );
};

export default MainPage2;