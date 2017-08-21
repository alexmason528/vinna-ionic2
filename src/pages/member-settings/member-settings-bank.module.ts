import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberSettingsBankPage } from './member-settings-bank';

@NgModule({
  declarations: [
    MemberSettingsBankPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberSettingsBankPage),
  ],
})
export class MemberSettingsBankPageModule {}
