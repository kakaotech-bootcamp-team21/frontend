import React, { useState, useEffect } from 'react';
import '../../css_ai/InfoPage.css';
import AIHeaderNavbar from "./AIHeaderNavbar";

function InfoPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [infopageformData, setinfopageFormData] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    additionalQuestions: [{ question: "", answer: "" }],
    portfolio: null
  });
  
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("infopageformData"));
    if (savedData) {
      setinfopageFormData(savedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("infopageformData", JSON.stringify(infopageformData));
  }, [infopageformData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setinfopageFormData(prev => ({
      ...prev,
      [name]: value
    }));
    event.target.style.height = 'inherit';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleAdditionalQuestionChange = (index, field, value) => {
    setinfopageFormData(prev => ({
      ...prev,
      additionalQuestions: prev.additionalQuestions.map((q, i) => 
        i === index ? { ...q, [field]: value } : q
      )
    }));
  };

  const handleAddQuestion = () => {
    setinfopageFormData(prev => ({
      ...prev,
      additionalQuestions: [...prev.additionalQuestions, { question: "", answer: "" }]
    }));
  };
  
  const handleRemoveQuestion = (index) => {
    if (infopageformData.additionalQuestions.length > 1) {
      setinfopageFormData(prev => ({
        ...prev,
        additionalQuestions: prev.additionalQuestions.filter((_, i) => i !== index)
      }));
    }
  }

  const handleSaveDraft = () => {
    console.log("임시 저장 데이터", infopageformData);
    alert("임시 저장되었습니다.");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const confirmSubmit = window.confirm("제출하시겠습니까? 한번 제출 할 경우, 수정이 불가합니다.");
    if (confirmSubmit) {
      console.log("폼 데이터 제출", infopageformData);
      localStorage.removeItem("infopageformData");
      setFormSubmitted(true);
    }
  }

  return (
    <div>
      
      <div className="infopage-container">
        <h1 className="infopage-title">주요 정보 입력하기</h1>
        <p className="infopage-alert-message">**모든 질문에 최대한 상세하게 답변해주세요.**</p>
        <form onSubmit={handleSubmit}>
          {["q1", "q2", "q3", "q4", "q5"].map((question, index) => (
            <div className="infopage-form-field" key={index}>
              <label htmlFor={question}>스펙(또는 기업)에 대한 질문{index + 1}:</label>
              <textarea
                id={question}
                name={question}
                value={infopageformData[question]}
                onChange={handleInputChange}
                required
                placeholder="여기에 답변을 입력하세요."
              />
            </div>
          ))}

          <h2 className="infopage-additional-title">**기업 자기소개서 문항별 질문 입력하기**</h2>
          {infopageformData.additionalQuestions.map((item, index) => (
            <div key={index} className="infopage-question-wrapper">
              <div className="infopage-form-field">
                <input
                  type="text"
                  value={item.question}
                  onChange={(e) => handleAdditionalQuestionChange(index, 'question', e.target.value)}
                  placeholder={`추가 질문 ${index + 1}`}
                  required
                />
                {/* <textarea
                  value={item.answer}
                  onChange={(e) => handleAdditionalQuestionChange(index, 'answer', e.target.value)}
                  placeholder="여기에 답변을 입력하세요."
                  required
                /> */}
              </div>
              {infopageformData.additionalQuestions.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveQuestion(index)}
                className="infopage-remove-button"
              >
                항목 삭제
              </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddQuestion} className="infopage-add-button">항목 추가</button>
          
          <p className="infopage-portfolio-text">포트폴리오(선택):</p>
          <div className="infopage-portfolio-field">
            <input 
              type="file" 
              id="infopage-portfolio" 
              name="portfolio" 
              onChange={(e) => setinfopageFormData(prev => ({ ...prev, portfolio: e.target.files[0] }))}
            />
          </div>

          <div className="infopage-buttons">
            <button type="button" className="infopage-save-button" onClick={handleSaveDraft}>임시 저장</button>
            <button type="submit" className="infopage-submit-button">제출</button>
          </div>
        </form>
        {formSubmitted && <p>정보가 성공적으로 제출되었습니다!</p>}
      </div>
    </div>
  );
}

export default InfoPage;