import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from 'react';
import { Avatar } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';
import AIHeaderNavbar from "../ai/AIHeaderNavbar";

import { List, Card, Badge, Button } from 'antd';
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

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
    const data = [
        {
            id: 1,
            expertInfo: "한세계",
            requestDate: "2024-07-01 14:00",
            type: "게시글",
            status: "첨삭 하기",
            essayQuestion: "OOOO를 지원한 이유와 입사 후 회사에서 이루고 싶은 꿈을 기술하십시오.",
            essayContent: "여기에 자소서 내용이 들어갑니다...",
        },
        {
            id: 2,
            expertInfo: "두세계",
            requestDate: "2024-08-03 10:30",
            type: "영상통화",
            status: "후기 작성 대기중",
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
            <AIHeaderNavbar></AIHeaderNavbar>
            <div style={{ paddingTop: '50px', paddingRight: '30px', display: 'flex', justifyContent: 'flex-end' }}>
                <Button>내 첨삭 보관함 가기</Button>
            </div>
            <div style={{ paddingLeft: '30px' }}>
                <Heading>요청 사항</Heading>
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    ?건의 요청 사항이 있습니다.
                </div>
                <Card style={{ width: '30%', paddingTop: '16px', marginTop: '16px' }}>
                    <div style={{ display: 'flex' }}>
                        <img
                            src="/man.png"
                            alt="circle image"
                            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                        />
                        <h3>요청자 닉네임</h3>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <p>요청일자: 2024년 0월 0일</p>
                    </div>
                    <div>
                        <text> 취업준비 2트째 입니다. 잘 부탁드립니다. </text>
                    </div>
                    <div style={{ display: 'flex', paddingTop: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexGrow: 1 }}>
                            <Button>자세히 보기</Button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button>수락</Button>
                            <Button>거절</Button>
                        </div>
                    </div>
                </Card>

            </div >
            <div style={{ paddingLeft: '30px' }}>
                <Heading>첨삭 진행 현황</Heading>
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    ?건의 첨삭이 진행중입니다.
                </div>
            </div >
            <Wrapper>

                <ContainerTmp>
                    <ContainerRight>
                        총 {requestCnt}건
                    </ContainerRight>
                    <List
                        dataSource={data}
                        renderItem={(item, index) => (
                            <List.Item>
                                <Card
                                    title={`전문가: ${item.expertInfo}`}
                                    extra={
                                        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                                            <Badge status="processing" />
                                            <span style={{ marginLeft: '8px', lineHeight: '1.2' }}>{item.status}</span>
                                        </div>
                                    }
                                    style={{ width: '100%', paddingTop: '16px' }}
                                    actions={[
                                        <Button onClick={() => navigate("/video-chat")}>온라인 피드백룸</Button>,
                                        <Button onClick={() => navigate("/chat-room")}>채팅으로 상담하기</Button>
                                    ]}
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