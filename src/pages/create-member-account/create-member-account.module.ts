import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateMemberAccountPage } from './create-member-account';

@NgModule({
  declarations: [
    CreateMemberAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateMemberAccountPage),
  ],
})
export class CreateMemberAccountPageModule {}
