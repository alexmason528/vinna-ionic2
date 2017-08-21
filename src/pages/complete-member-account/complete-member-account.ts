import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

import { CompleteMemberAccount2Page } from './complete-member-account-2';

import { Api, AuthenticationProvider, FormHelperProvider } from '../../providers/providers';
/**
 * Generated class for the CompleteMemberAccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-complete-member-account',
  templateUrl: 'complete-member-account.html',
})
export class CompleteMemberAccountPage {

  countries = [];
  form: FormGroup;
  states = [];

  constructor(
    public alertCtrl: AlertController,
    public authentication: AuthenticationProvider,
    public api: Api, 
    public formBuilder: FormBuilder, 
    public formHelper: FormHelperProvider,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams) {

    const auth = this.authentication.getAuthorization();

    this.countries = auth['countries'];

    this.form = this.formHelper.getForm('CompleteMemberAccount');
    if (!this.form)
      this.form = formBuilder.group({
        mailing_address_country_id: ['', Validators.required],
        mailing_address_state_id: [{value:'', disabled: true}, Validators.required],
        mailing_address_city: ['', Validators.required],
        mailing_address_zip: ['', Validators.required],
        mailing_address_1: ['', Validators.required],
        mailing_address_2: ['']
      });
    else this.getStates();
  }

  navNextPage() {
    if(this.form.invalid) {
      let error_message;

      if (this.form.get('mailing_address_country_id').hasError('required')) {
        error_message = 'Please select your country';
      } else if(this.form.get('mailing_address_state_id').hasError('required')) {
        error_message = 'Please select your state'; 
      } else if(this.form.get('mailing_address_city').hasError('required')) {
        error_message = 'Please input your city'; 
      } else if(this.form.get('mailing_address_zip').hasError('required')) {
        error_message = 'Please input your zipcode'; 
      } else if(this.form.get('mailing_address_1').hasError('required')) {
        error_message = 'Please input your mailing address'; 
      }

      this.alertCtrl.create({
        message: error_message,
        buttons: ['Okay']
      }).present();

      return;
    }


    // let headers = new Headers();

    // headers.append('Authorization', 'Basic ' +  btoa('test_bd1002897812f5d6a7683ad2f11ca81dbad:'));

    // let state_abbrev;

    // for(const state of this.states) {
    //   if(state.id == this.form.value['mailing_address_state_id']) {
    //     state_abbrev = state.abbrev;
    //     break;
    //   }
    // }

    // let country_abbrev;

    // for(const country of this.countries) {
    //   if(country.id == this.form.value['mailing_address_country_id']) {
    //     country_abbrev = country.abbrev;
    //     break;
    //   }
    // }

    // if (country_abbrev == 'US') {
    //   const addressInfo = {
    //     zip_code: this.form.value['mailing_address_zip'],
    //     state: state_abbrev,
    //     city: this.form.value['mailing_address_city'],
    //     primary_line: this.form.value['mailing_address_1'],
    //     secondary_line: this.form.value['mailing_address_2'],
    //   };

    //   let loading = this.loadingCtrl.create({
    //     spinner: 'ios'
    //   });

    //   loading.present();

    //   let seq = this.api.postTo('https://api.lob.com/v1/us_verifications', addressInfo, new RequestOptions({headers: headers}));
    //   seq
    //   .map(res => res.json())
    //   .subscribe(res => {
    //     console.log(res);
        
    //     loading.dismiss();
    //     this.navCtrl.push(CompleteMemberAccount2Page, {mailingInfo: this.form.value});
    //   }, err => {
    //     loading.dismiss();
    //     this.alertCtrl.create({
    //       message: err.json().error.message,
    //       buttons: ['Dismiss']
    //     }).present();
    //   });
    // } else {
    //   const addressInfo = {
    //     address_zip: this.form.value['mailing_address_zip'],
    //     address_state: state_abbrev,
    //     address_city: this.form.value['mailing_address_city'],
    //     address_line1: this.form.value['mailing_address_1'],
    //     address_line2: this.form.value['mailing_address_2'],
    //     address_country: country_abbrev,
    //   };

    //   let loading = this.loadingCtrl.create({
    //     spinner: 'ios'
    //   });

    //   loading.present();

    //   let seq = this.api.postTo('https://api.lob.com/v1/intl_verifications', addressInfo, new RequestOptions({headers: headers}));
    //   seq
    //   .map(res => res.json())
    //   .subscribe(res => {
    //     loading.dismiss();
    //     this.navCtrl.push(CompleteMemberAccount2Page, {mailingInfo: this.form.value});
    //   }, err => {
    //     loading.dismiss();
    //     this.alertCtrl.create({
    //       message: err.json().error.message,
    //       buttons: ['Dismiss']
    //     }).present();
    //   });
    // }
    this.navCtrl.push(CompleteMemberAccount2Page, {mailingInfo: this.form.value});
  }

  getStates() {
    let id = this.form.value['mailing_address_country_id'];
    if (!id) return;

    this.form.controls['mailing_address_state_id'].enable(true);
    for (let country of this.countries) {
      if (country.id == id) {
        this.states = country.states;
        this.form.controls['mailing_address_state_id'].enable(false);
        break;
      }
    }
  }

  ionViewWillUnload() {

    this.formHelper.setForm('CompleteMemberAccount', this.form); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompleteMemberAccountPage');
  }

}
