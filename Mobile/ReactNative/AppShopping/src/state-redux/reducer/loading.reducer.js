import { REDUX_TOGGLE_LOADING } from "../../common/const"

const loadingReducer = (state = false, action) => {
    if(action.type === REDUX_TOGGLE_LOADING) state = !state;
    return state;
}

export default loadingReducer;