import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateConversationUnread } from "../app/store/actions/messActions";

const useWebSocket = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const socket = new WebSocket('ws://serenity-adventures-demo.onrender.com');

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            dispatch(updateConversationUnread(message.conversationId, message.unreadCount, message.unread));
        };

        return () => {
            socket.close();
        };
    }, [dispatch]);
};

export default useWebSocket;
