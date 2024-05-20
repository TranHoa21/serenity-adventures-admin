// action.js
import { SELECT_CONVERSATION, SET_MESSAGES, SET_CONVERSATIONS } from '../type/type';

type ConversationInfo = { id: string; name: string; avatar: string };

type Conversations = { id: string; name: string; avatar: string, unreadCount: number };



export const selectConversation = (conversationInfo: any) => ({
    type: SELECT_CONVERSATION,
    payload: conversationInfo,
});

export const setMessages = (messages: any) => ({
    type: SET_MESSAGES,
    payload: messages,
});
export const updateConversationUnread = (conversationId: any, unread: any, unreadCount: any) => {
    return {
        type: 'UPDATE_CONVERSATION_UNREAD',
        payload: { conversationId, unread, unreadCount }
    };
};



export const setNotification = (notifications: any) => ({
    type: "SET_NOTIFICATION",
    payload: notifications,
});


export const setHasNewMessage = (admin: boolean) => ({
    type: 'SET_HAS_NEW_MESSAGE',
    payload: admin,
});

export const setHasNewNotification = (status: boolean) => ({
    type: 'SET_HAS_NEW_NOTIFICATION',
    payload: status,
});
