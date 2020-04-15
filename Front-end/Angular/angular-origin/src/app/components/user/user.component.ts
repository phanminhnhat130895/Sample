import { Component, OnInit } from '@angular/core';
import { UserRepository } from 'src/app/repositories/user.repository';
import { User } from 'src/app/models/user.model';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
    selector: 'app-user',
    templateUrl: 'user.component.html'
})
export class UserComponent implements OnInit{
    constructor(private userRepository: UserRepository,
                private loadingService: NgxSpinnerService){}

    user: User;

    ngOnInit(){
        this.user = new User();
        this.user.USERNAME = 'Admin';
        this.user.PASSWORD = 'Admin';
        this.user.ROLE = 'Admin';
        this.user.EMAIL = 'Admin@gmail.com';
        this.user.ADDRESS = 'Biên Hòa, Đồng Nai';
        this.user.DAYOFBIRTH = '1995/08/13';
    }

    OnRegisterUser(){
        this.userRepository.OnRegisterUser(this.user)
            .subscribe(res => {
                console.log(res);
            },
            err => {
                console.log(err);
            })
    }
}