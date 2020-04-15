import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { rootUrl } from '../common/const';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getJwtToken } from '../ngrx/actions/auth.action';

@Injectable()
export class UserService{
    constructor(private httpClient: HttpClient,
                private store: Store<{auth: {JwtToken: string}}>){
                    this.store.pipe(select('auth'))
                        .subscribe(res => {
                            this.token = res.JwtToken;
                        })
                }

    private token: string;

    OnRegisterUser(user: User) : Observable<number>{
        let url = rootUrl + 'user/register-user';
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', 'Bearer ' + this.token);
        return this.httpClient.post<number>(url, user, {headers: headers});
    }

    OnLogin(username: string, password: string) : Observable<string>{
        let url = rootUrl + 'auth/get-login';
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        return this.httpClient.post<string>(url, { username, password }, {headers: headers});
    }
}