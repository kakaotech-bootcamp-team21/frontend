import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css_ai/Mypage.css';
import AIHeaderNavbar from "./AIHeaderNavbar";

function Mypage() {
  const [user, setUser] = useState({
    name: '',
    age: '',
    bio: '',
    example1: '',
    example2: '',
    example3: '',
    profileLink: ''
  });
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [portfolioFile, setPortfolioFile] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPortfolioFile(file);
    }
  };
  const toggleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };
  const openFilePicker = () => {
    document.getElementById('file-input').click();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('프로필 정보가 저장되었습니다.');
  };

  return (
      <div>
        <AIHeaderNavbar></AIHeaderNavbar>
        <div className="mypage-container">
          <div className="mypage-sidebar">
            <div className="mypage-menu-item">∙ 홈</div>
            <div className="mypage-menu-item" onClick={toggleSubmenu}>∙ 나의 자기소개서</div>
            {showSubmenu && (
                <>
                  <div className="mypage-menu-subitem" onClick={() => navigate('/EditingList')}>∙ 자기소개서[첨삭 중]</div>
                  <div className="mypage-menu-subitem" onClick={() => navigate('/EditedList')}>∙ 자기소개서[첨삭 완료]</div>
                </>
            )}
            <div className="mypage-menu-item">∙ 메뉴 추가1</div>
            <div className="mypage-menu-item">∙ 메뉴 추가2</div>
          </div>

          <div className="mypage-profile-container">
            <div className="mypage-profile-picture">
              <img src={profileImage || "default-profile.png"} alt="image" className="mypage-profile-img"/>
              <input id="file-input" type="file" onChange={handleImageChange} accept="image/*" hidden />
              <button type="button" onClick={() => document.getElementById('file-input').click()}>프로필 사진 변경</button>
            </div>

            <form onSubmit={handleSubmit}>
              <h1 className='mypage-title'>마이페이지</h1>
              <label>
                이름
                <input type="text" name="name" value={user.name} onChange={handleChange} />
              </label>
              <label>
                나이
                <input type="text" name="age" value={user.age} onChange={handleChange} />
              </label>
              <label>
                비밀번호
                <input type="password" name="bio" value={user.bio} onChange={handleChange} />
              </label>
              <div className="mypage-example">
                <label>
                  희망 직무 또는 분야(예시1)
                  <input type="text" name="example1" value={user.example1} onChange={handleChange} />
                </label>
                <label>
                  희망 기업(예시2)
                  <input type="text" name="example2" value={user.example2} onChange={handleChange} />
                </label>
                <label>
                  학점(예시3)
                  <input type="text" name="example3" value={user.example3} onChange={handleChange} />
                </label>
              </div>
              <label>
                포트폴리오(첨부)
                <input type="file" name="profileLink" onChange={handleChange} accept=".pdf,.doc,.docx" />
              </label>
              <button className="mypage-submit-button">저장</button>
            </form>
          </div>
        </div>
      </div>
  );
}

export default Mypage;