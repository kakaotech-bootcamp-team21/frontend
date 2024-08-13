import React from "react";
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 캘린더 기본 스타일
import Modal from 'react-bootstrap/Modal';

import Button from "../../components/buttons/Button";
import { Navbar, Nav, Container } from 'react-bootstrap';

import styled from "styled-components";

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

const Heading = styled.h1`
    margin-bottom: 40px;
`;



function HowToEdit(props) {
    const [userType, setUserType] = useState(() => {
        return localStorage.getItem('userType') || null;
    });

    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);

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

    const handleButtonClick = () => {
        setShowCalendar(!showCalendar);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setShowModal(true);
    }

    const handleClose = () => setShowModal(false);

    const navigate = useNavigate();

    return (
        <Wrapper>
            <ContainerTmp>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand as={Link} to="/">홈</Navbar.Brand>
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
            </ContainerTmp>
            <Heading>전문가에게 첨삭 요청하기</Heading>
            <ContainerTmp>
                <p>선택하신 전문가는 채팅/영상통화, 게시글 첨삭을 제공합니다.</p>
            </ContainerTmp>
            <ContainerTmp>
                <>
                    <Button
                        title="채팅/영상통화를 통해 첨삭받기"
                        onClick={() => {

                            handleButtonClick();
                        }}
                    />
                    <Button
                        title="게시글을 통해 첨삭 받기"
                        onClick={() => {
                            navigate("/expert");
                        }}
                    />
                </>
            </ContainerTmp>
            {showCalendar && (
                <ContainerTmp>
                    <p>전문가와 채팅/영상통화 첨삭을 원하는 날짜를 선택하세요. </p>
                    <br />
                    <br />
                    <Calendar onChange={handleDateChange} />






                </ContainerTmp>

            )}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>선택한 날짜 확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedDate ? `선택한 날짜는 ${selectedDate.toLocaleDateString()}입니다. 맞습니까?` : ''}
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary"
                        title="아니요"
                        onClick={handleClose}
                    />
                    <Button
                        variant="primary"
                        title="네"
                        onClick={handleClose}
                    />
                </Modal.Footer>
            </Modal>

        </Wrapper>

    );

}

export default HowToEdit;
