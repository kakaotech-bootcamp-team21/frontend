import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AI_Navbar from '../navbars/AiNavbar';
import AI_Header from '../headers/Header';
import Button from "../../components/buttons/Button";
import { handleLogout } from '../../utils/auth';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';  // 모달 추가
import { Button as BootstrapButton } from 'react-bootstrap';

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
`;

function NavBar() {
    const [userType, setUserType] = useState(() => {
        return localStorage.getItem('userType') || null;
    });

    const location = useLocation();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [timerId, setTimerId] = useState(null); // 타이머 ID를 저장

    useEffect(() => {
        const userT = localStorage.getItem('userInfo');
        if (userT) {
            setUserType(userT);
        } else {
            setUserType(null);
        }
    }, [location]);

    const handleLogoutWithModal = () => {
        setShowModal(true); // 모달 띄우기

        const id = setTimeout(() => {
            handleLogout(setUserType); // 로그아웃 처리
            setShowModal(false); // 모달 닫기
            navigate('/'); // 3초 후 / 경로로 이동
        }, 3000);

        setTimerId(id); // 타이머 ID 저장
    };

    const handleImmediateLogout = () => {
        if (timerId) {
            clearTimeout(timerId); // 타이머를 취소
        }
        handleLogout(setUserType); // 로그아웃 처리
        setShowModal(false); // 모달 닫기
        navigate('/'); // 즉시 / 경로로 이동
    };

    // 특정 페이지 경로에 따라 <Wrapper> 비활성화
    const currentPath = location.pathname;
    const hideWrapperPaths = ['/login', '/signup', '/privacy-policy']; // <Wrapper>를 숨길 경로

    return (
        <div>
            <AI_Header />
            <AI_Navbar />

            {/* 조건부 렌더링: 특정 경로에 있을 때 <Wrapper> 비활성화 */}
            {!hideWrapperPaths.includes(currentPath) && (
                <Wrapper>
                    <ButtonWrapper>
                        {userType === null ? (
                            <>
                                <Button
                                    title="로그인/회원가입"
                                    onClick={() => navigate("/login")}
                                />
                            </>
                        ) : userType === 'regular' ? (
                            <>
                                {/* regular 사용자에 대한 버튼 처리 */}
                            </>
                        ) : (
                            <>
                                <Button
                                    title="로그아웃"
                                    onClick={handleLogoutWithModal} // 로그아웃 클릭 시 모달 띄우기
                                />
                            </>
                        )}
                    </ButtonWrapper>
                </Wrapper>
            )}

            {/* 모달 창 */}
            <Modal
                show={showModal}
                onHide={handleImmediateLogout} // 모달 외부 클릭 시 즉시 로그아웃 및 이동
                backdrop={true} // 모달 외부 클릭 감지
                keyboard={true} // ESC 키로 닫기 가능
            >
                <Modal.Header closeButton>
                    <Modal.Title>알림</Modal.Title>
                </Modal.Header>
                <Modal.Body onClick={handleImmediateLogout}> {/* 모달 내부 클릭 시 즉시 이동 */}
                    로그아웃 되었습니다.
                </Modal.Body>
                <Modal.Footer>
                    <BootstrapButton
                        variant="secondary"
                        onClick={handleImmediateLogout} // 닫기 버튼 클릭 시 즉시 이동
                    >
                        닫기
                    </BootstrapButton>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default NavBar;
