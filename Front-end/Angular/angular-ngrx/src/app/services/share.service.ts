import { Injectable } from '@angular/core';
import { APP_ACCESS_TOKEN } from 'src/app/common/const';

@Injectable()
export class ShareService{
    onSetJwtToken(token: string) { sessionStorage.setItem(APP_ACCESS_TOKEN, token) }

    onGetJwtToken() { return sessionStorage.getItem(APP_ACCESS_TOKEN) }

    onClearJwtToken() { sessionStorage.removeItem(APP_ACCESS_TOKEN) }
}