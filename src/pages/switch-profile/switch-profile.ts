import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { MemberSettingsPage } from '../member-settings/member-settings';
import { PartnerSettingsPage } from '../partner-settings/partner-settings';

import { Api, AuthenticationProvider } from '../../providers/providers';

/**
 * Generated class for the SwitchProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-switch-profile',
  templateUrl: 'switch-profile.html',
})
export class SwitchProfilePage {

  account: any;
  address: any;
  cashiers: any;
  member: any;
  partners: any;
  profile: any;

  constructor(
    public api: Api,
    public authentication: AuthenticationProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController) {

    const auth = this.authentication.getAuthorization();
    this.profile = this.authentication.getProfile();
    
    if (!this.profile) {
      const profile = {
        type: 'member',
        object: auth.member
      };
      console.log('switch to ' + profile.type);

      this.profile = profile;
    }

    this.account = auth.account;
    this.member = auth.member;
    this.partners = auth.partners;
    this.cashiers = auth.cashiers;

  }

  navToSettings() {
    this.profile = this.authentication.getProfile();

    if (this.profile.type == 'member') {
      this.navCtrl.push(MemberSettingsPage);
    } else if (this.profile.type == 'partner') {
      this.navCtrl.push(PartnerSettingsPage);
    } else if (this.profile.type == 'cashier') {
      this.navCtrl.push(MemberSettingsPage);
    } else {
      this.navCtrl.push(MemberSettingsPage);      
    }
  }

  close() {
    this.viewCtrl.dismiss(this.profile);
  }

  switchProfile(type, object) {
    const profile = {
      type: type,
      object: object
    };
    console.log('switch to ' + type);

    this.profile = profile;

    this.authentication.saveProfile(profile);

    this.navCtrl.popToRoot();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SwitchProfilePage');
  }

}
