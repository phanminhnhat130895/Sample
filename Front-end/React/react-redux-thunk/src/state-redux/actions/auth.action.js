import { REDUX_SET_JWT_TOKEN, REDUX_CLEAR_JWT_TOKEN } from "../../common/const";

export function setJwtToken(token) { return { type: REDUX_SET_JWT_TOKEN, payload: { token } } }
export function clearJwtToken() { return { type: REDUX_CLEAR_JWT_TOKEN } }

export function demoThunk(token){
    return (dispatch) => {
        dispatch(setJwtToken(token));
    }
}