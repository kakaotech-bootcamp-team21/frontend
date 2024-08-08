import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../ui/Button";
//import NavBar from "../ui/Navbar";
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Card from "../ui/Card";


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
    max-width: 720px;
    
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

const districts = [
    { name: 'IT/인터넷', content: 'IT/인터넷의 정보입니다.' },
    { name: '연구개발/설계', content: '연구개발/설계의 정보입니다.' },
    { name: '의료', content: '의료의 정보입니다.' },
    { name: '전문/특수직', content: '전문/특수직의 정보입니다.' },
];

function MainPage(props) {
    //const { } = props;
    const [selectedDistricts, setSelectedDistricts] = useState([]);

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        if (checked) {
            setSelectedDistricts([...selectedDistricts, name]);
        } else {
            setSelectedDistricts(selectedDistricts.filter(district => district !== name));
        }
    };

    const renderContent = () => {
        return districts
            .filter(district => selectedDistricts.includes(district.name))
            .map(district => (
                <div key={district.name}>
                    <h3>{district.name}</h3>
                    <p>{district.content}</p>
                </div>
            ));
    };

    const navigate = useNavigate();

    return (
        <Wrapper>
            <ContainerTmp>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#">메뉴</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#home">전문가에게 첨삭 요청하기</Nav.Link>
                                <Nav.Link href="#features">AI에게 첨삭 요청하기</Nav.Link>
                                <Nav.Link href="#pricing">합격 자소서 모아보기</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <br/>
                <br/>
                <Container>
                    <h3>관심 직업 태그</h3>
                    <Form>
                        <Row>
                            {districts.map(district => (
                                <Col key={district.name} xs={6} md={4}>
                                    <Form.Check
                                        type="checkbox"
                                        label={district.name}
                                        name={district.name}
                                        onChange={handleCheckboxChange}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Form>
                    <div style={{ marginTop: '20px' }}>
                        {renderContent()}
                    </div>
                </Container>
                <Container className="py-5">
                    <h3>보유 멘토 현황</h3>
                    <Card>
                            
                    </Card>       

                </Container>
                <Container className="py-5">
                    <h3>AI/전문가 첨삭 리뷰 모음집</h3>
                    <Card>
                            
                    </Card>       

                </Container>

                <Button
                    title="버튼"
                    onClick={() => {
                        navigate("/subPage");
                    }}
                />

            </ContainerTmp>
        </Wrapper>
    );
}

export default MainPage;