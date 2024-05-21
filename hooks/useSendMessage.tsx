import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store/store";
import { setMessages, updateConversationUnread } from "../app/store/actions/messActions";
import axiosInstance from "../app/api/axiosInstance";
import { io, Socket } from "socket.io-client";

interface Message {
    content: string;
    sender: any;
    timestamp: number;
}

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { selectedConversation } = useSelector((state: RootState) => state.mess);
    const { messages } = useSelector((state: RootState) => state.mess);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketInstance = io("https://serenity-adventures-demo.onrender.com/");

        socketInstance.on("connect", () => {
            console.log("Connected to server");
        });

        socketInstance.on("disconnect", () => {
            console.log("Disconnected from server");
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    const sendMessage = async (message: Message) => {
        setLoading(true);
        try {
            if (!selectedConversation?.id) {
                throw new Error("No conversation selected");
            }
            const res = await axiosInstance.post(`https://serenity-adventures-demo.onrender.com/api/v1/messages/send/${selectedConversation.id}`, message);
            const data = await res.data;
            if (data.error) throw new Error(data.error);

            if (socket) {
                const newMessage = {
                    receiverId: selectedConversation.id,
                    senderId: message.sender,
                    messageContent: message.content,
                    unreadCount: 1
                };
                socket.emit("newMessage", newMessage);
            }
            dispatch(updateConversationUnread(selectedConversation.id, true, 1));
            dispatch(setMessages([...messages, data]));

        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
}

export default useSendMessage;
