import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Form, Button, Row, Col} from 'react-bootstrap';
import styled from "styled-components";
import axios from "axios";

const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
const kakaolink = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 백엔드 로그인 API 호출
            const response = await axios.post(`${API_BASE_URL}/api/users/login`, {
                email: name,
                password: password
            });

            if (response.status === 200) {
                console.log('Login successful');
                // 실제 서버에서 받은 유저 정보를 로컬 스토리지에 저장
                localStorage.setItem('userInfo', JSON.stringify(response.data));
                navigate('/');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('로그인 정보가 일치하지 않습니다.');
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
                            <KakaoButton onClick={handleKakaoLogin}>
                                카카오 로그인
                            </KakaoButton>
                        </Col>
                    </Row>


                    <div className="text-center mt-3">
                        <a href="/privacy-policy">회원가입</a>
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