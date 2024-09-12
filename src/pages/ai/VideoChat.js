import React, { useState, useRef, useEffect } from 'react';
import './VideoChat.css';
import { useNavigate } from 'react-router-dom';
import AIHeaderNavbar from "./AIHeaderNavbar";

const VideoChat = () => {
    const [isMuted, setIsMuted] = useState(true);
    const [isVideoOff, setIsVideoOff] = useState(true);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [volumeLevel, setVolumeLevel] = useState(0);
    const [chatMessages, setChatMessages] = useState([]);
    const videoRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const streamRef = useRef(null);
    const dataArrayRef = useRef(null);
    const chatInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const setupAudio = async () => {
        if (!streamRef.current) {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
        }

        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        const source = audioContextRef.current.createMediaStreamSource(streamRef.current);
        source.connect(analyserRef.current);
        analyserRef.current.fftSize = 256;
        const bufferLength = analyserRef.current.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);

        const getVolume = () => {
            analyserRef.current.getByteFrequencyData(dataArrayRef.current);
            const sum = dataArrayRef.current.reduce((a, b) => a + b, 0);
            setVolumeLevel(Math.round(sum / bufferLength));
            requestAnimationFrame(getVolume);
        };
        getVolume();
    };

    const startVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            streamRef.current = stream;
            videoRef.current.srcObject = stream;
            setIsVideoOff(false);
            setIsMuted(false);
            await setupAudio();
        } catch (error) {
            console.error('Error accessing media devices.', error);
        }
    };

    const stopVideo = () => {
        streamRef.current.getVideoTracks().forEach(track => track.stop());
        setIsVideoOff(true);
    };

    const toggleMute = async () => {
        if (streamRef.current) {
            const audioTracks = streamRef.current.getAudioTracks();
            if (audioTracks.length > 0) {
                audioTracks.forEach(track => (track.enabled = !track.enabled));
                setIsMuted(!isMuted);
                if (!isMuted && !audioContextRef.current) {
                    await setupAudio();
                }
            } else {
                // 오디오 트랙이 없는 경우, 새로운 오디오 스트림을 시작합니다.
                try {
                    const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    streamRef.current.addTrack(audioStream.getAudioTracks()[0]);
                    setIsMuted(false);
                    await setupAudio();
                } catch (error) {
                    console.error('Error starting audio:', error);
                }
            }
        } else {
            // 스트림이 없는 경우, 새로운 오디오 스트림을 시작합니다.
            try {
                const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                streamRef.current = audioStream;
                setIsMuted(false);
                await setupAudio();
            } catch (error) {
                console.error('Error starting audio:', error);
            }
        }
    };

    const toggleVideo = () => {
        if (isVideoOff) {
            startVideo();
        } else {
            stopVideo();
        }
    };

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    const sendMessage = () => {
        const message = chatInputRef.current.value;
        if (message.trim()) {
            setChatMessages([...chatMessages, `사용자: ${message}`]);
            chatInputRef.current.value = '';
        }
    };

    return (
        <div>
            <AIHeaderNavbar></AIHeaderNavbar>
        <div className="video-chat-container">
            <div className="video-area">
                <video ref={videoRef} autoPlay playsInline muted={isMuted} className={isVideoOff ? 'video-off' : ''}></video>
                {isVideoOff && <div className="video-off-overlay"></div>}
                {!isMuted && (
                    <div className="volume-meter">
                        <div
                            className="volume-bar"
                            style={{
                                height: `${volumeLevel}%`,
                                backgroundColor: `rgba(255, ${165 - volumeLevel}, 0, 1)`
                            }}
                        ></div>
                    </div>
                )}
            </div>
            <div className="controls">
                <button onClick={toggleMute} className="control-button">
                    {isMuted ? '마이크 켜기' : '마이크 끄기'}
                </button>
                <button onClick={toggleVideo} className="control-button">
                    {isVideoOff ? '비디오 시작' : '비디오 중지'}
                </button>
                <button onClick={toggleChat} className="control-button">
                    {isChatOpen ? '채팅 닫기' : '채팅 열기'}
                </button>
                <button onClick={() => navigate('/')} className="control-button">
                    홈으로
                </button>
            </div>
            {isChatOpen && (
                <div className="chat-area">
                    <div className="chat-messages">
                        {chatMessages.map((msg, index) => (
                            <div key={index}>{msg}</div>
                        ))}
                    </div>
                    <input
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
                </div>
            )}
        </div>
        </div>
    );
};

export default VideoChat;