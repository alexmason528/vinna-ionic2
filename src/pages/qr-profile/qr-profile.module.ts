import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrProfilePage } from './qr-profile';

@NgModule({
  declarations: [
    QrProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(QrProfilePage),
  ],
})
export class QrProfilePageModule {}
