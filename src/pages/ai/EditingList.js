import React, { useState } from 'react';
import AIHeaderNavbar from "./AIHeaderNavbar";
import { useNavigate, useLocation } from 'react-router-dom';
import '../../css_ai/EditingList.css';
import '../../css_ai/Mypage.css'

function EditingList() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showSubmenu, setShowSubmenu] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const resumeList = [
    { id: 1, company: '삼성전자', position: '모바일 애플리케이션 개발자 (Android/iOS)', file: 'samsung_mobile_app_resume.pdf', method: '채팅' },
    { id: 2, company: 'LG화학', position: '배터리 소재 연구원', file: 'lg_battery_research_resume.pdf', method: '게시글' },
    { id: 3, company: 'SK하이닉스', position: 'DRAM 설계 엔지니어', file: 'sk_dram_design_resume.pdf', method: '영상' },
    { id: 4, company: '현대자동차', position: '자율주행 시스템 개발자', file: 'hyundai_autonomous_driving_resume.pdf', method: '채팅' },
    { id: 5, company: '네이버', position: '검색 알고리즘 개발자', file: 'naver_search_algorithm_resume.pdf', method: '게시글' },
    { id: 6, company: '카카오', position: '데이터 분석가 (빅데이터)', file: 'kakao_data_analyst_resume.pdf', method: '영상' },
    { id: 7, company: '한국전력공사', position: '신재생에너지 시스템 엔지니어', file: 'kepco_renewable_energy_resume.pdf', method: '채팅' },
    { id: 8, company: '포스코', position: '스마트팩토리 솔루션 아키텍트', file: 'posco_smart_factory_resume.pdf', method: '게시글' },
    { id: 9, company: '대한항공', position: '항공기 정비 엔지니어', file: 'korean_air_maintenance_resume.pdf', method: '영상' },
    { id: 10, company: '롯데케미칼', position: '고분자 소재 개발 연구원', file: 'lotte_chemical_polymer_resume.pdf', method: '채팅' },
    { id: 11, company: 'CJ제일제당', position: '식품공학 연구원 (발효식품)', file: 'cj_food_science_resume.pdf', method: '게시글' },
    { id: 12, company: '한화시스템', position: '국방 전자 시스템 엔지니어', file: 'hanwha_defense_electronics_resume.pdf', method: '영상' },
    { id: 13, company: 'KT', position: '5G 네트워크 설계 엔지니어', file: 'kt_5g_network_resume.pdf', method: '채팅' },
    { id: 14, company: '쿠팡', position: '물류 시스템 최적화 전문가', file: 'coupang_logistics_optimization_resume.pdf', method: '게시글' },
    { id: 15, company: '두산중공업', position: '풍력발전 시스템 설계 엔지니어', file: 'doosan_wind_power_resume.pdf', method: '영상' }
  ];

  const handleFileClick = (file) => {
    setSelectedFile(file);
    // 파일을 열거나 다운로드하는 로직 여기에 추가
    window.open(`../sample_resumes/${file}`, '_blank');
  };

  const toggleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <>
      <AIHeaderNavbar></AIHeaderNavbar>
      <div>

        <div className="mypage-container">
          <div className="mypage-sidebar">
            <div className="mypage-menu-item" onClick={() => navigate('/mypage')}>∙ 홈</div>
            <div className="mypage-menu-item" onClick={() => setShowSubmenu(!showSubmenu)}>∙ 나의 자기소개서</div>
            {showSubmenu && (
              <>
                <div className={`mypage-menu-subitem ${isActive('/editing-list')}`} onClick={() => navigate('/editing-list')}>∙ 자기소개서[첨삭 중]</div>
                <div className={`mypage-menu-subitem ${isActive('/edited-list')}`} onClick={() => navigate('/edited-list')}>∙ 자기소개서[첨삭 완료]</div>
              </>
            )}
            <div className="mypage-menu-item">∙ 메뉴 추가1</div>
            <div className="mypage-menu-item">∙ 메뉴 추가2</div>
          </div>

          <div className="editinglist-content">
            <h2 className="editinglist-correction-subtitle">첨삭 진행중인 자기소개서</h2>
            <div className="editinglist-table-container">
              <table className="editinglist-correction-table">
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
    </>
  );
}

export default EditingList;