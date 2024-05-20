import { useEffect } from "react";
import Messages from "./listMessages";
import MessageInput from "./MessageInput";
import { RootState } from "../../app/store/store";
import { useDispatch, useSelector } from "react-redux";
import { selectConversation } from "../../app/store/actions/messActions";
import { TiMessages } from "react-icons/ti";
import "../../app/style/components/messagecontainer.scss";

const MessageContainer = () => {
    const dispatch = useDispatch();
    const { selectedConversation } = useSelector((state: RootState) => state.mess);
    const cleanupFunction = () => {
        dispatch(selectConversation(null));
    };


    useEffect(() => {
        // Cleanup function (unmounts)
        return cleanupFunction;
    }, [dispatch]);
    return (
        <div className='message-container'>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    {/* Header */}
                    <div className='mes-item'>
                        <span className='label-text'>To:</span>{" "}
                        <span className='name-u'>{selectedConversation.name}</span>
                    </div>
                    <Messages />
                    <MessageInput />
                </>
            )}

        </div>
    );
}
export default MessageContainer;

const NoChatSelected = () => {
    const user = useSelector((state: RootState) => state.user);
    return (
        <div className='nochat-container'>
            <div className='nochat-item'>
                <p>Welcome 👋 {user.name} ❄</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl' />
            </div>
        </div>
    );
};