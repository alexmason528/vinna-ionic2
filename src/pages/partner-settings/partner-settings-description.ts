import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';

import { Api, AuthenticationProvider } from '../../providers/providers';
/**
 * Generated class for the PartnerSettingsDescriptionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-partner-settings',
  templateUrl: 'partner-settings-description.html',
})
export class PartnerSettingsDescriptionPage {

  descForm: FormGroup;

  partner: any;

  isReadyToUpdate = false;

  constructor(
    public alertCtrl: AlertController, 
    public api: Api, 
    public authentication: AuthenticationProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, 
    public navCtrl: NavController, 
    public navParams: NavParams) {

    const auth = this.authentication.getAuthorization();
    this.partner = this.navParams.get('partner');

    this.descForm = formBuilder.group({
      description:[this.partner.description, Validators.required]
    });
    
    this.descForm.valueChanges.subscribe( e => {
      if (this.descForm.value.description == this.partner.description) {
        this.isReadyToUpdate = false;
      } else {
        this.isReadyToUpdate = this.descForm.valid;
      }
    });
  }

  changeDesc() {
    let auth = this.authentication.getAuthorization();

    let loading = this.loadingCtrl.create({
      spinner: 'ios'
    });
    let seq = this.api.put(`api/business/${this.partner.id}`, this.descForm.value, this.authentication.getRequestOptions());

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

      this.partner = res;
      this.alertCtrl.create({
        message: 'Updated the business description successfully',
        buttons: [
        {
          text: 'Okay',
          handler: () => { this.navCtrl.pop(); }
        }]
      }).present();
    }, err => {
      loading.dismiss();
      this.alertCtrl.create({
        title: 'Sorry!',
        subTitle: err,
        buttons: ['Dismiss']
      }).present;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartnerSettingsDescriptionPage');
  }

}
