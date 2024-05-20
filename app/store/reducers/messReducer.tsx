// reducer.js
import { SELECT_CONVERSATION, SET_MESSAGES, SET_CONVERSATIONS } from '../type/type';

interface Action {
    type: string;
    payload: any;
}



interface Conversation {
    id: string;
    name: string;
    avatar: string;
    unread: number;
    // Các thuộc tính khác của conversation
}

interface State {
    selectedConversation: Conversation | null;
    messages: any[];
    isShowChat: boolean;
    isShowSideBar: boolean;
    unreadCounts: any,
    notifications: {
        senderId: string;
        createdAt: Date;
        notification: string;
        unread: boolean;
        unreadCount: number;
        notificationId: string;
    }[];
    status: boolean,
    admin: boolean
}

const initialState: State = {
    selectedConversation: null,
    messages: [],
    isShowChat: false,
    isShowSideBar: true,
    unreadCounts: {},
    notifications: [],
    status: true,
    admin: true

};

const conversationReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case SELECT_CONVERSATION:
            return {
                ...state,
                selectedConversation: action.payload,
            };
        case SET_MESSAGES:
            return {
                ...state,
                messages: action.payload,
            };

        case 'UPDATE_UNREAD_COUNT':
            return {
                ...state,
                unreadCounts: {
                    ...state.unreadCounts,
                    [action.payload.conversationId]: action.payload.count,
                },
            };
        case 'LOAD_UNREAD_COUNTS':
            return {
                ...state,
                unreadCounts: action.payload,
            };
        case 'MARK_MESSAGES_AS_READ':
            return {
                ...state,
                unreadCounts: {
                    ...state.unreadCounts,
                    [action.payload]: 0,
                },
            };
        case 'SET_HAS_NEW_MESSAGE':
            return {
                ...state,
                admin: action.payload,
            };
        case 'SET_HAS_NEW_NOTIFICATION':
            return {
                ...state,
                status: action.payload,
            };

        default:
            return state;
    }
};

export default conversationReducer;
