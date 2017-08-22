import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';

import { Api, AuthenticationProvider } from '../../providers/providers';

/**
 * Generated class for the VerificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-verification',
  templateUrl: 'verification.html',
})
export class VerificationPage {

  account: any;
  isReadyToVerifyEmail = false;
  isReadyToVerifyPhone = false;

  emailForm: FormGroup;
  phoneForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public api: Api,
    public authentication: AuthenticationProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams) {

    const auth = this.authentication.getAuthorization();
    this.account = auth.account;

    this.emailForm = formBuilder.group({
      email_code: ['']
    });

    this.phoneForm = formBuilder.group({
      phone_code: ['']
    });

    this.emailForm.valueChanges.subscribe((e) => {
      this.isReadyToVerifyEmail = this.emailForm.valid;
    });

    this.phoneForm.valueChanges.subscribe((e) => {
      this.isReadyToVerifyPhone = this.phoneForm.valid;
    });
  }

  verify(type) {
    let auth = this.authentication.getAuthorization();
    let loading = this.loadingCtrl.create({
      spinner: 'ios'
    });

    loading.present();

    let seq;

    if (type == 'email')
      seq = this.api.post('api/account/' + this.account.id + '/verify_email', this.emailForm.value, this.authentication.getRequestOptions());
    else if(type == 'phone')
      seq = this.api.post('api/account/' + this.account.id + '/verify_phone', this.phoneForm.value, this.authentication.getRequestOptions());

    seq
      .map(res => res.json())
      .subscribe(res => {
        if (res == 'new_email_verified') {
          auth.user.username = auth.account.new_email;
          this.authentication.saveAuthorization(auth);
        }
        
        this.authentication.reAuthenticate(res => {
          loading.dismiss();
          this.account = res.account;
          this.alertCtrl.create({
            message: 'Successfully verified your ' + type,
            buttons: ['OK']
          }).present();
        }, err => {
          loading.dismiss();
          this.alertCtrl.create({
            message: err._body,
            buttons: ['OK']
          }).present();
          console.log(err);
        });
      }, err => {
        loading.dismiss();
        this.alertCtrl.create({
          message: err._body,
          buttons: ['OK']
        }).present();
        console.log(err);
      });
  }

  sendCode(type) {

    let loading = this.loadingCtrl.create({
      spinner: 'ios'
    });

    loading.present();

    let seq;
    
    if (type == 'email')
      seq = this.api.get('api/account/' + this.account.id + '/send_email_code', {}, this.authentication.getRequestOptions());
    else if (type == 'phone')
      seq = this.api.get('api/account/' + this.account.id + '/send_phone_code', {}, this.authentication.getRequestOptions());

    seq
      .map(res => res.json())
      .subscribe(res => {
        loading.dismiss();

        this.alertCtrl.create({
          message: 'Successfully sent verification code to your '+type,
          buttons: ['OK']
        }).present();

      }, err => {
        loading.dismiss();

        this.alertCtrl.create({
          message: 'Failed to send verification code to your ' + type,
          buttons: ['OK']
        }).present();

        console.log(err);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerificationPage');
  }

}
