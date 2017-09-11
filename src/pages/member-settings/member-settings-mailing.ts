import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';

import { Api, AuthenticationProvider } from '../../providers/providers';

/**
 * Generated class for the MemberSettingsMailingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-member-settings',
  templateUrl: 'member-settings-mailing.html',
})
export class MemberSettingsMailingPage {

  member: any;
  countries = [];
  states = [];

  isReadyToUpdate = false;

  mailingAddressForm: FormGroup;

  constructor(
    public alertCtrl: AlertController, 
    public api: Api, 
    public authentication: AuthenticationProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, 
    public navCtrl: NavController, 
    public navParams: NavParams) {

    const auth = this.authentication.getAuthorization();

    this.member = auth.member;

    this.countries = auth.countries;

    this.mailingAddressForm = formBuilder.group({
      mailing_address_country_id: [this.member.mailing_address_country_id, Validators.required],
      mailing_address_state_id: [this.member.mailing_address_state_id, Validators.required],
      mailing_address_city: [this.member.mailing_address_city, Validators.required],
      mailing_address_zip: [this.member.mailing_address_zip, Validators.required],
      mailing_address_1: [this.member.mailing_address_1, Validators.required],
      mailing_address_2: [this.member.mailing_address_2]
    });

    this.getStates(this.member.mailing_address_country_id);
    this.mailingAddressForm.patchValue({ mailing_address_state_id: this.member.mailing_address_state_id });

    this.mailingAddressForm.valueChanges.subscribe( e => {
      let updated = false;
      for(let key in this.mailingAddressForm.value) {
        if (this.mailingAddressForm.value[key] != this.member[key])
          updated = true;
      }

      if (updated) {
        this.isReadyToUpdate = this.mailingAddressForm.valid;  
      } else {
        this.isReadyToUpdate = false;
      }
    });
  }

  getStates(id) {

    this.mailingAddressForm.controls['mailing_address_state_id'].disable();
    for (let country of this.countries) {
      if (country.id == id) {
        this.states = country.states;
        if (country.states.length > 0) {
          this.mailingAddressForm.controls['mailing_address_state_id'].enable();
        }
        this.mailingAddressForm.patchValue({ mailing_address_state_id: ''});
        break;
      }
    }
  }

  changeMailingAddress() {
    let loading = this.loadingCtrl.create({
      spinner: 'ios'
    });

    let auth = this.authentication.getAuthorization();
    let seq = this.api.put('api/member/' + this.member['id'], this.mailingAddressForm.value, this.authentication.getRequestOptions());

    loading.present();

    seq
      .map(res => res.json())
      .subscribe(res => {
        loading.dismiss();
        this.alertCtrl.create({
          message: 'Updated the mailing address successfully',
          buttons: [
          {
            text: 'Okay',
            handler: () => { this.navCtrl.pop(); }
          }]
        }).present();
        auth['member'] = this.member = res;
        this.authentication.saveAuthorization(auth);
      }, err => {
        loading.dismiss();
        this.alertCtrl.create({
          message: 'There was a problem to update the mailing address.',
          buttons: ['Dismiss']
        }).present();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberSettingsMailingPage');
  }

}
