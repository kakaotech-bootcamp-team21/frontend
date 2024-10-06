import React, { useState, useEffect, useCallback, useMemo } from 'react';
import '../../css_ai/PassList.css';
import { sampleEssays } from './sampleEssayData';
import AIHeaderNavbar from "./AIHeaderNavbar";

const PassList = () => {
  const essays = useMemo(() => sampleEssays, []);

  const reviews = useMemo(() => [
    { revie: "AI 시스템의 조언 덕분에 자기소개서의 핵심을 잘 표현할 수 있었습니다. 특히 경력 사항을 효과적으로 정리하는 데 큰 도움이 되었어요.",content: "소프트웨어 개발에 대한 저의 열정은 대학 시절 진행한 프로젝트에서 시작되었습니다. 복잡한 알고리즘을 최적화하여 성능을 50% 향상시킨 경험이 있습니다...", person: "김OO, A기업 소프트웨어 엔지니어" },
    { revie: "첨삭 시스템을 통해 문장 구조와 어휘 선택을 개선할 수 있었습니다. 덕분에 더 명확하고 설득력 있는 자기소개서를 작성할 수 있었어요.", content: "디지털 마케팅 전략 수립 과정에서 데이터 분석의 중요성을 깨달았습니다. A/B 테스트를 통해 이메일 마케팅 캠페인의 오픈율을 30% 증가시킨 경험이 있습니다...", person: "이OO, C기업 마케팅 전문가" },
    { revie: "AI의 객관적인 피드백 덕분에 자소서의 약점을 보완하고 강점을 부각시킬 수 있었습니다. 이 시스템 없이는 합격하기 힘들었을 거예요.",content: "재무 분석가로서 빅데이터를 활용한 예측 모델 개발에 참여했습니다. 이를 통해 회사의 연간 예산 책정의 정확도를 15% 개선했습니다...", person: "박OO, D기업 재무 분석가" },
    { revie: "자기소개서 작성이 항상 어려웠는데, 이 시스템을 통해 구체적이고 설득력 있는 내용을 작성할 수 있었습니다. 정말 감사해요!", content: "다국적 기업에서의 인턴 경험을 통해 글로벌 인재 관리의 중요성을 체감했습니다. 문화적 다양성을 고려한 채용 전략을 제안하여 해외 인재 채용률을 20% 증가시켰습니다...", person: "최OO, B기업 인사 관리자" },
    { revie: "AI의 조언을 바탕으로 자소서를 여러 번 수정했더니, 최종적으로 제가 원하는 회사에 합격할 수 있었습니다. 이 시스템 정말 추천해요!", content: "린(Lean) 생산 방식을 도입하여 생산 라인의 효율성을 개선한 프로젝트를 주도했습니다. 이를 통해 생산 비용을 10% 절감하고 품질 불량률을 5% 감소시켰습니다...", person: "정OO, A기업 생산 관리자" },
  ], []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const [selectedEssay, setSelectedEssay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  }, []);
  
  const handleEssayClick = useCallback((essay) => {
    setSelectedEssay(essay);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(()=> {
    setIsModalOpen(false);
    setSelectedEssay(null);
  }, []);

  useEffect(() => {
    const interval = setInterval(handleNext, 5000); //일단 5초마다 자소서 넘어가도록 설정
    return () => clearInterval(interval); //메모리 누수 방지 = 컴포넌트 사라질 때 자동 슬라이드 기능 중지하는 역할!
  }, [handleNext]);

  const renderEssaySet = () => {
    const repeatedEssays = Array(100).fill(essays).flat(); 
    return (
      <div 
        className="passlist-carousel-track" 
        style={{ 
          transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
          transition: 'transform 0.5s ease-in-out'
        }}
      >
        {repeatedEssays.map((essay, index) => (
          <div key={`${essay.id}-${index}`} className="passlist-carousel-item">
            <div className="passlist-essay-card">
              <h2 className="passlist-essay-title">{essay.title}</h2>
              <p className="passlist-essay-company">{essay.company}</p>
              <p className="passlist-essay-preview">{essay.content.substring(0,50)}...</p>
              <button className ="passlist-read-more-btn" onClick={() => handleEssayClick(essay)}>자세히보기</button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const Modal = ({ essay, onClose }) => {
    if (!essay) return null;
    return (
      <div className="passlist-modal-overlay" onClick={onClose}>
        <div className="passlist-modal-content" onClick={(e) => e.stopPropagation()}>
          <h2 className="passlist-modal-title">{essay.title}</h2>
          <p className="passlist-modal-company"><strong>{essay.company}</strong></p>
          <div className="passlist-modal-essay-content">
            {essay.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <button className="passlist-modal-close-btn" onClick={onClose}>닫기</button>
        </div>
      </div>
    );
  };

  return (
      <div>
    <div className="passlist-essays-container">
      <h1 className="passlist-page-title">합격자소서 모아보기</h1>
      
      <div className="passlist-carousel-container">
        <button className="passlist-carousel-button passlist-carousel-button-prev" onClick={handlePrev}>&lt;</button>
        <div className="passlist-carousel">
          {renderEssaySet()}
        </div>
        <button className="passlist-carousel-button passlist-carousel-button-next" onClick={handleNext}>&gt;</button>
      </div>

      <div className="passlist-review-section">
        <h2 className="passlist-review-title">AI 기반 자소서 첨삭 리뷰</h2>
        <div className="passlist-review-list">
          {reviews.map((review, index) => (
            <div key={index} className="passlist-review-item">
              <blockquote className="passlist-review-quote">"{review.revie}"</blockquote>
              <p className="passlist-essay-preview-in-review">{review.content.substring(0, 100)}...</p>
              <p className="passlist-review-author">- {review.person} -</p>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && <Modal essay={selectedEssay} onClose={closeModal} />}
    </div>
      </div>
  );
};

export default PassList;