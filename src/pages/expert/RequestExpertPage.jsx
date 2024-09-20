import React from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useEffect } from 'react';

import styled from "styled-components";
import { Form, Row, Col } from 'react-bootstrap';
import Card from "../../components/Card";
import CardExample from "../../components/Card";

import AI_Header from "../../components/headers/Header";
import AI_Navbar from '../../components/navbars/AiNavbar';

import axios from 'axios';
import { Select, Space } from 'antd';

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
    margin-top: 40px;
    margin-bottom: 40px;
`;




function RequestExpert(props) {
    const [userType, setUserType] = useState(() => {
        return localStorage.getItem('userType') || null;
    });

    const [categories, setCategories] = useState([]);
    const [industries, setIndustries] = useState([]);
    const [experts, setExperts] = useState({});

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedIndustries, setSelectedIndustries] = useState([]);
    const [selectedExperts, setSelectedExperts] = useState();

    const fetchCategories = async () => {
        try {
            // axios 사용해 백엔드 API 호출
            const response = await axios.get("http://localhost:8080/api/categories", {
            });
            setCategories(response.data.categories);
        } catch (error) {
            console.error("Error fetching categories: ", error);
        }
    }

    const fetchIndustries = async (id) => {
        try{
            // axios 사용해 백엔드 API 호출
            const response = await axios.get(`http://localhost:8080/api/categories/${id}/industries`, {
            });
            setIndustries(response.data.industries);
            console.log('response industries: ', industries)
        } catch (error) {
            console.error("Error fetching industries: ", error);
        }
    }

    const fetchExperts = async (id) => {
        try{
            const response = await axios.get(`http://localhost:8080/api/industries/${id}/specialUsers`, {
            });
            setExperts(response.data.specialists);
            // setExperts((prevExperts) => [...prevExperts, ...response.data.specialists]);
            // setExperts((prevExperts) => ({
            //     ...prevExperts, // 기존의 다른 산업의 전문가들을 유지
            //     [id]: response.data.specialists, // 새로운 산업 전문가들 추가
            // }));
        } catch (error) {
            console.error("Error fetching experts: ", error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        console.log('Updated categories: ', categories);
    }, [categories]);

    useEffect(() => {
        console.log('Updated industries: ', industries);
    }, [industries]);


    useEffect(() => {
        console.log('Updated experts: ', experts);
    }, [experts]);

    const handleChange = (value) => {
        console.log(`selected ${value}`);
      };

    const handleChangeCategory = (value) => {
        console.log('event.target: ', value)
        if (value) {
            console.log('checked id: ', value)
            fetchIndustries(value)
            setSelectedIndustries([...selectedIndustries, value])
        } else {
            setSelectedIndustries(selectedIndustries.filter(industry => industry !== value));
        }
    };

    const handleChangeIndustry = (value) => {
        console.log('event handleChangeIndustry', value)

        if (value) {
            console.log('checked industry id: ', value);
            fetchExperts(value);
        } 
    };
    
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
            <Wrapper>
                <Heading>내 분야 첨삭 가능 전문가 찾아보기</Heading>
                <ContainerTmp>
                    <>
                        <Container className="py-5">
                            <p>관심 있는 카테고리와 관련 산업을 선택하여 첨삭 가능 전문가를 확인해 보세요.</p>
                            <h3>관심 카테고리</h3>
                            <Select
                                defaultValue="전문가 산업"
                                style={{
                                    width: 500,
                                }}
                                onChange={handleChangeCategory}
                                options={categories.map(category => ({
                                    value: category.id,
                                    label: category.name,
                                }))}
                            />
                        </Container>
                        <Container className="py-5">
                            <h3>카테고리 관련 산업</h3>
                            <Select
                                defaultValue="전문가 산업"
                                style={{
                                    width: 500,
                                }}
                                onChange={handleChangeIndustry}
                                options={industries.map(industry => ({
                                    value: industry.id,
                                    label: industry.name,
                                }))}
                            />
                        </Container>
                    </>
                    <>
                        <Container className="py-5">
                            <h3>첨삭 가능 전문가</h3>
                            <StyleRow>
                                {Object.values(experts).length > 0 ? (
                                    Object.values(experts).map((expert) => (
                                        <CardExample 
                                            key = {expert.id} 
                                            nickname={expert.nickname}
                                            profile={expert.profile}
                                            industries={expert.industry}
                                            occupation={expert.occupation}
                                        >
                                        </CardExample>
                                ))
                            ) : (
                                <p>관련 산업에 등록된 전문가가 없습니다. </p>
                            )}
                            </StyleRow>
                        </Container>
                    </>
                </ContainerTmp>
            </Wrapper>
        </>
    );
}

export default RequestExpert;