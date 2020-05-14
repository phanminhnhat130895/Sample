import axios from 'axios';
import { RootUrl } from '../common/const';
import ShareService from './share.service';

export default class HttpService {
    static AuthenticateHttp = axios.create({
        baseURL: RootUrl,
        headers: {
            'Content-Type': 'application/json'
        }
    })

    static RequestHttp = axios.create({
        baseURL: RootUrl,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': ShareService.getAccessToken()
        }
    })
}