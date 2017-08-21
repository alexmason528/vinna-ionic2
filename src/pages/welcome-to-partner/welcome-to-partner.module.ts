import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomeToPartnerPage } from './welcome-to-partner';

@NgModule({
  declarations: [
    WelcomeToPartnerPage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomeToPartnerPage),
  ],
})
export class WelcomeToPartnerPageModule {}
