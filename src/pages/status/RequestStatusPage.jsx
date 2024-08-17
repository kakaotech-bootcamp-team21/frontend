import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from 'react';
import AI_Header from "../../components/headers/Header";
import AI_Navbar from '../../components/navbars/AiNavbar';
import { Avatar } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';

import { List, Card, Badge, Button } from 'antd';

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Heading = styled.h1`
    margin-top: 40px;
    margin-bottom: 40px;
`;

const ContainerRight = styled.div`
    width: 100%;  /* 부모 요소의 전체 너비를 차지하도록 설정 */
    display: flex;
    justify-content: flex-end; /* 오른쪽으로 정렬 */
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

function RequestStatusPage(props) {
    const [requestCnt, setRequestCnt] = useState(2);

    const navigate = useNavigate();

    const { Panel } = Collapse;

    //     const data = [
    //         {
    //             title: '삼평동 백엔드 개발자',
    //         },
    //         {
    //             title: '성수동 웹 디자이너',
    //         },
    //         {
    //             title: '시청역 중고 기획자',
    //         },
    //         {
    //             title: '강남역 서버 개발자',
    //         },
    //     ];
    //     const question =  `OOOO를 지원한 이유와 입사 후 회사에서 이루고 싶은 꿈을 기술하십시오. 
    // `
    //     const content = `
    //   A dog is a type of domesticated animal.
    //   Known for its loyalty and faithfulness,
    //   it can be found as a welcome guest in many households across the world.
    // `;
    const data = [
        {
            id: 1,
            expertInfo: "한세계",
            requestDate: "2024-07-01 14:00",
            type: "게시글",
            status: "첨삭 중",
            essayQuestion: "OOOO를 지원한 이유와 입사 후 회사에서 이루고 싶은 꿈을 기술하십시오.",
            essayContent: "여기에 자소서 내용이 들어갑니다...",
        },
        {
            id: 2,
            expertInfo: "두세계",
            requestDate: "2024-08-03 10:30",
            type: "영상통화",
            status: "첨삭 대기중",
            acceptDate: "2024-08-18 10:30",
            essayQuestion: "OOOO를 지원한 이유와 입사 후 회사에서 이루고 싶은 꿈을 기술하십시오.",
            essayContent: "여기에 자소서 내용이 들어갑니다...",
        },
    ];

    const panelStyle = {
        marginBottom: 24,
        background: '#f7f7f7',
        borderRadius: 4,
        border: 'none',
    };

    return (
        <>
            <AI_Header />
            <AI_Navbar />
            <Wrapper>
                <Heading>첨삭 요청 현황</Heading>
                <ContainerRight>
                    총 {requestCnt}건
                </ContainerRight>
                {/* <ContainerTmp>
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

                </ContainerTmp> */}
                <ContainerTmp>
                    <List
                        dataSource={data}
                        renderItem={(item, index) => (
                            <List.Item>
                                <Card
                                    
                                    title={`전문가: ${item.expertInfo}`}
                                    extra={<Badge status="processing" text={item.status} />}
                                    style={{ width: '100%' }}
                                >
                                    <p>요청일시: {item.requestDate}</p>
                                    <p>종류: {item.type}</p>
                                    <p>진행일시: {item.acceptDate}</p>
                                    <Collapse
                                        bordered={false}
                                        defaultActiveKey={['1']}
                                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                        style={panelStyle}
                                    >
                                        <Panel header="요청 자소서 접기/열기" key="1">
                                            <p>질문: {item.essayQuestion}</p>
                                            <p>내용: {item.essayContent}</p>
                                        </Panel>
                                    </Collapse>
                                    <Button onClick={() => navigate("/video-chat")}>온라인 피드백룸</Button>
                                    
                                </Card>
                            </List.Item>
                        )}
                    />
                </ContainerTmp>

            </Wrapper>
        </>

    );

}

export default RequestStatusPage;