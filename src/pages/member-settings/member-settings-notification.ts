import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';

import { Api, AuthenticationProvider } from '../../providers/providers';


/**
 * Generated class for the MemberSettingsNotificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-member-settings',
  templateUrl: 'member-settings-notification.html',
})
export class MemberSettingsNotificationPage {

  constructor(
    public alertCtrl: AlertController, 
    public api: Api, 
    public authentication: AuthenticationProvider,
    public loadingCtrl: LoadingController, 
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberSettingsNotificationPage');
  }

}
