import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import messageReducer from './message.reducer';

const reducer = combineReducers({
    auth: authReducer,
    message: messageReducer
})

export default reducer;