import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';

import { Api, AuthenticationProvider } from '../../providers/providers';

/**
 * Generated class for the MemberSettingsBankPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-member-settings',
  templateUrl: 'member-settings-bank.html',
})
export class MemberSettingsBankPage {

  isReadyToUpdate = false;

  member: any;
  bankForm: FormGroup;

  constructor(
    public alertCtrl: AlertController, 
    public api: Api, 
    public authentication: AuthenticationProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public stripe: Stripe) {

    let auth = this.authentication.getAuthorization();
    this.member = auth.member;

    this.bankForm = this.formBuilder.group({
      account_holder_name: ['', Validators.required],
      account_number: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(17)])],
      routing_number: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(17)])]
    });

    this.bankForm.valueChanges.subscribe( e => {
      this.isReadyToUpdate = this.bankForm.valid;
    });

    this.stripe.setPublishableKey('pk_test_vSXaN8PlxDIA9SRDrvPyNllu');
  }

  changeBankAccount() {
    let auth = this.authentication.getAuthorization();
    let loader = this.loadingCtrl.create({
      spinner: 'ios'
    });
    loader.present();

    this.bankForm.value['currency'] = 'USD';
    this.bankForm.value['country'] = 'US';
    this.stripe.createBankAccountToken(this.bankForm.value)
    .then((res) => {
      const paymentInfo = {
        token: res['id'],
        text: res['bank_account']['last4'],
        routing_number: res['bank_account']['routing_number']
      };
      
      let seq = this.api.put('api/member/' + this.member.id, {payment_info: paymentInfo}, this.authentication.getRequestOptions());
      seq
        .map(res => res.json())
        .subscribe(res => {
          loader.dismiss();

          auth['member'] = res;
          this.authentication.saveAuthorization(auth);
          this.member = res;

          this.alertCtrl.create({
            title: 'Success!',
            subTitle: 'Updated the bank account successfully',
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
            subTitle: 'There was a problem to update the bank account.' + err,
            buttons: ['Okay']
          }).present();
        });
    })
    .catch((err) => {
      console.log(err);
      loader.dismiss();
      this.alertCtrl.create({
        title: 'Sorry!',
        subTitle: 'There was a problem to update the bank account' + err,
        buttons: ['OK']
      }).present();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberSettingsBankPage');
  }

}
