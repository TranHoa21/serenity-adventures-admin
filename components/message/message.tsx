"use client"

import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import { extractTime } from "../../utils/extractTime";
import "../../app/style/components/message.scss"
import axios from "axios";
import { useEffect, useState } from "react";
import { getAuthCookie } from "../../utils/cookies"

interface Message {
    senderId: string;
    createdAt: Date;
    message: string;
    shouldShake: any;
}

interface User {
    avatar?: string;
    name: string;
    id: string | number;
}

const Message: React.FC<{ message: Message }> = ({ message }) => {
    const [storedUser, setStoredUser] = useState<User | null>(null);
    const userId = getAuthCookie().userId;
    const fromMe = String(message.senderId) === String(userId);
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? "chat-start" : "chat-and";
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";
    const shakeClass = message.shouldShake ? "" : "";
    const profilePic = fromMe ? storedUser?.avatar : "";


    useEffect(() => {
        if (userId) {
            const fetchUser = async () => {
                try {
                    const response = await axios.get(`https://serenity-adventures-demo.onrender.com/api/v1/user/${message.senderId}`);
                    const userData = response.data;

                    setStoredUser(userData);

                } catch (error) {
                    console.error('Lỗi khi lấy thông tin người dùng:', error);
                }
            };

            fetchUser();
        }
    }, [userId]);


    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>

                <img className="avatar-mess" alt='Tailwind CSS chat bubble component' src={profilePic} />

            </div>
            <div className={`chat-bubble ${bubbleBgColor} ${shakeClass}`}>{message.message}</div>
            <div className='chat-footer'>{formattedTime}</div>
        </div>
    )
}

export default Message;
