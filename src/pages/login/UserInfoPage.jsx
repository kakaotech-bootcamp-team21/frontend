import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";

const UserInfoPage = () => {
    const [userInfo, setUserInfo] = useState({
        name: '',
        password: '',
        confirmPassword: '',
        birthdate: '',
        gender: '',
        type: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 여기에 입력 검증 로직을 추가할 수 있습니다.
        if (userInfo.password !== userInfo.confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        // 실제로는 여기서 서버에 사용자 정보를 전송해야 합니다.
        localStorage.setItem('tempUserInfo', JSON.stringify(userInfo));
        console.log('사용자 정보:', userInfo);
        alert('회원가입이 완료되었습니다. 다시 로그인해주세요.');
        navigate('/login'); // 로그인 페이지로 이동
    };

    return (
        <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#F0F8FF' }}>
            <Card style={{ width: '90%', maxWidth: '600px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">사용자 정보 입력</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>이름</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={userInfo.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={userInfo.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>비밀번호 확인</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                value={userInfo.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>생년월일</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="birthdate"
                                        value={userInfo.birthdate}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>성별</Form.Label>
                                    <Form.Select
                                        name="gender"
                                        value={userInfo.gender}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">선택하세요</option>
                                        <option value="male">남성</option>
                                        <option value="female">여성</option>
                                        <option value="other">기타</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>회원종류</Form.Label>
                                <Form.Select
                                    name="type"
                                    value={userInfo.type}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">선택하세요</option>
                                    <option value="user">사용자</option>
                                    <option value="pro">전문가</option>
                                    <option value="admin">관리자</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Button variant="primary" type="submit" className="w-100 mt-3">
                            회원가입 완료
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default UserInfoPage;