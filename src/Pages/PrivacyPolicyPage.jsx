import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button } from "react-bootstrap";

const PrivacyPolicyPage = () => {
    const [checkedItems, setCheckedItems] = useState({
        agreement: false,
        personalInfo: false,
        privacyUsage: false,
    });
    const navigate = useNavigate();

    const handleCheckChange = (event) => {
        setCheckedItems({
            ...checkedItems,
            [event.target.name]: event.target.checked,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (Object.values(checkedItems).every(Boolean)) {
            navigate('/auth-verification-page'); // 본인인증 페이지로 이동
        } else {
            alert('모든 항목에 동의해주세요.');
        }
    };

    const scrollStyle = {
        height: '150px',
        overflowY: 'scroll',
        border: '1px solid #ced4da',
        padding: '10px',
        marginBottom: '10px',
        fontSize: '0.9rem'
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#F0F8FF' }}>
            <Card style={{ width: '90%', maxWidth: '600px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">약관동의</h2>
                    <p className="text-center mb-4" style={{ fontSize: '0.9rem' }}>
                        아래의 약관을 읽으신 후 동의하시면 체크박스를 클릭하여 주십시오.<br />
                        그 후, 가입버튼을 클릭하여 회원가입 페이지로 이동하실 수 있습니다.
                    </p>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <Form.Check
                                    type="checkbox"
                                    id="agreement"
                                    label="회원약관 동의 (필수)"
                                    name="agreement"
                                    checked={checkedItems.agreement}
                                    onChange={handleCheckChange}
                                />
                                <span>▼</span>
                            </div>
                            <div style={scrollStyle}>
                               <h6>회원약관</h6>

                                <p>
                                    <b> 제 1 장 총칙<br/></b>
                                    <b> 제 1 조 (목적)<br/></b>
                                        이 약관은 AI자소서첨삭서비스(이하 "서비스")의 이용조건 및 절차에 관한 사항과 기타 필요한 사항을 규정함을 목적으로
                                        합니다.<br/><br/>

                                        <b> 제 2 조 (정의)<br/></b>
                                            1. "서비스"란 AI자소서첨삭서비스가 제공하는 모든 서비스 및 기능을 말합니다.<br/>
                                            2. "회원"이란 서비스에 접속하여 이 약관에 따라 서비스 이용계약을 체결하고 서비스를 이용하는 자를 말합니다.<br/><br/>

                                            <b> 제 3 조 (약관의 효력 및 변경)<br/></b>
                                                1. 이 약관은 회원가입 시 회원에게 공지되고, 회원이 동의함으로써 효력이 발생합니다.<br/>
                                                2. 서비스는 약관의 변경이 필요하다고 인정되는 경우, 변경된 약관을 공지하며, 회원의 동의를 얻어 변경할 수 있습니다.
                                </p>


                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <Form.Check
                                    type="checkbox"
                                    id="personalInfo"
                                    label="개인정보처리방침 (필수)"
                                    name="personalInfo"
                                    checked={checkedItems.personalInfo}
                                    onChange={handleCheckChange}
                                />
                                <span>▼</span>
                            </div>
                            <div style={scrollStyle}>
                                <p>
                                 <b>  제 1 조 (개인정보의 처리 목적)<br/></b>
                                    본 서비스는 「개인정보 보호법」에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과
                                    같은 처리방침을 두고 있습니다.<br/><br/>

                                    <b>   제 2 조 (개인정보의 처리 및 보유 기간)<br/></b>
                                1. 서비스는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유·이용기간 내에서 개인정보를
                                    처리·보유합니다.<br/>
                                    2. 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.<br/>
                                    - 회원 가입 및 관리: 회원 탈퇴 시까지<br/>
                                    - 민원 처리: 민원 처리 종료 후 3년<br/>
                                    - 서비스 제공: 서비스 이용 종료 후 5년<br/><br/>

                                    <b>     제 3 조 (개인정보의 제3자 제공)<br/></b>
                            1. 서비스는 원칙적으로 이용자의 개인정보를 제1 조에서 명시한 범위 내에서 처리하며, 이용자의 사전 동의 없이는 동 범위를 초과하여 처리하거나
                                    제3자에게 제공하지 않습니다.<br/>
                                    2. 다만, 다음의 경우에는 개인정보를 제3자에게 제공할 수 있습니다.<br/>
                                    - 이용자가 사전에 제3자 제공 및 공개에 동의한 경우<br/>
                                    - 법령 등에 의해 제공이 요구되는 경우
                                </p>
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <Form.Check
                                    type="checkbox"
                                    id="privacyUsage"
                                    label="개인정보 제공 위탁 (필수)"
                                    name="privacyUsage"
                                    checked={checkedItems.privacyUsage}
                                    onChange={handleCheckChange}
                                />
                                <span>▼</span>
                            </div>
                            <div style={scrollStyle}>
                                <p>
                                    <b> 제 1 조 (개인정보의 처리 위탁)<br/> </b>
                                    서비스는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.<br/><br/>

                                    1. 위탁받는 자 (수탁자): [수탁자명]<br/>
                                    2. 위탁하는 업무의 내용: [위탁 업무 내용]<br/><br/>

                                    <b> 제 2 조 (개인정보의 안전성 확보 조치)<br/></b>
                                    서비스는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.<br/>
                                    1. 관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육 등<br/>
                                    2. 기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화<br/>
                                    3. 물리적 조치: 전산실, 자료보관실 등의 접근통제<br/><br/>

                                    <b> 제 3 조 (정보주체와 법정대리인의 권리·의무 및 행사방법)<br/></b>
                                    이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.<br/>
                                    1. 개인정보 열람요구<br/>
                                    2. 오류 등이 있을 경우 정정 요구<br/>
                                    3. 삭제요구<br/>
                                    4. 처리정지 요구<br/><br/>

                                    <b> 제 4 조 (개인정보 보호책임자)<br/></b>
                                        서비스는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이
                                        개인정보
                                        보호책임자를 지정하고 있습니다.<br/><br/>

                                        1. 개인정보 보호책임자: [이름]<br/>
                                        2. 연락처: [전화번호], [이메일]
                                </p>
                            </div>
                        </Form.Group>

                        <div className="d-flex justify-content-center mt-4">
                            <Button variant="primary" type="submit" className="me-2">확인</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default PrivacyPolicyPage;