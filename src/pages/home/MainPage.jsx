import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/buttons/Button";
//import NavBar from "../ui/Navbar";
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Card from "../../components/Card";
import { handleLogin, handleLogout } from '../../utils/auth';
import { Link } from 'react-router-dom';
import AI_Header from "../../components/headers/Header";
import AI_Navbar from '../../components/navbars/AiNavbar';
import { Avatar, List } from 'antd';
import axios from 'axios';


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

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];


const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px; // 버튼 아래 여백 추가
`;

const Heading = styled.h2`
    margin-top: 40px;
    margin-bottom: 40px;
`;


const districts = [
    { name: 'IT/인ss터넷', content: 'IT/인터넷의 정보입니다.' },
    { name: '연구개발/설계', content: '연구개발/설계의 정보입니다.' },
    { name: '의료', content: '의료의 정보입니다.' },
    { name: '전문/특수직', content: '전문/특수직의 정보입니다.' },
];

function MainPage(props) {
    const [userType, setUserType] = useState(() => {
        return localStorage.getItem('userType') || null;
    });

    const [selectedDistricts, setSelectedDistricts] = useState([]);

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        if (checked) {
            setSelectedDistricts([...selectedDistricts, name]);
        } else {
            setSelectedDistricts(selectedDistricts.filter(district => district !== name));
        }
    };



    const fetchCategories = async () => {
        try {
            // axios 사용해 백엔드 API 호출
            const response = await axios.get("http://localhost:8080/api/categories", {
            });
            setCategories(response.data.categories);
            console.log('response categories: ', categories)
        } catch (error) {
            console.error("Error fetching categories: ", error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);



    const renderContent = () => {
        // 원래 industries 였음
        return districts
            .filter(district => selectedDistricts.includes(district.name))
            .map(district => (
                <div key={district.name}>
                    <h3>{district.name}</h3>
                    <p>{district.content}</p>
                </div>
            ));
    };
    //기존버전
    // const renderContent = () => {
    //     return industries
    //         .filter(industry => selectedIndustries.includes(industry.id))
    //         .map(industry => (
    //             <div key={industry.id}>
    //                 <h3>{industry.name}</h3>
    //                 <p>{industry.content}</p>
    //             </div>
    //         ));
    // };

    const renderNavLinks = () => {
        if (userType === 'regular') {
            return (
                <>
                    <Nav.Link as={Link} to="/request-expert">전문가에게 첨삭요청</Nav.Link>
                    {/*이 버튼 누르면 앨리스가 만든 페이지로 이동 가능하게함*/}
                    <Nav.Link as={Link} to="/ai-main">AI에게 첨삭요청</Nav.Link>
                    <Nav.Link href="#pricing">합격자소서 모음집</Nav.Link>
                    <Nav.Link href="#pricing2">보낸 요청</Nav.Link>
                    {/*일단 임시로 만든 항목이니 나중에 지워도 되니까 신경 안써도 됌*/}
                    <Nav.Link as={Link} to="/Mypage">마이페이지</Nav.Link>
                    <Nav.Link as={Link} to="/login">로그인하기</Nav.Link>
                </>
            );
        } else if (userType === 'expert') {
            return (
                <>
                    <Nav.Link href="#pricing">합격자소서 모음집</Nav.Link>
                    <Nav.Link href="#home">받은 요청</Nav.Link>
                </>
            );
        } else {
            return (
                <>
                    <Nav.Link href="#pricing">합격자소서 모음집</Nav.Link>
                </>
            );
        }
    }

    const navigate = useNavigate();

    return (


        <>
            <AI_Header />
            <AI_Navbar />
            <Wrapper>
                <ButtonWrapper>
                    {userType === null ? (
                        <>
                            <Button
                                title="로그인/회원가입"
                                onClick={() => {
                                    handleLogin('regular', setUserType);
                                    navigate("/login");
                                }}
                            />
                        </>
                    ) : userType === 'regular' ? (
                        <>
                            {/*이 버튼을 어떻게 처리할지 생각해야 할듯 이 버튼때문에 상단바가 깔끔하게 안보이고 위에 공백이 생김*/}
                            {/* <Button
                            title="마이페이지" // 마이페이지에서 로그아웃 하게 해야하는게 좋을듯? 
                            onClick={() => {
                                navigate("/mypage");
                            }}
                        /> */}
                        </>
                    ) : (
                        <>
                            <Button
                                title="전문가 페이지"
                                onClick={() => {
                                    navigate("/expert");
                                }}
                            />
                            <Button
                                title="로그아웃"
                                onClick={handleLogout}
                            />
                        </>
                    )}
                </ButtonWrapper>
                <ContainerTmp>
                    {/* <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand as={Link} to="/">홈</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto" >
                                {renderNavLinks()}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar> */}
                    <Heading>관심 분야 전문가 찾기</Heading>
                    <Container>
                        <h3>관심 직업 태그</h3>
                        <p>관심 있는 직업 태그를 선택하여 첨삭 가능 전문가를 확인해 보세요.</p>
                        <Form>
                            <Row>
                                {/*categories 가 districts 로 바뀜*/}
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
                        <h3>첨삭 가능 전문가</h3>
                        <Card>

                        </Card>

                    </Container>
                    <Heading>이용자들이 들려주는 서비스 이용 후기</Heading>
                    <Container className="py-5">
                        <h3>AI 첨삭 이용 후기</h3>
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                        title={<a href="https://ant.design">{item.title}</a>}
                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                    />
                                </List.Item>
                            )}
                        />

                    </Container>

                    <Container className="py-5">
                        <h3>전문가 첨삭 이용 후기</h3>
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                        title={<a href="https://ant.design">{item.title}</a>}
                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                    />
                                </List.Item>
                            )}
                        />

                    </Container>



                </ContainerTmp>
            </Wrapper>
        </>
    );
}

export default MainPage;