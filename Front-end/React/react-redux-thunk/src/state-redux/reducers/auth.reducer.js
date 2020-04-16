import { REDUX_SET_JWT_TOKEN, REDUX_CLEAR_JWT_TOKEN } from "../../common/const"

const authReducer = (state = '', action) => {
    if(action.type === REDUX_SET_JWT_TOKEN) state = action.payload.token;
    if(action.type === REDUX_CLEAR_JWT_TOKEN) state = '';
    return state;
}

export default authReducer;