import { REDUX_SET_JWT_TOKEN, REDUX_CLEAR_JWT_TOKEN, REDUX_SAGA_MANAGE_TOKEN } from "../../common/const";

export function setJwtToken(token) { return { type: REDUX_SET_JWT_TOKEN, payload: { token } } }
export function clearJwtToken() { return { type: REDUX_CLEAR_JWT_TOKEN } }
export function manageTokenSaga(token) { return { type: REDUX_SAGA_MANAGE_TOKEN, payload: { token } } }
