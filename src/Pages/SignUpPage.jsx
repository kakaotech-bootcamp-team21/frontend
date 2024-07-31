import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import styled from 'styled-components';

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
  margin-top: 1rem;
`;

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Sign up attempt with:', { email, password });
    };

    return (
        <StyledContainer>
            <h2 className="text-center mb-4">회원가입</h2>
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

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>비밀번호 확인</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="비밀번호를 다시 입력하세요"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <StyledButton variant="primary" type="submit">
                    회원가입
                </StyledButton>
            </Form>

            <div className="text-center mt-3">
                <a href="/login">이미 계정이 있으신가요? 로그인</a>
            </div>
        </StyledContainer>
    );
};

export default SignUpPage;