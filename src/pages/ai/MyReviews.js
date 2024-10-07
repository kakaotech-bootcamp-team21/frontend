import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css_ai/MyReviews.css';
import AIHeaderNavbar from "./AIHeaderNavbar";
import Mypage_sidebar from '../../components/Mypage_sidebar';

function MyReviews() {
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // 로컬 스토리지에서 저장된 후기를 불러옵니다.
        const savedReview = localStorage.getItem('userReview');
        if (savedReview) {
            setReviews([JSON.parse(savedReview)]);
        }
    }, []);

    const handleEdit = (index) => {
        // 후기를 수정하기 위해 후기 작성 페이지로 이동합니다.
        navigate('/write-review');
    };

    const handleDelete = (index) => {
        // 후기를 삭제합니다.
        localStorage.removeItem('userReview');
        setReviews([]);
        alert('후기가 삭제되었습니다.');
    };

    return (
        <div>
            <AIHeaderNavbar />
            <div className="my-reviews-container">
                <Mypage_sidebar />
                <div className="my-reviews-content">
                    <h1 className="my-reviews-title">나의 후기</h1>
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="my-reviews-card">
                                <h2 className="my-reviews-card-title">{review.title}</h2>
                                <p className="my-reviews-card-content">{review.content}</p>
                                <div className="my-reviews-button-group">
                                    <button onClick={() => handleEdit(index)} className="my-reviews-button">
                                        수정하기
                                    </button>
                                    <button onClick={() => handleDelete(index)} className="my-reviews-button">
                                        삭제하기
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>작성된 후기가 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyReviews;
