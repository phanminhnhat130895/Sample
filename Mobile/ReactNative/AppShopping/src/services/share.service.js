import { APP_ACCESS_TOKEN } from "../common/const";
// import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';
var jwtDecode = require('jwt-decode');

export default class ShareService {
    static async setAccessToken(token) { await AsyncStorage.setItem(APP_ACCESS_TOKEN, token) }
    static async getAccessToken() { let token = await AsyncStorage.getItem(APP_ACCESS_TOKEN); return token; }
    static async clearAccessToken() { await AsyncStorage.removeItem(APP_ACCESS_TOKEN); }
    static async getDecodeToken() {
        let token = await this.getAccessToken();
        if(token){
            return jwtDecode(token);
        }
        return null;
    }
}