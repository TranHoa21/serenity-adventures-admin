import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";
import "../../app/style/components/listConversations.scss"

interface Conversation {
    id: string;
    name: string;
    unread: number;
    admin: boolean

}
const Conversations = () => {
    const { loading, conversations } = useGetConversations();
    return (
        <div className='conversation-container'>
            {conversations.map((conversation: Conversation, idx: number) => (
                <Conversation
                    key={conversation.id}
                    conversation={conversation}
                    emoji={getRandomEmoji()}
                    lastIdx={idx === conversations.length - 1}
                />
            ))}

            {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
        </div>
    );
};
export default Conversations;

