// import { Action } from '@ngrx/store';

// export const SET_JWT_TOKEN = 'SET_JWT_TOKEN';
// export const GET_JWT_TOKEN = 'GET_JWT_TOKEN';
// export const CLEAR_JWT_TOKEN = 'CLEAR_JWT_TOKEN';

// export class SetJwtToken implements Action{
//     readonly type: string = SET_JWT_TOKEN;
//     constructor(payload: string){}
// }

// export class GetJwtToken implements Action{
//     readonly type: string = GET_JWT_TOKEN;
//     constructor(payload: string){}
// }

// export class ClearJwtToken implements Action{
//     readonly type: string = CLEAR_JWT_TOKEN;
//     constructor(payload: any = null){}
// }

// export type SampleAction = SetJwtToken | GetJwtToken | ClearJwtToken;

import { createAction, props } from '@ngrx/store';

export const SET_JWT_TOKEN = 'SET_JWT_TOKEN';
export const GET_JWT_TOKEN = 'GET_JWT_TOKEN';
export const CLEAR_JWT_TOKEN = 'CLEAR_JWT_TOKEN';

export const setJwtToken = createAction(
    SET_JWT_TOKEN,
    props<{payload: string}>()
)

export const getJwtToken = createAction(
    GET_JWT_TOKEN
)

export const clearJwtToken = createAction(
    CLEAR_JWT_TOKEN
)