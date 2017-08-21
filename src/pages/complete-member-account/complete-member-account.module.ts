import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompleteMemberAccountPage } from './complete-member-account';

@NgModule({
  declarations: [
    CompleteMemberAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(CompleteMemberAccountPage),
  ],
})
export class CompleteMemberAccountPageModule {}
