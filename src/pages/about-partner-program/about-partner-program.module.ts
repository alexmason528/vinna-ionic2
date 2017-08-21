import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPartnerProgramPage } from './about-partner-program';

@NgModule({
  declarations: [
    AboutPartnerProgramPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutPartnerProgramPage),
  ],
  entryComponents: [
    AboutPartnerProgramPage,
  ]
})
export class AboutPartnerProgramPageModule {}
