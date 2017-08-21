import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CreatePartnerAccountPage } from '../create-partner-account/create-partner-account';
import { BusinessProfilePage } from '../business-profile/business-profile';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goBack() {
    this.navCtrl.pop();
  }

  goCreatePartnerAccount() {
    this.navCtrl.push(CreatePartnerAccountPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPartnerProgramPage');
  }

}
