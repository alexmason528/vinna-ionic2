import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MakeAnnouncementPage } from './make-announcement';

@NgModule({
  declarations: [
    MakeAnnouncementPage,
  ],
  imports: [
    IonicPageModule.forChild(MakeAnnouncementPage),
  ],
})
export class MakeAnnouncementPageModule {}
