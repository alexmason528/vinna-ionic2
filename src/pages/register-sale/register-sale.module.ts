import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterSalePage } from './register-sale';

@NgModule({
  declarations: [
    RegisterSalePage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterSalePage),
  ],
})
export class RegisterSalePageModule {}
