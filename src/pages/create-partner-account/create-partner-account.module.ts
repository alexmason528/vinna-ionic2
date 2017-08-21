import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatePartnerAccountPage } from './create-partner-account';

@NgModule({
  declarations: [
    CreatePartnerAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatePartnerAccountPage),
  ],
})
export class CreatePartnerAccountPageModule {}
