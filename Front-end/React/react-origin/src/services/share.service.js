import { JWT_ACCESS_TOKEN } from "../common/const";

class ShareService {
    static setJwtToken(token) { sessionStorage.setItem(JWT_ACCESS_TOKEN, token); }

    static getJwtToken() { return sessionStorage.getItem(JWT_ACCESS_TOKEN); }

    static clearJwtToken() { sessionStorage.removeItem(JWT_ACCESS_TOKEN); }
}

export default ShareService;