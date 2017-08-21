import { Component } from '@angular/core';

import { AlertController, App, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Api, AuthenticationProvider } from '../../providers/providers';

import { AccountRegistrationPage } from '../account-registration/account-registration';
import { HomePage } from '../home/home';
import { LoginPasswordPage } from './login-password';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  phone: string = '';
  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
    public alertCtrl: AlertController,
    public api: Api,
    public app: App,
    public authentication: AuthenticationProvider,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  navPrevPage() {
    this.navCtrl.push(HomePage);
  }

  navNextPage() {
    this.phone = this.phone.replace(/\D+/g, '');
    
    if (this.phone.length == 0) {
      this.alertCtrl.create({
        message: 'Please input your phone number',
        buttons: ['Okay']
      }).present();
      return;
    } else if (this.phone.length != 10) {
      this.alertCtrl.create({
        message: 'Please input valid phone number',
        buttons: ['Okay']
      }).present();
      return;
    }

    let loading = this.loadingCtrl.create({ spinner: 'ios'});
    let seq = this.api.post('api/account/find_phone', {phone:this.phone});

    loading.present();

    seq
    .map(res => res.json())
    .subscribe(res => {
      loading.dismiss();
      this.navCtrl.push(LoginPasswordPage, {phone:this.phone, firstname:res});
    }, err => {
      loading.dismiss();
      this.navCtrl.push(AccountRegistrationPage, {phone: this.phone});
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
