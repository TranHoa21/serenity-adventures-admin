import io from "socket.io-client";


// Hằng action types
export const CONNECT_SOCKET = 'CONNECT_SOCKET';
export const DISCONNECT_SOCKET = 'DISCONNECT_SOCKET';
export const UPDATE_ONLINE_USERS = 'UPDATE_ONLINE_USERS';

// Action creators
export const connectSocket = (userId: any) => {
    const socket = io("https://serenity-adventures-demo.onrender.com", {
        query: {
            userId: userId,
        },
    });

    return {
        type: CONNECT_SOCKET,
        payload: socket
    };
};

export const disconnectSocket = () => {
    return {
        type: DISCONNECT_SOCKET
    };
};

export const updateOnlineUsers = (users: any) => {
    return {
        type: UPDATE_ONLINE_USERS,
        payload: users
    };
};