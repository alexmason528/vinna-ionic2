import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartnerSettingsMailingPage } from './partner-settings-mailing';

@NgModule({
  declarations: [
    PartnerSettingsMailingPage,
  ],
  imports: [
    IonicPageModule.forChild(PartnerSettingsMailingPage),
  ],
})
export class PartnerSettingsMailingPageModule {}
