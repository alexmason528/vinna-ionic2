import { Component } from '@angular/core';

import { AlertController, App, LoadingController, NavController, NavParams } from 'ionic-angular';

import { AccountRegistrationPage } from '../account-registration/account-registration';
import { LoginForgetPasswordPage } from './login-forget-password';
import { TabsAccountPage } from '../tabs/tabs-account';

import { Api, AuthenticationProvider } from '../../providers/providers';

/**
 * Generated class for the LoginPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login-password',
  templateUrl: 'login-password.html',
})
export class LoginPasswordPage {

  firstname: any;
  password: any;
  phone: any;

  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
    public alertCtrl: AlertController,
    public api: Api,
    public app: App, 
    public authentication: AuthenticationProvider, 
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
    
    this.phone = navParams.get('phone').replace(/\D+/g, '');;
    this.firstname = navParams.get('firstname');
  }

  ionViewWillEnter() {
    this.password = '';
  }

  navPrevPage() {
    this.navCtrl.pop();
  }

  navNextPage() {
    let loading = this.loadingCtrl.create({ spinner: 'ios' }); 
    loading.present();

    this.authentication.logIn({'username': this.phone, 'password': this.password}, 
    (res) => {
      loading.dismiss();
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

  goForgotPassword() {
    this.navCtrl.push(LoginForgetPasswordPage, {phone: this.phone, firstname: this.firstname});
  }

  goRegisterAccount() {
    this.navCtrl.push(AccountRegistrationPage, {phone: this.phone, recreate: true});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPasswordPage');
  }

}
