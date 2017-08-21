import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberSettingsPasswordPage } from './member-settings-password';

@NgModule({
  declarations: [
    MemberSettingsPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberSettingsPasswordPage),
  ],
})
export class MemberSettingsPasswordPageModule {}
