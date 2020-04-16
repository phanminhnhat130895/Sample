import { put, takeEvery } from 'redux-saga/effects';
import { setJwtToken, clearJwtToken } from './actions/auth.action';
import { REDUX_SAGA_MANAGE_TOKEN } from '../common/const';

function* manageTokenSaga(action) {
    try{
        yield put(clearJwtToken());
        yield put(setJwtToken(action.payload.token));
    }
    catch(err){
        console.log(err);
    }
}

export default function* rootSaga() {
    yield takeEvery(REDUX_SAGA_MANAGE_TOKEN, manageTokenSaga);
}