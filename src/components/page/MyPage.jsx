import React from "react";
import styled from "styled-components";
import Button from "../ui/Button";
import { handleLogin, handleLogout, getUserType } from '../../utils/auth';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
    margin-bottom: 16px; // 버튼 아래 여백 추가
`;


function MyPage(props) {
    const [userType, setUserType] = useState(getUserType());
    const navigate = useNavigate();

    return (
        <Wrapper>
            <ButtonWrapper>
                {userType === 'regular' ? (
                    <>
                        <Button
                            title="로그아웃" 
                            onClick={() => {
                                handleLogout(setUserType);
                                navigate("/");
                            }}
                        />
                    </>
                ) : (
                    <>
                        <Button
                            title="로그아웃"
                            onClick={handleLogout(setUserType)}
                        />
                    </>
                )}
            </ButtonWrapper>
            <br/>
            <br/>
            <p>마이 페이지입니다. </p>
        </Wrapper>
    );

}

export default MyPage;