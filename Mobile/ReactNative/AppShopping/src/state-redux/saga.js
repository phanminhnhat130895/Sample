import { put, takeEvery } from 'redux-saga/effects';
import { setAccessToken } from './actions/auth.action';
import { SAGA_REDUX_SET_ACCESS_TOKEN } from '../common/const';

function* sagaSetAccessToken(action) {
    try{
        console.log(action);
        yield put(setAccessToken(action.payload.token));
    }
    catch(err){
        console.log(err);
    }
}

export default function* rootSaga() {
    yield takeEvery(SAGA_REDUX_SET_ACCESS_TOKEN, sagaSetAccessToken);
}