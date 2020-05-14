import { REDUX_SET_ACCESS_TOKEN, SAGA_REDUX_SET_ACCESS_TOKEN } from "../../common/const";

export function setAccessToken(token) { return { type: REDUX_SET_ACCESS_TOKEN, payload: { token } } }
export function sagaSetAccessToken(token) { return { type: SAGA_REDUX_SET_ACCESS_TOKEN, payload: { token } } }