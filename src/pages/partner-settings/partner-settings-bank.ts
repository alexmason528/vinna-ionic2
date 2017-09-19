import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';

import { Api, AuthenticationProvider } from '../../providers/providers';

/**
 * Generated class for the PartnerSettingsBankPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-partner-settings',
  templateUrl: 'partner-settings-bank.html',
})
export class PartnerSettingsBankPage {

  payType = 'card';

  bankForm: FormGroup;
  cardForm: FormGroup;

  isReadyToVerify = false;

  partner: any;

  constructor(
    public alertCtrl: AlertController, 
    public api: Api, 
    public authentication: AuthenticationProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public stripe: Stripe) {

    this.cardForm = this.formBuilder.group({
      name: ['', Validators.required],
      number: ['', Validators.compose([Validators.required, Validators.minLength(16), Validators.maxLength(16)])],
      expMonth: ['', Validators.compose([Validators.required, Validators.pattern("^(0?[1-9]|1[012])$")])],
      expYear: ['', Validators.compose([Validators.required, Validators.pattern("^(19[0-9][0-9]|20[0-1][0-7])$")])],
      cvc: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(4)])]
    });

    this.bankForm = this.formBuilder.group({
      account_holder_name: ['', Validators.required],
      account_number: ['', Validators.compose([Validators.required, Validators.maxLength(4), Validators.minLength(17)])],
      routing_number: ['', Validators.compose([Validators.required, Validators.maxLength(4), Validators.minLength(17)])]
    });

    this.bankForm.valueChanges.subscribe((e) => {
      this.isReadyToVerify = (this.payType == 'bank' && this.bankForm.valid) ? true : false;
    });

    this.cardForm.valueChanges.subscribe((e) => {
      this.isReadyToVerify = (this.payType == 'card' && this.cardForm.valid) ? true : false;
    });

    const stripeKey = this.authentication.getAuthorization().stripe_key;
    this.stripe.setPublishableKey(stripeKey);
    this.partner = this.navParams.get('partner');

  }

  segmentClicked(type) {
    if(type == 'bank') {
      this.isReadyToVerify = (this.bankForm.valid) ? true : false;
    } else if(type == 'card') {
      this.isReadyToVerify = (this.cardForm.valid) ? true : false;
    }
  }

  changeAccount(payType) {

    let text = (payType == 'bank') ? this.bankForm.value['account_number'] : this.cardForm.value['number'];

    let paymentInfo = {
      type: payType,
      token: '',
      text: text.substr(text.length - 4)
    }
    let loader = this.loadingCtrl.create({
      spinner: 'ios'
    });

    let auth = this.authentication.getAuthorization();

    loader.present();

    if (payType == 'bank') {
      this.bankForm.value['currency'] = 'USD';
      this.bankForm.value['country'] = 'US';
      this.stripe.createBankAccountToken(this.bankForm.value)
       .then((token) => {
        paymentInfo['token'] = token['id'];
        let seq = this.api.put(`api/business/${this.partner.id}`, {billing_info: paymentInfo}, this.authentication.getRequestOptions());
        seq
          .map(res => res.json())
          .subscribe(res => {
            loader.dismiss();

            for (const key in auth['partners']) {
              if (auth['partners'][key]['id'] == res.id) {
                auth['partners'][key] = res;
                break;
              }
            }

            this.authentication.saveAuthorization(auth);
            this.authentication.saveProfile({
              type: 'partner',
              object: res
            });
            this.partner = res;

            this.alertCtrl.create({
              title: 'Success!',
              subTitle: 'Updated the partner bank account successfully',
              buttons: [
              {
                text: 'Okay',
                handler: () => { this.navCtrl.pop(); }
              }]
            }).present();
          }, err => {
            console.log(err);
            loader.dismiss();
            this.alertCtrl.create({
              title: 'Sorry!',
              subTitle: `There was a problem to update the partner bank account. ${err}`,
              buttons: ['Okay']
            }).present();
          });
       })
       .catch((err) => {
        console.log(err);
        loader.dismiss();
        this.alertCtrl.create({
          title: 'Sorry!',
          subTitle: `There was a problem to update the partner bank account. ${err}`,
          buttons: ['OK']
        }).present();
       });
    } else if(payType == 'card') {
      this.cardForm.value['currency'] = 'USD';
      this.cardForm.value['country'] = 'US';
      this.stripe.createCardToken(this.cardForm.value)
       .then((token) => {
        paymentInfo['token'] = token['id'];
        let seq = this.api.put(`api/business/${this.partner.id}`, {billing_info: paymentInfo}, this.authentication.getRequestOptions());
        seq
          .map(res => res.json())
          .subscribe(res => {
            loader.dismiss();
            
            for (const key in auth['partners']) {
              if (auth['partners'][key]['id'] == res.id) {
                auth['partners'][key] = res;
                break;
              }
            }

            this.authentication.saveAuthorization(auth);
            this.authentication.saveProfile({
              type: 'partner',
              object: res
            });
            this.partner = res;

            this.alertCtrl.create({
              title: 'Success!',
              subTitle: 'Updated the partner bank account successfully',
              buttons: [
              {
                text: 'Okay',
                handler: () => { this.navCtrl.pop(); }
              }]
            }).present();
          }, err => {
            console.log(err);
            loader.dismiss();
            this.alertCtrl.create({
              title: 'Sorry!',
              subTitle: `There was a problem to update the partner bank account. ${err}`,
              buttons: ['Okay']
            }).present();
          });
       })
       .catch((err) => {
         console.log(err);
         loader.dismiss();
         this.alertCtrl.create({
          title: 'Sorry!',
          subTitle: `There was a problem to update the partner bank account. ${err}`,
          buttons: ['OK']
        }).present();
       });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartnerSettingsBankPage');
  }

}
