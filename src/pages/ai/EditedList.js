import React, { useState } from 'react';
import AIHeaderNavbar from "./AIHeaderNavbar";
import { useNavigate, useLocation } from 'react-router-dom';
import '../../css_ai/EditedList.css';
import '../../css_ai/Mypage.css'
import Mypage_sidebar from "../../components/Mypage_sidebar";

function EditedList() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showSubmenu, setShowSubmenu] = useState(true); 
  const navigate = useNavigate();
  const location = useLocation();

  const resumeList = [
    { id: 1, company: '삼성전자', position: '인공지능(AI) 알고리즘 개발자', file: 'samsung_ai_resume.pdf', method: '채팅' },
    { id: 2, company: 'LG화학', position: '이차전지 소재 연구원', file: 'lg_battery_resume.pdf', method: '게시글' },
    { id: 3, company: 'SK하이닉스', position: '반도체 공정 엔지니어', file: 'sk_semiconductor_resume.pdf', method: '영상' },
    { id: 4, company: '현대자동차', position: '자율주행 센서 융합 엔지니어', file: 'hyundai_autonomous_resume.pdf', method: '채팅' },
    { id: 5, company: '네이버', position: '자연어 처리(NLP) 전문가', file: 'naver_nlp_resume.pdf', method: '게시글' },
    { id: 6, company: '카카오', position: '빅데이터 분석 엔지니어', file: 'kakao_bigdata_resume.pdf', method: '영상' },
    { id: 7, company: 'CJ제일제당', position: '식품 미생물학 연구원', file: 'cj_food_science_resume.pdf', method: '채팅' },
    { id: 8, company: '한국전력공사', position: '스마트그리드 시스템 엔지니어', file: 'kepco_smartgrid_resume.pdf', method: '게시글' },
    { id: 9, company: '포스코', position: '친환경 제철 공정 개발자', file: 'posco_eco_steel_resume.pdf', method: '영상' },
    { id: 10, company: '두산중공업', position: '수소연료전지 시스템 설계자', file: 'doosan_fuelcell_resume.pdf', method: '채팅' },
    { id: 11, company: '한화에어로스페이스', position: '위성 통신 시스템 엔지니어', file: 'hanwha_satellite_resume.pdf', method: '게시글' },
    { id: 12, company: '대한항공', position: '항공기 구조 해석 전문가', file: 'koreanair_structure_resume.pdf', method: '영상' },
    { id: 13, company: '롯데케미칼', position: '바이오 플라스틱 연구원', file: 'lotte_bioplastic_resume.pdf', method: '채팅' },
    { id: 14, company: 'KT', position: '5G 네트워크 최적화 엔지니어', file: 'kt_5g_network_resume.pdf', method: '게시글' },
    { id: 15, company: '쿠팡', position: '물류 로봇 제어 시스템 개발자', file: 'coupang_robotics_resume.pdf', method: '영상' }
  ];

  const isActive = (path) => {
    return location.pathname === path ? "active":"";
  }

  const handleFileClick = (file) => {
    setSelectedFile(file);
    // 파일을 열거나 다운로드하는 로직 여기에 추가
    window.open(`../sample_resumes/${file}`, '_blank');
  };
  
  const toggleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };

  return (
    <div>
      <div className="mypage-container">
        {/*<div className="mypage-sidebar">*/}
        {/*  <div className="mypage-menu-item" onClick={() => navigate('/mypage')}>∙ 홈</div>*/}
        {/*  <div className="mypage-menu-item" onClick={() => setShowSubmenu(!showSubmenu)}>∙ 나의 자기소개서</div>*/}
        {/*  {showSubmenu && (*/}
        {/*    <>*/}
        {/*      <div className={`mypage-menu-subitem ${isActive('/editing-list')}`} onClick={() => navigate('/editing-list')}>∙ 자기소개서[첨삭 중]</div>*/}
        {/*      <div className={`mypage-menu-subitem ${isActive('/edited-list')}`} onClick={() => navigate('/edited-list')}>∙ 자기소개서[첨삭 완료]</div>*/}
        {/*    </>*/}
        {/*  )}*/}
        {/*  <div className="mypage-menu-item">∙ 메뉴 추가1</div>*/}
        {/*  <div className="mypage-menu-item">∙ 메뉴 추가2</div>*/}
        {/*</div>*/}
        <Mypage_sidebar/>

        <div className="editedlist-content">
          <h2 className="editedlist-correction-subtitle">첨삭 완료된 자기소개서</h2>
          <div className="editedlist-table-container">
            <table className="editedlist-correction-table">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>기업</th>
                  <th>직무</th>
                  <th>파일</th>
                  <th>첨삭방식(나중에 링크 연결)</th>
                </tr>
              </thead>
              <tbody>
                {resumeList.map(resume => (
                  <tr key={resume.id}>
                    <td>{resume.id}</td>
                    <td>{resume.company}</td>
                    <td>{resume.position}</td>
                    <td>
                      <button onClick={() => handleFileClick(resume.file)}>
                        자기소개서 보기
                      </button>
                    </td>
                    <td>{resume.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditedList;