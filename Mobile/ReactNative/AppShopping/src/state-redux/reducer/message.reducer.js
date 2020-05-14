import { REDUX_SET_MESSAGE, REDUX_CLEAR_MESSAGE } from "../../common/const";

const messageReducer = (state = {message: [], className: ''}, action) => {
    switch(action.type) {
        case REDUX_SET_MESSAGE:
            state.message.push(action.payload.message);
            state.className = action.payload.className;
            break;
        case REDUX_CLEAR_MESSAGE:
            state.message = [];
            state.className = '';
            break;
    }
    return state;
}

export default messageReducer;