import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

import { WelcomeMemberPage } from '../welcome-member/welcome-member';

import { Api, AuthenticationProvider } from '../../providers/providers';

/**
 * Generated class for the AccountRegistrationConfirmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-registration-confirm',
  templateUrl: 'account-registration-confirm.html',
})
export class AccountRegistrationConfirmPage {
  accountInfo;

  constructor(
    public alertCtrl: AlertController,
    public api: Api,
    public authentication: AuthenticationProvider,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
    this.accountInfo = this.navParams.get('accountInfo');
  }

  registerAccount() {

    let loading = this.loadingCtrl.create({
      spinner: 'ios'
    });
  
    loading.present();

    let seq = this.api.post('api/account', this.accountInfo);

    seq
      .map(res => res.json())
      .subscribe(res => {
        const credential = {
          username: this.accountInfo.email,
          password: this.accountInfo.password
        };
        
        this.authentication
        .logIn(credential, 
          res => {
            loading.dismiss();
            this.navCtrl.push(WelcomeMemberPage);  
          }, 
          err => {
            loading.dismiss();
            console.log(err);
            this.alertCtrl.create({
              title: 'Sorry',
              subTitle: err._body,
              buttons: ['Okay']
            }).present();
          }
        );
      }, err => {
        console.log(err);
        loading.dismiss();
        this.alertCtrl.create({
          title: 'Sorry',
          subTitle: err._body,
          buttons: ['Okay']
        }).present();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountRegistrationConfirmPage');
  }

}
