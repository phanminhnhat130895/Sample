import { JWT_ACCESS_TOKEN } from "../common/const";
import * as jwt from 'jsonwebtoken';

export class ShareService {
    static setJwtToken(token) { sessionStorage.setItem(JWT_ACCESS_TOKEN, token) }
    static getJwtToken() { return sessionStorage.getItem(JWT_ACCESS_TOKEN) }
    static clearJwtToken() { sessionStorage.removeItem(JWT_ACCESS_TOKEN) }
    static isAuthenticate() {
        let token = this.getJwtToken();
        if(token && jwt.decode(token).USERID) return true;
        return false;
    }
    static isAuthorization(roles) {
        let token = this.getJwtToken();
        let tokenDecode = jwt.decode(token);
        if(token && tokenDecode.USERID && roles.includes(tokenDecode.ROLE)) return true;
        return false;
    }
}