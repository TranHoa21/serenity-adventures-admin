export interface UserState {
    name: string;
    id: string;
    email: string;
    avatar: string
}
export interface User {
    name: string;
    id: string;
    email: string;
}

export interface AuthState {
    isLoggedIn: boolean;
    token: string;
    error: string | null;
}

export interface MessState {
    selectedConversation: {
        id: string;
        name: string;
        avatar: string;
    } | null;
    messages: {
        senderId: string;
        createdAt: Date;
        message: string;
        shouldShake: any;
        unread: boolean;
        unreadCount: number;
        id: number;

    }[];
    isShowChat: boolean;
    isShowSideBar: boolean;
    unreadCounts: any,
    status: boolean,
    admin: boolean

}


export interface SocketState {
    socket: any; // 
    onlineUsers: any[];
}


export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export type ImageState = Blob | MediaSource;
export const SELECT_CONVERSATION = 'SELECT_CONVERSATION';
export const SET_MESSAGES = 'SET_MESSAGES';
export const SET_CONVERSATIONS = 'SET_CONVERSATIONS';

