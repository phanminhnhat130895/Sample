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

    static RequestHttp = async () => {
        let token = await ShareService.getAccessToken();
        return axios.create({
            baseURL: RootUrl,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
    } 

    // static RequestHttp = axios.create({
    //     baseURL: RootUrl,
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //         'Authorization': 'Bearer ' + ShareService.getAccessToken()
    //     }
    // })
}