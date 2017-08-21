import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SwitchProfilePage } from './switch-profile';

@NgModule({
  declarations: [
    SwitchProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(SwitchProfilePage),
  ],
})
export class SwitchProfilePageModule {}
