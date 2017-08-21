import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberSettingsNotificationPage } from './member-settings-notification';

@NgModule({
  declarations: [
    MemberSettingsNotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberSettingsNotificationPage),
  ],
})
export class MemberSettingsNotificationPageModule {}
