import { LOGIN_SUCCESS, LOGOUT } from '../type/type';

export const loginSuccess = (user: any) => {
    return {
        type: LOGIN_SUCCESS,
        payload: user,
    };
};



export const logout = () => {
    return {
        type: LOGOUT,
    };
};