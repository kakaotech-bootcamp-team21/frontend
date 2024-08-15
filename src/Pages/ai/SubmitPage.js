import React, { useState } from 'react';
import '../../css_ai/SubmitPage.css';
import AIHeaderNavbar from "./AIHeaderNavbar";

function SubmitPage() {
    const [file, setFile] = useState(null); // 파일 상태 관리
    const [fileName, setFileName] = useState(''); // 파일 이름 상태

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setFileName(selectedFile ? selectedFile.name : '파일 선택 선택된 파일 없음');
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // 폼 제출 시 페이지 리로드 방지
        if (file) {
            console.log("제출된 파일:", file.name); // 콘솔에 파일 이름 로깅
            alert(`제출되었습니다: ${file.name}`); 
        } else {
            alert("파일을 선택해주세요"); 
        }
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
                <div className="submit-page-button-container">
                    <button type="submit" className="submit-page-submit-button">제출</button>
                </div>
            </form>
        </div>
        </div>
    );
}

export default SubmitPage;