import { REDUX_SET_ACCESS_TOKEN } from "../../common/const";
var jwtDecode = require('jwt-decode');

const authReducer = (state = {token: '', role: ''}, action) => {
    switch(action.type) {
        case REDUX_SET_ACCESS_TOKEN:
            if(action.payload.token){
                state.role = jwtDecode(action.payload.token).ROLE;
                state.token = action.payload.token; 
            }
            else{
                state.role = '';
                state.token = ''; 
            }
            return state;
    }
    return state;
}

export default authReducer;