import { useState } from "react";
import { useNavigate } from "react-router-dom";



function Mypage_sidebar(){
    const [showSubmenu, setShowSubmenu] = useState(false);

    const navigate = useNavigate();
    
    const toggleSubmenu = () => {
        setShowSubmenu(!showSubmenu);
      };

    return (
        <div className="mypage-sidebar">
            <div className="mypage-menu-item" onClick={() => navigate('/mypage')}>∙ 홈</div>
            <div className="mypage-menu-item" onClick={() => navigate('/edited-list')}>∙ 나의 첨삭 기록</div>
            <div className="mypage-menu-item" onClick={() => navigate('/my-reviews')}>∙ 나의 후기</div>
            {/*<div className="mypage-menu-item" onClick={toggleSubmenu}>∙ 나의 자기소개서</div>*/}
            {/*{showSubmenu && (*/}
            {/*  <>*/}
            {/*    <div className="mypage-menu-subitem" onClick={() => navigate('/edited-list')}>∙ 나의 첨삭 기록</div>*/}
            {/*    <div className="mypage-menu-subitem" onClick={() => navigate('/')}>∙ 나의 후기</div>*/}
            {/*  </>*/}
            {/*)}*/}
        </div>
    )
}

export default Mypage_sidebar