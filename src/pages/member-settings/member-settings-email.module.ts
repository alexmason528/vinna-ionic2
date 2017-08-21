import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberSettingsEmailPage } from './member-settings-email';

@NgModule({
  declarations: [
    MemberSettingsEmailPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberSettingsEmailPage),
  ],
})
export class MemberSettingsEmailPageModule {}
