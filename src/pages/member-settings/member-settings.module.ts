import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberSettingsPage } from './member-settings';

@NgModule({
  declarations: [
    MemberSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberSettingsPage),
  ],
})
export class MemberSettingsPageModule {}
