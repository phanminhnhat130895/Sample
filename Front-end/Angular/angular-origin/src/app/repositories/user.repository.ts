import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { rootUrl } from '../common/const';
import { User } from '../models/user.model';

@Injectable()
export class UserRepository{
    constructor(private httpClient: HttpClient){}

    OnRegisterUser(user: User) : Observable<number>{
        let url = rootUrl + 'user/register-user';
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        return this.httpClient.post<number>(url, user, {headers: headers});
    }
}