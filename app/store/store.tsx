"use client"

import { createStore, combineReducers, Dispatch } from 'redux';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import { UserState, AuthState, MessState, SocketState } from "./type/type";

import socketReducer from './reducers/socketReducers';
import messReducer from './reducers/messReducer';



export interface RootState {
    auth: AuthState;
    user: UserState;
    mess: MessState;
    socket: SocketState;

}


const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    socket: socketReducer,
    mess: messReducer,
});

const store = createStore(rootReducer);
export type AppDispatch = Dispatch<any>;

export default store;