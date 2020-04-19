import axios from 'axios'
import { RootUrl } from '../common/const'
import ShareService from './share.service'

export const AUTH_HTTP = axios.create({
    baseURL: RootUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const HTTP = axios.create({
    baseURL: RootUrl,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': ShareService.getJwtToken()
    }
})