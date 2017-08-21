import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberSettingsPhonePage } from './member-settings-phone';

@NgModule({
  declarations: [
    MemberSettingsPhonePage,
  ],
  imports: [
    IonicPageModule.forChild(MemberSettingsPhonePage),
  ],
})
export class MemberSettingsPhonePageModule {}
