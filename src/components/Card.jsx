import React from "react"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

function CardExample({ nickname, profile, industries, occupation }) {
    return (
        <Card style={{ width: '12rem' }}>
            <Card.Img variant="top" src="/man.png" />
            <Card.Body>
                <Card.Title>{nickname || "닉네임"}</Card.Title>
                <Card.Text>
                    {profile || "간단 자기 소개"}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>{industries || "전문가 분야"}/{occupation || "직업"}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                {/* <p>채팅 평균 응답 시간</p> */}
                <Card.Link as={Link} to="/how-to-edit">첨삭요청하기</Card.Link>
                <Card.Link as={Link} to="/how-to-edit">채팅하기</Card.Link>
            </Card.Body>
        </Card>
    );
}

export default CardExample