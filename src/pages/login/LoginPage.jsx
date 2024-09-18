import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
const kakaolink = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const StyledContainer = styled(Container)`
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin-top: 2rem;
`;

const StyledButton = styled(Button)`
    width: 100%;
    margin-bottom: 1rem;
`;

const KakaoButton = styled(Button)`
    width: 100%;
    background-color: #fee500;
    color: #000000;
    border: none;
    &:hover {
        background-color: #fdd835;
    }
`;

const LoginPage = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isLoginSuccess, setIsLoginSuccess] = useState(false);

    const openModal = (message, success) => {
        setModalMessage(message);
        setIsLoginSuccess(success);
        setShowModal(true);

        if (success) {
            setTimeout(() => {
                setShowModal(false);
                navigate('/'); // 로그인 성공 시 홈 페이지로 이동
            }, 3000);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 백엔드 로그인 API 호출
            const response = await axios.post(`${API_BASE_URL}/api/users/login`, {
                email: name,
                password: password,
            });

            if (response.status === 200) {
                console.log('Login successful');
                const { password, ...secureResponse } = response.data;
                localStorage.setItem('userInfo', JSON.stringify(secureResponse));
                localStorage.setItem('userType', response.data.role);
                openModal('로그인 성공하였습니다!', true);
            }
        } catch (error) {
            console.error('Login failed:', error);
            openModal('로그인 정보가 일치하지 않습니다.', false);
        }
    };

    const handleKakaoLogin = () => {
        window.location.href = kakaolink;
        console.log('Kakao login attempted');
    };

    return (
        <div className="min-vh-100 d-flex align-items-center" style={{ backgroundColor: '#F0F8FF' }}>
            <Container className="p-5 rounded shadow" style={{ maxWidth: '400px', backgroundColor: '#FFFFFF' }}>
                <h2 className="text-center mb-4" style={{ color: '#4682B4' }}>로그인</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>아이디</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="아이디 입력하세요"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="비밀번호를 입력하세요"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Row className="mb-3">
                        <Col>
                            <StyledButton variant="primary" type="submit">
                                로그인
                            </StyledButton>
                        </Col>
                        <Col>
                            <KakaoButton onClick={handleKakaoLogin}>카카오 로그인</KakaoButton>
                        </Col>
                    </Row>

                    {/* 모달 창 */}
                    <Modal
                        show={showModal}
                        onHide={() => {
                            setShowModal(false);
                            if (isLoginSuccess) {
                                navigate('/');
                            }
                        }}
                        backdrop={true} // 모달 외부 클릭 감지 가능
                        keyboard={true} // ESC 키도 반응 가능
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>알림</Modal.Title>
                        </Modal.Header>
                        <Modal.Body onClick={() => navigate('/')}> {/* 모달 본문 클릭 시 이동 */}
                            {modalMessage}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setShowModal(false);
                                    if (isLoginSuccess) {
                                        navigate('/');
                                    }
                                }}
                            >
                                닫기
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <div className="text-center mt-3">
                        <a href="/privacy-policy">회원가입</a>
                    </div>
                </Form>
                <div className="text-center mt-3">
                    <a href="#" style={{ color: '#87CEFA' }}>비밀번호를 잊으셨나요?</a>
                </div>
            </Container>
        </div>
    );
};

export default LoginPage;
