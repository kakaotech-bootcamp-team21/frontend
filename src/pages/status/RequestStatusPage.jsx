import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from 'react';
import AI_Header from "../../components/headers/Header";
import AI_Navbar from '../../components/navbars/AiNavbar';


function RequestStatusPage(props) {


    const navigate = useNavigate();
    return (
        <>
            <AI_Header/>
            <AI_Navbar/>
        </>

    );

}

export default RequestStatusPage;