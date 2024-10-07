import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './WriteReviewPage.css';
import { notification } from 'antd';
import AIHeaderNavbar from "../ai/AIHeaderNavbar";

function WriteReviewPage() {
    const [connectionType, setConnectionType] = useState(null);
    const [title, setTitle] = useState('');
    const [reviewContent, setReviewContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // 저장된 후기가 있는지 확인하고 로드합니다.
        const savedReview = localStorage.getItem('userReview');
        if (savedReview) {
            const review = JSON.parse(savedReview);
            setConnectionType(review.connectionType);
            setTitle(review.title);
            setReviewContent(review.content);
        }
    }, []);

    const handleConnectionTypeSelect = (type) => {
        setConnectionType(type);
    };

    const handleSubmit = () => {
        const review = {
            title,
            content: reviewContent,
            connectionType,
        };
        // 후기를 로컬 스토리지에 저장합니다.
        localStorage.setItem('userReview', JSON.stringify(review));

        // 성공 알림 메시지를 표시합니다.
        notification.success({
            message: '후기 작성 완료',
            description: '귀하의 후기가 성공적으로 저장되었습니다.',
        });

        // 보관함 페이지로 이동합니다.
        navigate('/my-reviews');
    };

    const handleCancel = () => {
        // 취소 시 메인 페이지로 이동합니다.
        navigate('/');
    };

    return (
        <>
            <AIHeaderNavbar />
            <div className="write-review-container">
                <h1>첨삭 후기 작성하기</h1>
                <div className="write-review-description">
                    서비스를 이용해주셔서 감사합니다! 이용하신 경험에 대한 후기를 남겨주시면, 더 나은 서비스를 제공하는 데 큰 도움이 됩니다.
                </div>

                {!connectionType ? (
                    <div className="write-review-connection-type">
                        <p>접속 유형을 선택해주세요:</p>
                        <button onClick={() => handleConnectionTypeSelect('온라인')}>온라인</button>
                        <button onClick={() => handleConnectionTypeSelect('오프라인')}>오프라인</button>
                    </div>
                ) : (
                    <form className="write-review-form">
                        <div className="write-review-form-group">
                            <label htmlFor="title">제목</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="write-review-input"
                            />
                        </div>
                        <div className="write-review-form-group">
                            <label htmlFor="reviewContent">후기 내용</label>
                            <textarea
                                id="reviewContent"
                                value={reviewContent}
                                onChange={(e) => setReviewContent(e.target.value)}
                                className="write-review-textarea"
                            />
                        </div>
                        <div className="write-review-button-container">
                            <button type="button" onClick={handleSubmit} className="write-review-submit-button">
                                제출하기
                            </button>

                        </div>
                    </form>
                )}
            </div>
        </>
    );
}

export default WriteReviewPage;
