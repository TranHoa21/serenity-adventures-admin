
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';

import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./message";
import useListenMessages from "../../hooks/useListenMessages";
import { RootState } from '../../app/store/store';
import "../../app/style/components/messageinput.scss"


const ListMessages = () => {
    const { loading } = useGetMessages();
    const { messages } = useSelector((state: RootState) => state.mess)
    useListenMessages();
    const messagesEndRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        // Scroll to the bottom of the message list when component mounts or messages update
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className='mes-box'>
            {!loading &&
                messages.length > 0 &&
                messages.map((message) => (
                    <div key={message.id} ref={messagesEndRef}>
                        <Message message={message} />
                    </div>
                ))}

            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
            {!loading && messages.length === 0 && (
                <p className='text-center'>Send a message to start the conversation</p>
            )}
        </div>
    );
}

export default ListMessages;