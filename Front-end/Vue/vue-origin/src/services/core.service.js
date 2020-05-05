import axios from 'axios'
import ShareService from './share.service'
import { RootUrl } from '../common/const'

export const HTTP = axios.create({
    baseURL: RootUrl,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + ShareService.getJwtToken()
    }
})

export const AUTH_HTTP = axios.create({
    baseURL: RootUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})