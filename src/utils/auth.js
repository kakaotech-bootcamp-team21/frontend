import React from "react";
import { useState } from 'react';

export const handleLogin = (type, setUserType) => {
    setUserType(type); // 회원(일반, 전문가)를 설정(상태 업데이트)
    localStorage.setItem('userType', type); // 로컬 스토리지에 사용자 유형 저장
};

export const handleLogout = (setUserType) => {
    setUserType(null); // 로그아웃 상태로 전환
    localStorage.removeItem('userType'); // 로컬 스토리지에서 사용자 유형 제거 
    localStorage.removeItem('userInfo'); // 로컬 스토리지에서 사용자 제거
};

export const getUserType = () => {
    return localStorage.getItem('userType') || null;
};