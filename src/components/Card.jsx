import React from "react"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

function CardExample({ props }) {
    return (
        // 아래는 하드코딩한 것
        <Card style={{ width: '12rem' }}>
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
                {/* <p>채팅 평균 응답 시간</p> */}
                <Card.Link as={Link} to="/how-to-edit">첨삭요청하기</Card.Link>
                <Card.Link as={Link} to="/how-to-edit">채팅하기</Card.Link>
            </Card.Body>
        </Card>
        
        // 백엔드 들어오면 하드코딩한 것 풀것임
        // <Card style={{ width: '12rem' }}>
        //     <Card.Img variant="top" src={imageUrl} alt={nickname} />
        //     <Card.Body>
        //         <Card.Title>{nickname}</Card.Title>
        //         <Card.Text>
        //             {description}
        //         </Card.Text>
        //     </Card.Body>
        //     <ListGroup className="list-group-flush">
        //         <ListGroup.Item>{specialty}</ListGroup.Item>
        //     </ListGroup>
        //     <Card.Body>
        //         <Card.Link as={Link} to="/how-to-edit">첨삭 요청하기</Card.Link>
        //     </Card.Body>
        // </Card>

    );
}

export default CardExample