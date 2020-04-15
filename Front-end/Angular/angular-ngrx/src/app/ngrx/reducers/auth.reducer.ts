// import * as AuthAction from '../actions/auth.action';

// const initialState = {
//     JwtToken: ''
// }

// export function AuthReducer(state = initialState, action = AuthAction.SampleAction){
//     switch (action.type) {
//         case AuthAction.SET_JWT_TOKEN:
//             return {
//                 ...state,
//                 JwtToken: action.payload
//             }
//         case AuthAction.GET_JWT_TOKEN:
//             return state;
//         case AuthAction.CLEAR_JWT_TOKEN:
//             return {
//                 ...state,
//                 JwtToken: ''
//             }
//         default:
//             return state;
//     }
// }

import * as AuthAction from '../actions/auth.action';

import { createReducer, on, Action } from '@ngrx/store';

const initalState = {
    JwtToken: ''
}

const reducer = createReducer(
    initalState,
    on(AuthAction.setJwtToken, (state, {payload}) => ({ ...state, JwtToken: payload })),
    on(AuthAction.getJwtToken, (state) => ({ ...state })),
    on(AuthAction.clearJwtToken, (state) => {
        state.JwtToken = '';
        return { ...state }
    })
)

export function authReducer(state = initalState, action: Action){
    return reducer(state, action);
}