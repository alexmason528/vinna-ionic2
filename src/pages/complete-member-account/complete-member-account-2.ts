import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';

import { ProfilePage } from '../profile/profile';
import { Api, AuthenticationProvider, FormHelperProvider } from '../../providers/providers';
/**
 * Generated class for the CompleteMemberAccount2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-complete-member-account-2',
  templateUrl: 'complete-member-account-2.html',
})
export class CompleteMemberAccount2Page {
  mailingInfo: any;
  form: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public api: Api,
    public authentication: AuthenticationProvider, 
    public formHelper: FormHelperProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public stripe: Stripe) {

    this.mailingInfo = this.navParams.get('mailingInfo');

    this.form = this.formHelper.getForm('CompleteMemberAccount2');
    if(!this.form){
      this.form = formBuilder.group({
        account_holder_name: ['', Validators.compose([Validators.required, Validators.maxLength(70)])],
        account_number: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15)])],
        routing_number: ['', Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(9)])],
        ssn_token: ['', Validators.compose([Validators.maxLength(9), Validators.minLength(9)])]
      });
    }
    
    const stripeKey = this.authentication.getAuthorization().stripe_key;
    this.stripe.setPublishableKey(stripeKey);
  }

  createMember() {
    if(this.form.invalid) {
      let error_message;

      if (this.form.get('account_holder_name').hasError('required')) {
        error_message = 'Please input account holder name';
      } else if(this.form.get('account_holder_name').hasError('maxlength')) {
        error_message = 'Account holder name should be less then 70 characters';
      } else if(this.form.get('account_number').hasError('required')) {
        error_message = 'Please input account number';
      } else if(this.form.get('account_number').hasError('minlength')) {
        error_message = 'Account number should be greater than 9 digits';
      } else if(this.form.get('account_number').hasError('maxlength')) {
        error_message = 'Account number should be less than 15 digits';
      } else if(this.form.get('routing_number').hasError('required')) {
        error_message = 'Please input routing number';
      } else if(this.form.get('routing_number').hasError('minlength')) {
        error_message = 'Account number should be 9 digits';
      } else if(this.form.get('routing_number').hasError('maxlength')) {
        error_message = 'Account number should be 9 digits';
      } else if(this.form.get('ssn_token').hasError('minlength')) {
        error_message = 'SSN should be 9 digits';
      } else if(this.form.get('ssn_token').hasError('maxlength')) {
        error_message = 'SSN should be 9 digits';
      }

      this.alertCtrl.create({
        message: error_message,
        buttons: ['Okay']
      }).present();

      return;
    }

    this.formHelper.setForm('CompleteMemberAccount2', this.form);

    let loading = this.loadingCtrl.create({
      spinner: 'ios'
    });

    loading.present();
    
    let auth = this.authentication.getAuthorization();

    this.mailingInfo['account_id'] = auth['account']['id'];
    this.mailingInfo['ssn_token'] = this.form.value['ssn_token'];

    let bank_info = this.form.value;
    bank_info['currency'] = 'USD';
    bank_info['country'] = 'US';
    bank_info['account_holder_type'] = 'individual';

    this.stripe.createBankAccountToken(bank_info)
    .then((res) => {
      const paymentInfo = {
        token: res['id'],
        text: res['bank_account']['last4'],
        routing_number: res['bank_account']['routing_number']
      };

      this.mailingInfo['payment_info'] = paymentInfo;

      let seq = this.api.post('api/member', this.mailingInfo, this.authentication.getRequestOptions());

      seq
        .map(res => res.json())
        .subscribe(res => {
          this.formHelper.flushForm('CompleteMemberAccount');
          this.formHelper.flushForm('CompleteMemberAccount2');
          loading.dismiss();
          auth['member'] = res;
          this.authentication.saveAuthorization(auth);
          this.navCtrl.push(ProfilePage);

        }, err => {
          console.log(err);
          loading.dismiss();

          let alert = this.alertCtrl.create({
            message: err._body,
            buttons: ['Okay']
          });

          alert.present();        
        });
      })
    .catch((error) => {
      console.log(error); 
      loading.dismiss();
      this.alertCtrl.create({
        title: 'Sorry!',
        subTitle: error,
        buttons: ['OK']
      }).present();
    }); 
  }

  ionViewWillUnload() {
    this.formHelper.setForm('CompleteMemberAccount2', this.form);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompleteMemberAccount2Page');
  }

}
