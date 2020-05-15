import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import messageReducer from './message.reducer';
import loadingReducer from './loading.reducer';

const reducer = combineReducers({
    auth: authReducer,
    message: messageReducer,
    loading: loadingReducer
})

export default reducer;