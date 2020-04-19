import { JWT_ACCESS_TOKEN } from "../common/const";
import * as jwt from 'jsonwebtoken'

export default class ShareService {
    static setJwtToken(token) { sessionStorage.setItem(JWT_ACCESS_TOKEN, token) }
    static getJwtToken() { return sessionStorage.getItem(JWT_ACCESS_TOKEN) }
    static clearJwtToken() { sessionStorage.removeItem(JWT_ACCESS_TOKEN) }
    static getUserId() { 
        let data = jwt.decode(this.getJwtToken())
        if(data) {
            return data.USERID
        }
        return null
    }
}