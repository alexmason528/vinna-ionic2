import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';

import { BusinessProfilePage } from '../business-profile/business-profile';
import { CreatePartnerAccountPage } from '../create-partner-account/create-partner-account';

/**
 * Generated class for the AboutPartnerProgramPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-about-partner-program',
  templateUrl: 'about-partner-program.html',
})
export class AboutPartnerProgramPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController) {
  }

  goCreatePartnerAccount() {
    this.navCtrl.push(CreatePartnerAccountPage);
  }

  goBack() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPartnerProgramPage');
  }

}
