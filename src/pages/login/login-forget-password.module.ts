import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginForgetPasswordPage } from './login-forget-password';

@NgModule({
  declarations: [
    LoginForgetPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginForgetPasswordPage),
  ],
})
export class LoginForgetPasswordPageModule {}
