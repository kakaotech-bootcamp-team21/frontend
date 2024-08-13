import React, { useState, useEffect, useCallback, useMemo } from 'react';
import '../css_ai/PassList.css';

const PassList = () => {
  const essays = useMemo(() => [
    { id: 1, title: "합격자소서 1", content: "A 기업에 지원한 동기는 혁신적인 기술 개발에 대한 열정 때문입니다. 저는 학부 시절부터...", company: "A 기업 00직무"},
    { id: 2, title: "합격자소서 2", content: "B 회사의 글로벌 비즈니스 전략에 깊은 인상을 받았습니다. 특히 신흥 시장에서의...", company: "B 기업 00직무"},
    { id: 3, title: "합격자소서 3", content: "C 기업의 지속 가능한 발전 목표에 크게 공감합니다. 환경 보호와 사회적 책임을...", company: "C 기업 00직무"},
    { id: 4, title: "합격자소서 4", content: "D 그룹의 다양성과 포용성 정책은 제가 추구하는 가치와 일치합니다. 저는 다양한 배경의...", company: "D 기업 00직무"},
    { id: 5, title: "합격자소서 5", content: "E 주식회사의 혁신적인 제품 개발 과정에 참여하고 싶습니다. 저의 창의적인 문제 해결 능력을...", company: "E 기업 00직무"},
  ], []);

  const reviews = useMemo(() => [
    { review: "AI 시스템의 조언 덕분에 자기소개서의 핵심을 잘 표현할 수 있었습니다. 특히 경력 사항을 효과적으로 정리하는 데 큰 도움이 되었어요.",content: "소프트웨어 개발에 대한 저의 열정은 대학 시절 진행한 프로젝트에서 시작되었습니다. 복잡한 알고리즘을 최적화하여 성능을 50% 향상시킨 경험이 있습니다...", person: "김OO, A기업 소프트웨어 엔지니어" },
    { review: "첨삭 시스템을 통해 문장 구조와 어휘 선택을 개선할 수 있었습니다. 덕분에 더 명확하고 설득력 있는 자기소개서를 작성할 수 있었어요.", content: "디지털 마케팅 전략 수립 과정에서 데이터 분석의 중요성을 깨달았습니다. A/B 테스트를 통해 이메일 마케팅 캠페인의 오픈율을 30% 증가시킨 경험이 있습니다...", person: "이OO, C기업 마케팅 전문가" },
    { review: "AI의 객관적인 피드백 덕분에 자소서의 약점을 보완하고 강점을 부각시킬 수 있었습니다. 이 시스템 없이는 합격하기 힘들었을 거예요.",content: "재무 분석가로서 빅데이터를 활용한 예측 모델 개발에 참여했습니다. 이를 통해 회사의 연간 예산 책정의 정확도를 15% 개선했습니다...", person: "박OO, D기업 재무 분석가" },
    { review: "자기소개서 작성이 항상 어려웠는데, 이 시스템을 통해 구체적이고 설득력 있는 내용을 작성할 수 있었습니다. 정말 감사해요!", content: "다국적 기업에서의 인턴 경험을 통해 글로벌 인재 관리의 중요성을 체감했습니다. 문화적 다양성을 고려한 채용 전략을 제안하여 해외 인재 채용률을 20% 증가시켰습니다...", person: "최OO, B기업 인사 관리자" },
    { review: "AI의 조언을 바탕으로 자소서를 여러 번 수정했더니, 최종적으로 제가 원하는 회사에 합격할 수 있었습니다. 이 시스템 정말 추천해요!", content: "린(Lean) 생산 방식을 도입하여 생산 라인의 효율성을 개선한 프로젝트를 주도했습니다. 이를 통해 생산 비용을 10% 절감하고 품질 불량률을 5% 감소시켰습니다...", person: "정OO, A기업 생산 관리자" },
  ], []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  }, []);

  useEffect(() => {
    const interval = setInterval(handleNext, 5000); //일단 5초마다 자소서 넘어가도록 설정
    return () => clearInterval(interval); //메모리 누수 방지 = 컴포넌트 사라질 때 자동 슬라이드 기능 중지하는 역할!
  }, [handleNext]);

  const renderEssaySet = () => {
    const repeatedEssays = Array(100).fill(essays).flat(); 
    return (
      <div 
        className="carousel-track" 
        style={{ 
          transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
          transition: 'transform 0.5s ease-in-out'
        }}
      >
        {repeatedEssays.map((essay, index) => (
          <div key={`${essay.id}-${index}`} className="carousel-item">
            <div className="essay-card">
              <h2 className="essay-title">{essay.title}</h2>
              <p className="essay-company">{essay.company}</p>
              <p className="essay-preview">{essay.content.substring(0,50)}...</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="pass-essays-container">
      <h1 className="page-title">합격자소서 모아보기</h1>
      
      <div className="carousel-container">
        <button className="carousel-button carousel-button-prev" onClick={handlePrev}>&lt;</button>
        <div className="carousel">
          {renderEssaySet()}
        </div>
        <button className="carousel-button carousel-button-next" onClick={handleNext}>&gt;</button>
      </div>

      <div className="review-section">
        <h2 className="review-title">AI 기반 자소서 첨삭 리뷰</h2>
        <div className="review-list">
          {reviews.map((review, index) => (
            <div key={index} className="review-item">
              <blockquote className="review-quote">"{review.review}"</blockquote>
              <p className="essay-preview-in-review">{review.content.substring(0, 100)}...</p>
              <p className="review-author">- {review.person} -</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PassList;