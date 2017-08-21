import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountRegistrationPage } from './account-registration';

@NgModule({
  declarations: [
    AccountRegistrationPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountRegistrationPage),
  ],
})
export class AccountRegistrationPageModule {}
