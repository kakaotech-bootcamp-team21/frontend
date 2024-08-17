import React from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

import styled from "styled-components";
import { Form, Row, Col } from 'react-bootstrap';
import Card from "../../components/Card";


import AI_Header from "../../components/headers/Header";
import AI_Navbar from '../../components/navbars/AiNavbar';

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ContainerTmp = styled.div`
    width: 100%;
    
    @media (min-width: 576px) {
        max-width: 540px;
    }
    
    @media (min-width: 768px) {
        max-width: 720px;
    }
    
    @media (min-width: 992px) {
        max-width: 960px;
    }
    
    @media (min-width: 1200px) {
        max-width: 1140px;
    }

    @media (min-width: 1400px) {
        max-width: 1320px;
    }
    
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

const StyleRow = styled(Row)`
    gap: 16px;
`;

const Heading = styled.h1`
    margin-bottom: 40px;
`;


function RequestExpert(props) {
    const [userType, setUserType] = useState(() => {
        return localStorage.getItem('userType') || null;
    });

    const renderNavLinks = () => {
        if (userType === 'regular') {
            return (
                <>
                    <Nav.Link as={Link} to="/request-expert">전문가에게 첨삭요청하기</Nav.Link>
                    {/*이 버튼 누르면 앨리스가 만든 페이지로 이동 가능하게함*/}
                    <Nav.Link as={Link} to="/ai-main">AI에게 첨삭요청하기</Nav.Link>
                    <Nav.Link href="#pricing">합격자소서 모아보기</Nav.Link>
                    <Nav.Link href="#pricing2">보낸 첨삭요청 목록 확인</Nav.Link>
                    {/*일단 임시로 만든 항목이니 나중에 지워도 되니까 신경 안써도 됌*/}
                    <Nav.Link as={Link} to="/Mypage">마이페이지</Nav.Link>
                    <Nav.Link as={Link} to="/login">로그인하기</Nav.Link>
                </>
            );
        } else if (userType === 'expert') {
            return (
                <>
                    <Nav.Link href="#pricing">합격자소서 모아보기</Nav.Link>
                    <Nav.Link href="#home">받은 첨삭요청 목록 확인</Nav.Link>
                </>
            );
        } else {
            return (
                <>
                    <Nav.Link href="#pricing">합격자소서 모아보기</Nav.Link>
                </>
            );
        }
    }


    // 임시 데이터 설정
    const dummyData = [
        {
            imageUrl: "https://via.placeholder.com/150",
            nickname: "User1",
            description: "This is a description for User1."
        },
        {
            imageUrl: "https://via.placeholder.com/150",
            nickname: "User2",
            description: "This is a description for User2."
        },
        {
            imageUrl: "https://via.placeholder.com/150",
            nickname: "User3",
            description: "This is a description for User3."
        },
        {
            imageUrl: "https://via.placeholder.com/150",
            nickname: "User4",
            description: "This is a description for User4."
        },
        {
            imageUrl: "https://via.placeholder.com/150",
            nickname: "User5",
            description: "This is a description for User5."
        },
        {
            imageUrl: "https://via.placeholder.com/150",
            nickname: "User6",
            description: "This is a description for User6."
        },
        {
            imageUrl: "https://via.placeholder.com/150",
            nickname: "User7",
            description: "This is a description for User7."
        },
    ];

    return (
        <>
            <AI_Header />
            <AI_Navbar />
            <Wrapper>
                {/* <ContainerTmp>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#">메뉴</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto" >
                                {renderNavLinks()}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <br />
                <br />
            </ContainerTmp> */}
                <Heading>내 분야 첨삭 가능 전문가 찾아보기</Heading>
                <ContainerTmp>

                    <>
                        {/* <Form.Group className="mb-3">
                        <Form.Label>Disabled input</Form.Label>
                        <Form.Control placeholder="Disabled input" disabled />
                    </Form.Group> */}
                        <Form.Group className="mb-3">
                            <Form.Label>전문가 산업 선택</Form.Label>
                            <Form.Select disabled>
                                <option>Disabled select</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>전문가 직업군 선택</Form.Label>
                            <Form.Select disabled>
                                <option>Disabled select</option>
                            </Form.Select>
                        </Form.Group>
                    </>
                    <>
                        <Container>
                            <StyleRow>
                                {dummyData.map((card, index) => (
                                    <Col md={2} key={index} className="mb-4">
                                        <Card style={{ width: '100%' }}>
                                            <Card.Img variant="top" src={card.imageUrl} alt={card.nickname} />
                                            <Card.Body>
                                                <Card.Title>{card.nickname}</Card.Title>
                                                <Card.Text>{card.description}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </StyleRow>
                        </Container>
                    </>
                </ContainerTmp>
            </Wrapper>
        </>
    );
}

export default RequestExpert;