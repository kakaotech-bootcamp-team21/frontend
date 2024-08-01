import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Form, Button, Row, Col} from 'react-bootstrap';
import styled from "styled-components";
const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
const kakaolink = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
const StyledContainer = styled(Container)`
  background-color: #FFFFFF;
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
  background-color: #FEE500;
  color: #000000;
  border: none;
  &:hover {
    background-color: #FDD835;
  }
`;


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt with:', { email, password });
    };

    const handleKakaoLogin = () => {
        // 여기에 카카오 로그인 API 호출 로직을 구현합니다.
        window.location.href = kakaolink
        console.log('Kakao login attempted');
    };


    return (
        <div className="min-vh-100 d-flex align-items-center" style={{ backgroundColor: '#F0F8FF' }}>
            <Container className="p-5 rounded shadow" style={{ maxWidth: '400px', backgroundColor: '#FFFFFF' }}>
                <h2 className="text-center mb-4" style={{ color: '#4682B4' }}>로그인</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>이메일 주소</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="이메일을 입력하세요"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            <KakaoButton onClick={handleKakaoLogin}>
                                카카오 로그인
                            </KakaoButton>
                        </Col>
                    </Row>


                    <div className="text-center mt-3">
                        <a href="/signup">회원가입</a> | <a href="/privacy-policy">개인정보 취급방침</a>
                    </div>

                </Form>
                <div className="text-center mt-3">
                    <a href="#" style={{color: '#87CEFA'}}>비밀번호를 잊으셨나요?</a>
                </div>
            </Container>
        </div>
    );
};

export default LoginPage;