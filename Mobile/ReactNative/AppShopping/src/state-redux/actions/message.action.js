import { REDUX_SET_MESSAGE, REDUX_CLEAR_MESSAGE } from "../../common/const";

export function setMessage(message, className) { return { type: REDUX_SET_MESSAGE, payload: { message, className } } }
export function clearMessage() { return { type: REDUX_CLEAR_MESSAGE } }