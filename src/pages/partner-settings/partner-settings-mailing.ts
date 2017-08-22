import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';

import { Api, AuthenticationProvider } from '../../providers/providers';

/**
 * Generated class for the PartnerSettingsMailingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-partner-settings',
  templateUrl: 'partner-settings-mailing.html',
})
export class PartnerSettingsMailingPage {
  mailingForm: FormGroup;
  partner: any;
  isReadyToUpdate = false;
  countries = [];
  states = [];

  constructor(
    public alertCtrl: AlertController, 
    public api: Api, 
    public authentication: AuthenticationProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, 
    public navCtrl: NavController, 
    public navParams: NavParams) {

    let auth = this.authentication.getAuthorization();
    this.countries = auth['countries'];

    this.partner = this.navParams.get('partner');

    this.mailingForm = formBuilder.group({
      country_id: [this.partner.country_id, Validators.required],
      state_id: [this.partner.state_id, Validators.required],
      city: [this.partner.city, Validators.required],
      zip: [this.partner.zip, Validators.required],
      address1: [this.partner.address1, Validators.required],
      address2: [this.partner.address2, Validators.required]
    });

    this.mailingForm.valueChanges.subscribe( e => {
      this.isReadyToUpdate = this.mailingForm.valid;
    });
    
    this.getStates();
  }

  getStates() {
    const id = this.mailingForm.value['country_id'];

    this.mailingForm.controls['state_id'].enable(true);
    for (let country of this.countries) {
      if (country.id == id) {
        this.states = country.states;
        this.mailingForm.controls['state_id'].enable(false);
        break;
      }
    }
  }

  changeMailingAddress() {
    const auth = this.authentication.getAuthorization();
    
    let loading = this.loadingCtrl.create({
      spinner: 'ios'
    });

    let alert;    
    let seq = this.api.put('api/business/' + this.partner.id, this.mailingForm.value, this.authentication.getRequestOptions());

    loading.present();

    seq
      .map(res => res.json())
      .subscribe(res => {
        loading.dismiss();

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

        alert = this.alertCtrl.create({
          message: 'Updated the business mailing address successfully',
          buttons: ['Okay']
        });
        alert.present();
      }, err => {
        loading.dismiss();
        alert = this.alertCtrl.create({
          message: 'There was a problem to update the business mailing address.',
          buttons: ['Dismiss']
        });
        alert.present();
      });
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartnerSettingsMailingPage');
  }

}
