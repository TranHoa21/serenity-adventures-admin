import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import "../../app/style/components/messageinput.scss"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const { loading, sendMessage } = useSendMessage();
    const senderId = useSelector((state: RootState) => state.user.id);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message) return;
        await sendMessage({ content: message, sender: senderId, timestamp: Date.now() });

        setMessage("");
    };

    return (
        <form className='input-mess' onSubmit={handleSubmit}>
            <div className='in-box'>
                <input
                    type='text'
                    className='mess-in'
                    placeholder='Send a message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type='submit' className='btn-message'>
                    {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
                </button>
            </div>
        </form>
    );
};
export default MessageInput;

