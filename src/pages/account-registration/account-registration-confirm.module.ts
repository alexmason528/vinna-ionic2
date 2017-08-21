import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountRegistrationConfirmPage } from './account-registration-confirm';

@NgModule({
  declarations: [
    AccountRegistrationConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountRegistrationConfirmPage),
  ],
})
export class AccountRegistrationConfirmPageModule {}
