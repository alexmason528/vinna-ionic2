import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsAccountPage } from './tabs-account';

@NgModule({
  declarations: [
    TabsAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsAccountPage),
  ],
})
export class TabsAccountPageModule {}
