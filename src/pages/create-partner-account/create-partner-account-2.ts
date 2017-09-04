import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Stripe } from '@ionic-native/stripe';
import { AlertController, LoadingController, NavController, NavParams, Platform } from 'ionic-angular';

import { CreatePartnerAccount3Page } from './create-partner-account-3';

import { FormHelperProvider} from '../../providers/form-helper';

/**
 * Generated class for the CreatePartnerAccount2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-partner-account-2',
  templateUrl: 'create-partner-account-2.html',
})
export class CreatePartnerAccount2Page {
  payType = 'bank';

  bankForm: FormGroup;
  cardForm: FormGroup;

  businessInfo: any;

  constructor(
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder, 
    public formHelper: FormHelperProvider,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public platform: Platform,
    public stripe: Stripe) {

    this.businessInfo = navParams.get('businessInfo');

    this.cardForm = this.formHelper.getForm('CreatePartnerAccount2-Card');
    if (!this.cardForm)
      this.cardForm = formBuilder.group({
        name: ['', Validators.required],
        number: ['', Validators.compose([Validators.required, Validators.minLength(16), Validators.maxLength(16)])],
        expMonth: ['', Validators.compose([Validators.required, Validators.pattern("^(0?[1-9]|1[012])$")])],
        expYear: ['', Validators.compose([Validators.required, Validators.pattern("^(20[0-9][0-9])$")])],
        cvc: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(3)])]
      });

    this.bankForm = this.formHelper.getForm('CreatePartnerAccount2-Bank');
    if (!this.bankForm) {
      this.bankForm = formBuilder.group({
        account_holder_name: ['', Validators.required],
        account_number: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(17)])],
        routing_number: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(17)])]
      });
    }
  }

  navNextPage() {
    if (this.payType == 'bank') {
      if(this.bankForm.invalid) {
        let error_message;

        if (this.bankForm.get('account_holder_name').hasError('required')) {
          error_message = 'Please input account holder name';
        } else if(this.bankForm.get('account_number').hasError('required')) {
          error_message = 'Please input account number'; 
        } else if(this.bankForm.get('account_number').hasError('minlength')) {
          error_message = 'Account number should be greater than 4 digits'; 
        } else if(this.bankForm.get('account_number').hasError('maxlength')) {
          error_message = 'Account number should be less than 15 digits'; 
        } else if(this.bankForm.get('routing_number').hasError('required')) {
          error_message = 'Please input routing number'; 
        } else if(this.bankForm.get('routing_number').hasError('minlength')) {
          error_message = 'Routing number should be greater than 4 digits'; 
        } else if(this.bankForm.get('routing_number').hasError('maxlength')) {
          error_message = 'Routing number should be less than 15 digits'; 
        }

        this.alertCtrl.create({
          message: error_message,
          buttons: ['Okay']
        }).present();

        return;
      }
    } else {
      if(this.cardForm.invalid) {
        let error_message;

        if (this.cardForm.get('name').hasError('required')) {
          error_message = 'Please input card holder name';
        } else if(this.cardForm.get('number').hasError('required')) {
          error_message = 'Please input card number';
        } else if(this.cardForm.get('number').hasError('minlength')) {
          error_message = 'Card number should be 16 characters';
        } else if(this.cardForm.get('number').hasError('maxlength')) {
          error_message = 'Card number should be 16 characters';
        } else if(this.cardForm.get('expMonth').hasError('required')) {
          error_message = 'Please input month';
        } else if(this.cardForm.get('expMonth').hasError('pattern')) {
          error_message = 'Please input valid month';
        } else if(this.cardForm.get('expYear').hasError('required')) {
          error_message = 'Please input year';
        } else if(this.cardForm.get('expYear').hasError('pattern')) {
          error_message = 'Please input valid year';
        } else if(this.cardForm.get('cvc').hasError('required')) {
          error_message = 'Please input CVC';
        } else if(this.cardForm.get('cvc').hasError('minlength')) {
          error_message = 'CVC should be 3 digits';
        } else if(this.cardForm.get('cvc').hasError('maxlength')) {
          error_message = 'CVC should be 3 digits';
        }

        this.alertCtrl.create({
          message: error_message,
          buttons: ['Okay']
        }).present();

        return;
      }
    }

    if (this.payType == 'card')
      this.navCtrl.push(CreatePartnerAccount3Page, {paymentType: this.payType, paymentInfo: this.cardForm.value, businessInfo: this.navParams.get('businessInfo')});
    else if (this.payType == 'bank')
      this.navCtrl.push(CreatePartnerAccount3Page, {paymentType: this.payType, paymentInfo: this.bankForm.value, businessInfo: this.navParams.get('businessInfo')});
  }

  ionViewWillUnload() {
    this.formHelper.setForm('CreatePartnerAccount2-Card', this.cardForm); 
    this.formHelper.setForm('CreatePartnerAccount2-Bank', this.bankForm); 
    this.formHelper.setPayType(this.payType);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePartnerAccount2Page');
  }

}
