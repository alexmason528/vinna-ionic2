import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';
/**
 * Generated class for the WelcomeToPartnerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome-to-partner',
  templateUrl: 'welcome-to-partner.html',
})
export class WelcomeToPartnerPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  goToPartnerProfile() {
    // TODO: reset stack.... POP ALL / push ProfilePage    
    this.navCtrl.push(ProfilePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeToPartnerPage');
  }

}
