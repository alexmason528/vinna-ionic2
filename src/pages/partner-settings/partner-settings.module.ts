import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartnerSettingsPage } from './partner-settings';

@NgModule({
  declarations: [
    PartnerSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(PartnerSettingsPage),
  ],
})
export class PartnerSettingsPageModule {}
