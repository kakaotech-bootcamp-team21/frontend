import React, { useState, useEffect } from 'react';
import '../../css_ai/SubmitPage.css';
import AIHeaderNavbar from "./AIHeaderNavbar";

function SubmitPage() {
    const [file, setFile] = useState(null); 
    const [fileName, setFileName] = useState(''); 
    const [submitpageformData, submitpagesetFormData] = useState({
        file: null,
        filename: '',
        additionalQuestions: [{ question: "", answer: "" }]
    });
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setFileName(selectedFile ? selectedFile.name : '파일 선택 선택된 파일 없음');
    };
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("submitpageformData"));
        if (savedData) {
          submitpagesetFormData(savedData);
        }
    }, []);
    useEffect(() => {
        localStorage.setItem("submitpageformData", JSON.stringify(submitpageformData));
    }, [submitpageformData]);

    const handleSubmit = (event) => {
        event.preventDefault(); // 폼 제출 시 페이지 리로드 방지
        if (file) {
            console.log("제출된 파일:", file.name); 
            alert(`제출되었습니다: ${file.name}`); 
        } else {
            alert("파일을 선택해주세요"); 
        }
    };
    
    const handleAdditionalQuestionChange = (index, field, value) => {
        submitpagesetFormData(prev => ({
            ...prev,
            additionalQuestions: prev.additionalQuestions.map((q, i) => 
                i === index ? { ...q, [field]: value } : q
            )
        }));
    };
    
    const handleAddQuestion = () => {
        submitpagesetFormData(prev => ({
            ...prev,
            additionalQuestions: [...prev.additionalQuestions, { question: "", answer: "" }]
        }));
    };
    
    const handleRemoveQuestion = (index) => {
        submitpagesetFormData(prev => ({
            ...prev,
            additionalQuestions: prev.additionalQuestions.filter((_, i) => i !== index)
        }));
    };
    return (
        <div>
            <AIHeaderNavbar></AIHeaderNavbar>
        <div className="submit-page-container">
            <h1 className="submit-page-submit-title">자기소개서 제출</h1>
            <p className="submit-page-description">**작성한 자기소개서 파일을 제출해주세요**</p>
            <form onSubmit={handleSubmit}>
                <div className="submit-page-file-input-container">
                    <input type="file" className="submit-page-file-input" onChange={handleFileChange} />
                </div>

            <h2 className="submit-page-additional-title">**기업 자기소개서 문항별 질문 입력하기**</h2>
            {submitpageformData.additionalQuestions.map((item, index) => (
                <div key={index} className="submit-page-question-wrapper">
                    <div className="submit-page-form-field">
                        <input
                            type="text"
                            value={item.question}
                            onChange={(e) => handleAdditionalQuestionChange(index, 'question', e.target.value)}
                            placeholder={`추가 질문 ${index + 1}`}
                            required
                        />
                        <textarea
                            value={item.answer}
                            onChange={(e) => handleAdditionalQuestionChange(index, 'answer', e.target.value)}
                            placeholder="여기에 답변을 입력하세요."
                            required
                            />
                    </div>
                    {submitpageformData.additionalQuestions.length > 1 && (
                    <button
                        type="button"
                        onClick={() => handleRemoveQuestion(index)}
                        className="submit-page-remove-button"
                        >
                            항목 삭제
                        </button>
                    )}
                </div>
                ))}
                <button type="button" onClick={handleAddQuestion} className="submit-page-add-button">항목 추가</button>
                <div className="submit-page-button-container">
                    <button type="submit" className="submit-page-submit-button">제출</button>
                </div>
            </form>
        </div>
    </div>
  );
}

export default SubmitPage;