import { Component } from '@angular/core';

import { AlertController, App, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

import { Api, AuthenticationProvider } from '../../providers/providers';

import { WelcomeMemberPage } from '../welcome-member/welcome-member';
import { TabsAccountPage } from '../tabs/tabs-account';

/**
 * Generated class for the LoginPasswordChangeSuccessPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login-password-change-success',
  templateUrl: 'login-password-change-success.html',
})
export class LoginPasswordChangeSuccessPage {

  constructor(
    public alertCtrl: AlertController,
    public api: Api,
    public app: App,
    public authentication: AuthenticationProvider, 
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  enter() {
    let loading = this.loadingCtrl.create({ spinner: 'ios' }); 
    loading.present();

    this.authentication.logIn({'username': this.navParams.get('phone'), 'password': this.navParams.get('password')}, 
    (res) => {
      loading.dismiss();
      this.navCtrl.pop();
      this.app.getRootNav().setRoot(TabsAccountPage);
    }, 
    (err) => {
      loading.dismiss();

      if(err.status == 400) {
        this.alertCtrl.create({
          message: 'Invalid Phone Number or Password',
          buttons: ['Okay']
        }).present();
      } else {
        this.alertCtrl.create({
          message: 'Error. ' + err,
          buttons: ['Okay']
        }).present();        
      }
    });
  }
}
