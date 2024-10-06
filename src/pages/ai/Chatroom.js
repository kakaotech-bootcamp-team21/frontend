import React, { useState, useRef, useEffect } from 'react';
import '../../css_ai/Chatroom.css'
import AIHeaderNavbar from "./AIHeaderNavbar";
import { Flex, Layout } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Segmented } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const headerStyle = {
  textAlign: 'center',
  // color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#ffffff',
  borderTopLeftRadius: '8px', // 부모와 동일한 border-radius 적용
  borderTopRightRadius: '8px',
};
const contentStyle = {
  textAlign: 'left',
  minHeight: 120,
  lineHeight: '30px',
  padding: '0',
  backgroundColor: '#ffffff',
};

const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#ffffff',

  
};
const layoutStyle = {
  borderRadius: 40,
  overflow: 'hidden',
  width: '90%',
  height: '700px',
  maxWidth: '1400px',
  boxShadow: '2px 2px 15px 5px rgba(0, 0, 0, 0.7)',
};

function Chatroom() {
  const [chatMessages, setChatMessages] = useState([]);

  const chatInputRef = useRef(null);

  const sendMessage = () => {
    const message = chatInputRef.current.value;
    console.log('hi',message);
    if (message.trim()) {
      setChatMessages([...chatMessages, `사용자: ${message}`]);
      chatInputRef.current.value = '';
    }
  };

  return (
    <div>
      <AIHeaderNavbar></AIHeaderNavbar>
      <div>
        {/* <h1 className='chatroom-title'>
          </h1> */}
      </div>
      <div style={{
        paddingTop: '70px',
        display: 'flex',
        margin: '0 auto',
        width: '50%',
        justifyContent: 'center', // 가로축 가운데 정렬
        alignItems: 'center', // 세로축 가운데 정렬

        // 부모 컨테이너를 화면 전체 높이로 설정
      }}>
        <Layout style={layoutStyle}>
          <Header style={headerStyle}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* Avatar를 왼쪽에 배치 */}
              <Avatar
                style={{
                  backgroundColor: '#87d068',
                  marginRight: '10px', // Avatar와 오른쪽 콘텐츠 사이에 간격을 줌
                }}
                icon={<UserOutlined />}
              />

              {/* Avatar 오른쪽에 세로로 나열될 div들을 감싸는 컨테이너 */}
              <div style={{ display: 'flex', flexDirection: 'column', fontSize: '8px', lineHeight: '2', marginTop: '7px' }}>
                <div style={{ fontSize: '14px', margin: '0' }}>User 3</div>
                <div style={{ fontSize: '12px', margin: '0' }}>산업군/직업</div>
              </div>
            </div>

          </Header>
          <Content style={contentStyle}>
              <div className="chat-messages">
                {chatMessages.map((msg, index) => (
                  <div style={{margin: 0}} key={index}>{msg}</div>
                ))}
              </div>
          </Content>
          <Footer style={footerStyle}>
            <input
              style={{
                borderRadius: '30px',
                width:'100%',
                backgroundColor: '#e0e0e0',
              }}
              type="text"
              placeholder="메시지를 입력하세요..."
              className="chat-input"
              ref={chatInputRef}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  
                  sendMessage();
                }
              }}
            />
          </Footer>
        </Layout>
      </div>
    </div>
  );
}

export default Chatroom;