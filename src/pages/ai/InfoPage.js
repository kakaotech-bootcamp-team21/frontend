import React, { useState, useEffect } from 'react';
import '../../css_ai/InfoPage.css';
import AIHeaderNavbar from "./AIHeaderNavbar";
import { Input, Flex, Button, Form } from 'antd';
import { Card, Space } from 'antd';

import styled from "styled-components";
const Row = styled.div`
    display: flex;
    align-items: center; /* 수직 가운데 정렬 */
    justify-content: space-between; /* 필요에 따라 공간을 조절 */
    gap: 16px; /* 요소 사이의 간격 조절 */
    margin-top: 25px;
    margin-bottom: 25px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end; /* 버튼을 오른쪽으로 정렬 */
`;


function InfoPage() {

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [items, setItems] = useState([{ id: 1, numberOfCharacters: 500, question: '', content: '' }]); // 기본적으로 하나의 항목을 포함함 

  const [infopageformData, setinfopageFormData] = useState({
    q1: "기업명",
    q2: "직무명",
    q3: "직무 세부 정보",
    q4: "이수 교과목",
    q5: "자격증",
    q6: "직무 관련 수상 경력",
    q7: "대내외 활동(프로젝트 경험)",
    q8: "가치관",
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



  const { TextArea } = Input;
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

  const handleAddItem = () => {
    setItems([...items, { id: items.length + 1, numberOfCharacters: 500, question: '', content: '' }]); // 새로운 항목 추가 
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
  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id)); // 항목 배열에서 선택한 ID를 제외하고 새로운 배열로 업데이트

  }
  const handleCharacterLimitChange = (id, newLimit) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, numberOfCharacters: newLimit } : item
    ));

    console.log(items)

  }

  const handleQuestionChange = (id, value) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, question: value } : item
    ));
    // 한글자라도 입력할 경우에 바로바로 바뀌는데 이게 맞나? 이렇게 하면 서버랑 db터지는거 아닌가 싶음 ;
  }

  const handleContentChange = (id, value) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, content: value } : item
    ));
    // 한글자라도 입력할 경우에 바로바로 바뀌는데 이게 맞나? 이렇게 하면 서버랑 db터지는거 아닌가 싶음 ;
  }

  return (
    <div>
      <AIHeaderNavbar></AIHeaderNavbar>
      <h1 className="infopage-title">AI에게 첨삭 요청하기</h1>
      <div class="containerAI">
        <div className="infopage-container">

          <p className="infopage-message">AI 첨삭을 위해 지원자님의 정보를 입력해주세요.</p>
          <form onSubmit={handleSubmit}>
            {[
              { key: "q1", label: "기업명" },
              { key: "q2", label: "직무명" },
              { key: "q3", label: "직무 세부 정보" },
              { key: "q4", label: "이수 교과목" },
              { key: "q5", label: "어학 점수" },
              { key: "q6", label: "프로젝트 경험" },
              { key: "q7", label: "자격증" },
              { key: "q8", label: "직무 관련 수상 경력" },
              { key: "q9", label: "대내외 활동" },
              { key: "q10", label: "가치관" }
            ].map((question, index) => (
              <div key={index} style={{ marginBottom: '15px' }}>
                <label htmlFor={question.key}>{question.label}:</label>
                <TextArea
                  id={question.key}
                  name={question.key}
                  value={infopageformData[question.key]}
                  onChange={handleInputChange}
                  required
                  placeholder="여기에 답변을 입력하세요."
                />
              </div>
            ))}

            {/* <h2 className="infopage-additional-title">**기업 자기소개서 문항별 질문 입력하기**</h2> */}
            {/* {infopageformData.additionalQuestions.map((item, index) => (
              <div key={index} className="infopage-question-wrapper">
                <div className="infopage-form-field">
                  <input
                    type="text"
                    value={item.question}
                    onChange={(e) => handleAdditionalQuestionChange(index, 'question', e.target.value)}
                    placeholder={`추가 질문 ${index + 1}`}
                    required
                  />
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
            ))} */}
            {/* <button type="button" onClick={handleAddQuestion} className="infopage-add-button">항목 추가</button> */}

            {/* <p className="infopage-portfolio-text">포트폴리오(선택):</p>
            <div className="infopage-portfolio-field">
              <input
                type="file"
                id="infopage-portfolio"
                name="portfolio"
                onChange={(e) => setinfopageFormData(prev => ({ ...prev, portfolio: e.target.files[0] }))}
              />
            </div> */}

            {/* <div className="infopage-buttons">
              <button type="button" className="infopage-save-button" onClick={handleSaveDraft}>임시 저장</button>
              <button type="submit" className="infopage-submit-button">제출</button>
            </div> */}
          </form>
          <ButtonContainer>
            <Button justify-content='flex-end' onClick={handleAddItem}>항목 추가</Button>
          </ButtonContainer>

          {items.map((item, index) => (
            <div key={item.id} vertical gap={5}>
              <Row>
                <p>추가 항목 {index + 1}</p>
                <Button onClick={() => handleRemoveItem(item.id)}>항목 삭제</Button>
              </Row>
              <Input
                placeholder="질문을 입력해주세요."
                name="question"
                value={item.question}
                onChange={(e) => handleQuestionChange(item.id, e.currentTarget.value)}
              />
              <TextArea
                showCount
                maxLength={item.numberOfCharacters}
                placeholder="내용을 입력해주세요."
                rows={6}
                name="content"
                value={item.content}
                onChange={(e) => handleContentChange(item.id, e.target.value)}
              />

              <Form
                layout="inline"
                style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', }} /* Flexbox 속성 추가 */
                onFinish={(values) => handleCharacterLimitChange(item.id, values.numberOfCharacters)} // 폼 제출 시 호출
                initialValues={{ numberOfCharacters: item.numberOfCharacters }}
              >
              </Form>
            </div>

          ))}

          {formSubmitted && <p>정보가 성공적으로 제출되었습니다!</p>}
        </div>
        <div className="infopage-container">
          <p className="infopage-message">AI에게 첨삭받을 자소서 질문을 입력해주세요.</p>
          <div>
            <div className="containerAI">
              <Input
                placeholder="질문을 입력해주세요."
                name="question"
                style={{ marginBottom: '16px' }}
              // value={item.question}
              // onChange={(e) => handleQuestionChange(item.id, e.currentTarget.value)}
              />
              <Button>
                요청하기
              </Button>
            </div>
            <Card title="AI 답변" size="small" style={{ minHeight: '500px', overflow: 'auto', marginBottom: '16px' }}>
              <p>content</p>

            </Card>
            <Card title="AI 답변에 대한 피드백" size="small" style={{ minHeight: '300px', overflow: 'auto' }}>
              <p>content</p>

            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoPage;