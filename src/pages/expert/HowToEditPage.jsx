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
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

import AIHeaderNavbar from "../ai/AIHeaderNavbar";


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
    margin-top: 40px;
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
    const [showLetter, setShowLetter] = useState(true);
    const [showInputFile, setInputFile] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [value, setValue] = useState(1);
    const [items, setItems] = useState([{ id: 1, numberOfCharacters: 500, question: '', content: '' }]); // 기본적으로 하나의 항목을 포함함 

    // 각 라디오 그룹에 대한 상태를 개별적으로 관리
    const [calendarOption, setCalendarOption] = useState(1); // 첫 번째 라디오 그룹
    const [editTargetOption, setEditTargetOption] = useState(1); // 두 번째 라디오 그룹

    const { Dragger } = Upload;

    const uploadProps = {
        name: 'file',
        multiple: true,
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
      };

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

    const onCalendarOptionChange = (e) => {
        setCalendarOption(e.target.value);
        if (e.target.value === 1) {
            setShowCalendar(false);
        } else {
            setShowCalendar(true);
        }

    };

    const onEditTargetOptionChange = (e) => {
        setEditTargetOption(e.target.value);
        if (e.target.value === 1) {
            setShowLetter(true);
            setInputFile(false);
        } else {
            setShowLetter(false);
            setInputFile(true);
        }

    };

    const handleAddItem = () => {
        setItems([...items, { id: items.length + 1, numberOfCharacters: 500, question: '', content: '' }]); // 새로운 항목 추가 
    }

    const handleRemoveItem = (id) => {
        setItems(items.filter(item => item.id !== id)); // 항목 배열에서 선택한 ID를 제외하고 새로운 배열로 업데이트

    }

    const handleCharacterLimitChange = (id, newLimit) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, numberOfCharacters: newLimit } : item
        ));

        console.log(items)

    }

    const handleQuestionChange = (id, value) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, question: value } : item
        ));
        // 한글자라도 입력할 경우에 바로바로 바뀌는데 이게 맞나? 이렇게 하면 서버랑 db터지는거 아닌가 싶음 ;
    }

    const handleContentChange = (id, value) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, content: value } : item
        ));
        // 한글자라도 입력할 경우에 바로바로 바뀌는데 이게 맞나? 이렇게 하면 서버랑 db터지는거 아닌가 싶음 ;
    }

    const handleSubmit = (values) => {
        setFormData(values);
    };

    const handleTotalSubmit = (values) => {
        setShowModal2(true)
        setFormData(values);
    };

    const handleSubmitYes = () => {
        notification.success({
            message: '제출이 완료되었습니다. ',
            placement: 'topRight',
            duration: 5,
        });

        setShowModal2(false);
    };

    const handleSubmitNo = () => {
        notification.error({
            message: '다시 작성 해주세요',
            placement: 'topRight',
            duration: 5,
        });
        setShowModal2(false);
    };

    return (

        <>
            <AIHeaderNavbar></AIHeaderNavbar>
            <Wrapper>
                <Heading>전문가에게 첨삭 요청하기</Heading>
                <ContainerTmp>
                    <p>선택하신 전문가는 게시글, 영상통화 첨삭을 제공합니다.</p>
                </ContainerTmp>
                <ContainerTmp>
                    <>
                        <br />
                        <br />
                        <p>어떤 방식을 선호하시나요?</p>
                        <Radio.Group onChange={onCalendarOptionChange} value={calendarOption}>
                            <Radio value={1}>
                                게시글을 통해 첨삭 받기
                            </Radio>
                            <Radio value={2}>
                                영상통화를 통해 첨삭받기
                            </Radio>
                        </Radio.Group>
                        <br />
                    </>
                </ContainerTmp>
                {showCalendar && (
                    <ContainerTmp>
                        <br />
                        <br />
                        <p>아래의 캘린더에서 전문가와 영상통화 첨삭을 원하는 날짜를 선택하세요. </p>

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
                        }} />
                        <Button1 title="아니오" onClick={handleNo} />
                    </Modal.Footer>
                </Modal>

                <br />
                <ContainerTmp>
                    <p>첨삭 받을 대상을 선택해주세요  </p>
                    <Radio.Group onChange={onEditTargetOptionChange} value={editTargetOption}>
                        <Radio value={1}>
                            자소서 첨삭 받기
                        </Radio>
                        <Radio value={2}>
                            포트폴리오 첨삭 받기
                        </Radio>
                    </Radio.Group>
                </ContainerTmp>
                <br />
                {showLetter && (
                    <ContainerTmp>
                        <p>전문가에게 첨삭받을 자소서 항목을 입력해주세요.  </p>
                        <ButtonContainer>
                            <Button justify-content='flex-end' onClick={handleAddItem}>항목 추가</Button>
                        </ButtonContainer>

                        {items.map((item, index) => (
                            <div key={item.id} vertical gap={5}>
                                <Row>
                                    <p>항목 {index + 1}</p>
                                    <Button onClick={() => handleRemoveItem(item.id)}>항목 삭제</Button>
                                </Row>
                                <Input
                                    placeholder="질문을 입력해주세요."
                                    name="question"
                                    value={item.question}
                                    onChange={(e) => handleQuestionChange(item.id, e.currentTarget.value)}

                                />
                                <TextArea
                                    showCount
                                    maxLength={item.numberOfCharacters}
                                    placeholder="내용을 입력해주세요."
                                    rows={6}
                                    name="content"
                                    value={item.content}
                                    onChange={(e) => handleContentChange(item.id, e.target.value)}
                                />

                                <Form
                                    layout="inline"
                                    style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', }} /* Flexbox 속성 추가 */
                                    onFinish={(values) => handleCharacterLimitChange(item.id, values.numberOfCharacters)} // 폼 제출 시 호출
                                    initialValues={{ numberOfCharacters: item.numberOfCharacters }}
                                >
                                    <p>글자수: </p>
                                    <Form.Item
                                        name="numberOfCharacters"
                                        rules={[
                                            { required: true, min: 0, message: '올바른 글자수를 입력해주세요!' },
                                            {
                                                validator: (_, value) =>
                                                    !isNaN(value) && value >= 0
                                                        ? Promise.resolve()
                                                        : Promise.reject(new Error('숫자만 입력 가능합니다.'))
                                            }]}
                                    >
                                        <Input
                                            style={{ width: 70 }}
                                            placeholder="500" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            변경
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>

                    ))}

                    <ButtonContainer>
                        <Button onClick={handleTotalSubmit}>
                            제출하기
                        </Button>
                    </ButtonContainer>
                    
                    <Modal show={showModal2} onHide={handleClose}>
                        <Modal.Header>
                            <Modal.Title>최종 제출 확인</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {`제출 하시겠습니까?`}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => {
                                handleSubmitYes();
                                navigate("/");
                            }} >
                                예
                            </Button>
                            <Button onClick={handleSubmitNo}>
                                아니오
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </ContainerTmp>
            )}    
            {showInputFile && (
                <ContainerTmp>
                    <p>전문가에게 첨삭받을 포트폴리오를 제출해주세요.  </p>
                    <Dragger {...uploadProps}>
                        <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files.
                        </p>
                    </Dragger>
                    <ButtonContainer>
                        <Button onClick={handleTotalSubmit}>
                            제출하기
                        </Button>
                    </ButtonContainer>
                    
                    <Modal show={showModal2} onHide={handleClose}>
                        <Modal.Header>
                            <Modal.Title>최종 제출 확인</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {`제출 하시겠습니까?`}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => {
                                handleSubmitYes();
                                navigate("/");
                            }} >
                                예
                            </Button>
                            <Button onClick={handleSubmitNo}>
                                아니오
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    

                </ContainerTmp>
            )}
                <br />
                <br />


            </Wrapper>
        </>

    );

}

export default HowToEdit;
