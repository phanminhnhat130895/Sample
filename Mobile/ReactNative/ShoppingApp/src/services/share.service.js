import { APP_ACCESS_TOKEN } from "../common/const";

export default class ShareService {
    static setAccessToken(token) { sessionStorage.setItem(APP_ACCESS_TOKEN, token) }
    static getAccessToken() { return sessionStorage.getItem(APP_ACCESS_TOKEN) }
    static clearAccessToken() { sessionStorage.removeItem(APP_ACCESS_TOKEN) }
}