import React from "react";
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 캘린더 기본 스타일
import Modal from 'react-bootstrap/Modal';
import Button1 from "../../components/buttons/Button";
//import ButtonSample from "../../components/buttons/ButtonSample";
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Message, notification, Radio } from "antd";
import { Input, Flex, Button, Form } from 'antd';



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

const Row = styled.div`
    display: flex;
    align-items: center; /* 수직 가운데 정렬 */
    justify-content: space-between; /* 필요에 따라 공간을 조절 */
    gap: 16px; /* 요소 사이의 간격 조절 */
    margin-top: 25px;
    margin-bottom: 25px;
`;

const OnlyRow = styled.div`
    display: flex;
    align-items: center; /* 수직 가운데 정렬 */
    margin-bottom: 25px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end; /* 버튼을 오른쪽으로 정렬 */
`;



function HowToEdit(props) {
    const [userType, setUserType] = useState(() => {
        return localStorage.getItem('userType') || null;
    });
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [value, setValue] = useState(1);
    const [items, setItems] = useState([{ id: 1 }]); // 기본적으로 하나의 항목을 포함함 
    const [formData, setFormData] = useState({
        numberOfCharacters: 500,
    });

    const navigate = useNavigate();
    const { TextArea } = Input;

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

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setShowModal(true);
    }

    const handleClose = () => setShowModal(false);

    const handleYes = () => {
        notification.success({
            message: '선택되었습니다',
            placement: 'topRight',
            duration: 5,
        });

        setShowModal(false);
    };

    const handleNo = () => {
        notification.error({
            message: '날짜를 다시 선택해주세요',
            placement: 'topRight',
            duration: 5,
        });
        setShowModal(false);
    };

    const onChange = (e) => {
        setValue(e.target.value);
        if (value === 1) {
            setShowCalendar(true);
        } else {
            setShowCalendar(false);
        }

    };

    const handleAddItem = () => {
        setItems([...items, { id: items.length + 1 }]); // 새로운 항목 추가 
    }

    const handleRemoveItem = (id) => {
        setItems(items.filter(item => item.id !== id)); // 항목 배열에서 선택한 ID를 제외하고 새로운 배열로 업데이트

    }

    const handleSubmit = (values) => {
        setFormData(values);
    };


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
                <p>선택하신 전문가는 게시글, 채팅/영상통화 첨삭을 제공합니다.</p>
            </ContainerTmp>
            <ContainerTmp>
                <>
                    <br />
                    <br />
                    <p>어떤 방식을 선호하시나요?</p>
                    <Radio.Group onChange={onChange} value={value}>
                        <Radio value={1}>
                            게시글을 통해 첨삭 받기
                        </Radio>
                        <Radio value={2}>
                            채팅/영상통화를 통해 첨삭받기
                        </Radio>
                    </Radio.Group>
                    <br />
                </>
            </ContainerTmp>
            {showCalendar && (
                <ContainerTmp>
                    <br />
                    <br />
                    <p>아래의 캘린더에서 전문가와 채팅/영상통화 첨삭을 원하는 날짜를 선택하세요. </p>

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
                    <Button1 title="예" onClick={() => {
                        handleYes();
                        navigate("/submit");
                    }} />
                    <Button1 title="아니오" onClick={handleNo} />
                </Modal.Footer>
            </Modal>

            <br />

            <ContainerTmp>
                <p>전문가에게 첨삭받을 자소서 항목을 입력해주세요.  </p>
                <ButtonContainer>
                    <Button justify-content='flex-end' onClick={handleAddItem}>항목 추가</Button>
                </ButtonContainer>

                <ContainerTmp>

                    {items.map((item, index) => (
                        <Flex key={item.id} vertical gap={5}>
                            <Row>
                                <p>항목 {index + 1}</p>
                                <Button onClick={() => handleRemoveItem(item.id)}>항목 삭제</Button>
                            </Row>
                            <Input placeholder="질문을 입력해주세요." />
                            <TextArea showCount maxLength={formData.numberOfCharacters} placeholder="내용을 입력해주세요." rows={6} />

                            <Form
                                layout="inline"
                                style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', }} /* Flexbox 속성 추가 */
                                onFinish={handleSubmit} // 폼 제출 시 호출
                            >
                                <p>글자수: </p>
                                <Form.Item
                                    name="numberOfCharacters"
                                    rules={[{ required: true, message: '올바른 글자수를 입력해주세요!' }]}
                                >
                                    <Input
                                        name="numberOfCharacters"
                                        value={formData.numberOfCharacters}
                                        style={{ width: 70 }}
                                        placeholder="500" />
                                </Form.Item>
                                <Form.Item label=" " colon={false}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                    //value={formData.numberOfCharacters}
                                    >
                                        변경
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Flex>

                    ))}
                </ContainerTmp>


                <Button1 title="직접 작성할래요" onClick={() => {
                    navigate("/expert-info");
                }} />

                <Button1 title="이미 작성해둔 파일이 있어요" onClick={() => {
                    navigate("/expert-submit");
                }} />
            </ContainerTmp>
            <br />
            <br />




        </Wrapper>

    );

}

export default HowToEdit;
