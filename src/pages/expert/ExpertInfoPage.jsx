import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import './ExpertInfoPage.css';
import { notification } from 'antd';
function ExpertInfoPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    portfolio: null
  });

  const navigate = useNavigate();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formData"));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    event.target.style.height = 'inherit';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleSaveDraft = () => {
    console.log("임시 저장 데이터", formData);
    alert("임시 저장되었습니다.");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const confirmSubmit = window.confirm("제출하시겠습니까? 한번 제출 할 경우, 수정이 불가합니다.");
    if (confirmSubmit) {
      console.log("폼 데이터 제출", formData);
      localStorage.removeItem("formData");
      setFormSubmitted(true);
    }
  }



  return (
    <div className="container">
      <h1>주요 정보 입력하기</h1>
      <p className="alert-message">**모든 질문에 최대한 상세하게 답변해주세요.**</p>
      <form onSubmit={handleSubmit}>
        {["q1", "q2", "q3", "q4", "q5"].map((question, index) => (
          <div className="form-field" key={index}>
            <label htmlFor={question}>스펙(또는 기업)에 대한 질문{index + 1}:</label>
            <textarea
              id={question}
              name={question}
              value={formData[question]}
              onChange={handleInputChange}
              required
              placeholder="여기에 답변을 입력하세요."
            />
          </div>
        ))}
        <p className="portfolio-text">포트폴리오(선택):</p>
        <div className="portfolio-field">
          <input type="file" id="portfolio" name="portfolio" onChange={handleInputChange} />
        </div>

        <div className="buttons">
          <button type="button" className="save-button" onClick={handleSaveDraft}>임시 저장</button>
          <button type="button" className="submit-button" onClick={handleSubmit} >제출</button>
        </div>
      </form>
      {formSubmitted &&
        notification.success({
          message: '정보가 성공적으로 제출되었습니다!',
          placement: 'topRight',
          duration: 5,
        })
      }
      {formSubmitted && navigate("/")}
    </div>
  );
}

export default ExpertInfoPage;