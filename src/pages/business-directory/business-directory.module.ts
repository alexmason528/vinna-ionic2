import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessDirectoryPage } from './business-directory';

@NgModule({
  declarations: [
    BusinessDirectoryPage,
  ],
  imports: [
    IonicPageModule.forChild(BusinessDirectoryPage),
  ],
})
export class BusinessDirectoryPageModule {}
