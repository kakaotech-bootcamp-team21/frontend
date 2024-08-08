import React from "react"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function CardExample(props) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="/man.png" />
            <Card.Body>
                <Card.Title>닉네임</Card.Title>
                <Card.Text>
                    간단 자기 소개
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>전문가 분야/직업군</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Card.Link href="#">첨삭 요청하기</Card.Link>
            </Card.Body>
        </Card>
    );
}

export default CardExample