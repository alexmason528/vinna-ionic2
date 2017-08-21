import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberSettingsMailingPage } from './member-settings-mailing';

@NgModule({
  declarations: [
    MemberSettingsMailingPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberSettingsMailingPage),
  ],
})
export class MemberSettingsMailingPageModule {}
