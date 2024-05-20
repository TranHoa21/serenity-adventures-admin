import { CONNECT_SOCKET, DISCONNECT_SOCKET, UPDATE_ONLINE_USERS } from '../actions/socketActions';

const initialState = {
    socket: null,
    onlineUsers: []
};

interface Action {
    type: string;
    payload: any;
}

const socketReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case CONNECT_SOCKET:
            return {
                ...state,
                socket: action.payload
            };
        case DISCONNECT_SOCKET:
            if (state.socket) {
                (state.socket as any).close();
            }
            return {
                ...state,
                socket: null
            };
        case UPDATE_ONLINE_USERS:
            return {
                ...state,
                onlineUsers: action.payload
            };
        default:
            return state;
    }
};

export default socketReducer;
