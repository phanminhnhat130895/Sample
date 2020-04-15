import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setJwtToken, clearJwtToken } from '../../ngrx/actions/auth.action';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { checkPasswordStrength, checkValidEmail } from 'src/app/common/helper-function';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-user',
    templateUrl: 'user.component.html'
})
export class UserComponent implements OnInit{
    constructor(private store: Store<{auth: {JwtToken: string}}>,
                private loadingService: NgxSpinnerService,
                private userService: UserService){}

    // token: Observable<{jwtToken: string}>;
    token: string;
    user: User;

    ngOnInit(){
        this.store.pipe(select("auth"))
            .subscribe(res => {
                this.token = res.JwtToken;
            })

        this.user = new User();
    }

    onSetToken(){
        this.store.dispatch(setJwtToken({payload: 'jwt token get from server'}));
        console.log(this.token);
    }

    onShowToken(){
        console.log(this.token);
    }

    onClearToken(){
        this.store.dispatch(clearJwtToken());
    }

    onRegisterUser(){
        if(this.onValidateRequire()){
            this.loadingService.show();
            this.userService.OnRegisterUser(this.user)
                .subscribe(res => {
                    console.log(res);
                    this.loadingService.hide();
                },
                err => {
                    this.loadingService.hide();
                })
        }
        else{
            this.onShowErrorMessage();
        }
    }

    onValidateRequire(){
        if(this.user.UPDATEDATE && this.user.PASSWORD && this.user.ROLE
        && this.user.ACTIVE && this.user.EMAIL && this.user.DAYOFBIRTH
        && this.user.ADDRESS && checkPasswordStrength(this.user.PASSWORD) && checkValidEmail(this.user.EMAIL))
            return true;
        return false;
    }

    onShowErrorMessage(){

    }
}