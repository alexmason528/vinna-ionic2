import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomeMemberPage } from './welcome-member';

@NgModule({
  declarations: [
    WelcomeMemberPage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomeMemberPage),
  ],
})
export class WelcomeMemberPageModule {}
