// reducer.js
import { UserState } from "../type/type"
interface Action {
    type: string;
    payload: any;
}
const initialState: UserState = {
    name: '',
    id: '',
    email: '',
    avatar: '',
};

const userReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                avatar: action.payload.avatar,
            };
        default:
            return state;
    }
};

export default userReducer;