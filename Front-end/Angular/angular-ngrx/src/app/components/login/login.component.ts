import { Component, NgZone } from '@angular/core'
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Store, select } from '@ngrx/store';
import { setJwtToken } from '../../ngrx/actions/auth.action';
import { Router } from '@angular/router';
import { ShareService } from 'src/app/services/share.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html'
})
export class LoginComponent{
    constructor(private userService: UserService,
                private loadingService: NgxSpinnerService,
                private store: Store<{auth: {jwtToken: string}}>,
                private zone: NgZone,
                private router: Router,
                private shareService: ShareService){}

    username: string;
    password: string;

    onLogin(){
        this.loadingService.show();
        this.userService.OnLogin(this.username, this.password)
            .subscribe(res => {
                if(res){
                    this.store.dispatch(setJwtToken({payload: res}));
                    this.shareService.onSetJwtToken(res);
                    this.zone.run(() => {
                        this.router.navigate(['menu/user']);
                    })
                }
                this.loadingService.hide();
            },
            err => {
                this.loadingService.hide();
            })
    }
}