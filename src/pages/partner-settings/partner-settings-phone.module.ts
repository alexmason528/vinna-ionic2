import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartnerSettingsPhonePage } from './partner-settings-phone';

@NgModule({
  declarations: [
    PartnerSettingsPhonePage,
  ],
  imports: [
    IonicPageModule.forChild(PartnerSettingsPhonePage),
  ],
})
export class PartnerSettingsPhonePageModule {}
