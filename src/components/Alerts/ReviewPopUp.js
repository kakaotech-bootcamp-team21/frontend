import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ReviewPopUp.css';

const ReviewPopUp = ({ onCancel }) => {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/write-review');
    };

    const handleOverlayClick = () => {
        onCancel(); // 팝업을 닫고 다시 나타나지 않도록 처리
    };

    const handlePopupClick = (e) => {
        e.stopPropagation(); // 클릭 이벤트가 부모로 전파되지 않도록 함
    };

    const handleCancelClick = () => {
        navigate('/'); // 홈으로 이동
    };

    return (
        <div className="review-pop-up-container" onClick={handleOverlayClick}>
            <div className="review-pop-up-content" onClick={handlePopupClick}>
                <p className="review-pop-up-message">귀중한 후기는 서비스에 도움이 됩니다</p>
                <div className="review-pop-up-buttons">
                    <button className="review-pop-up-submit" onClick={handleSubmit}>
                        후기작성하기
                    </button>
                    <button className="review-pop-up-cancel" onClick={handleCancelClick}>
                        바빠요 다음에 할게요
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewPopUp;
