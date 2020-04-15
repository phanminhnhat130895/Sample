import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';

const route: Routes = [
    { path: '', component: LoginComponent },
    { path: 'menu/user', component: UserComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(route)],
    exports: [RouterModule]
})
export class AppRoutingModule{}