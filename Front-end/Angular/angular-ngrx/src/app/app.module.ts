import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing-module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';

import { authReducer } from './ngrx/reducers/auth.reducer';

import { UserService } from './services/user.service';
import { ShareService } from './services/share.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ auth : authReducer }),
    NgxSpinnerModule,
    BrowserAnimationsModule
    // Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [
    UserService,
    ShareService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
