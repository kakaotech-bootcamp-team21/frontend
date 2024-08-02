import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button, Container, Alert } from "react-bootstrap";

const AuthVerificationPage = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate();

    const handleSendVerification = () => {
        // 실제로는 여기서 SMS 인증 요청을 보내야 합니다.
        setIsCodeSent(true);
        alert('인증번호가 발송되었습니다.');
    };

    const handleVerify = () => {
        // 실제로는 여기서 인증번호를 확인해야 합니다.
        setIsVerified(true);
        alert('인증이 완료되었습니다.');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isVerified) {
            navigate('/user-info'); // 사용자 정보 입력 페이지로 이동
        } else {
            alert('먼저 인증을 완료해주세요.');
        }
    };

    return (
        <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#F0F8FF' }}>
            <Card style={{ width: '90%', maxWidth: '400px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">본인인증</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>휴대폰 번호</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="010-0000-0000"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </Form.Group>
                        <Button
                            variant="secondary"
                            onClick={handleSendVerification}
                            className="w-100 mb-3"
                        >
                            인증번호 발송
                        </Button>
                        {isCodeSent && (
                            <Form.Group className="mb-3">
                                <Form.Label>인증번호</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="인증번호 6자리 입력"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                />
                            </Form.Group>
                        )}
                        {isCodeSent && (
                            <Button
                                variant="primary"
                                onClick={handleVerify}
                                className="w-100 mb-3"
                            >
                                인증확인
                            </Button>
                        )}
                        {isVerified && (
                            <Alert variant="success">
                                인증이 완료되었습니다.
                            </Alert>
                        )}
                        <Button variant="primary" type="submit" className="w-100">
                            다음
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AuthVerificationPage;