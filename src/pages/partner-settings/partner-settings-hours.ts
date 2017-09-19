import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';

import { Api, AuthenticationProvider } from '../../providers/providers';

/**
 * Generated class for the PartnerSettingsHoursPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-partner-settings',
  templateUrl: 'partner-settings-hours.html',
})
export class PartnerSettingsHoursPage {
  partner: any;
  hours: any;
  isReadyToChange = false;

  constructor(
    public alertCtrl: AlertController, 
    public api: Api, 
    public authentication: AuthenticationProvider,
    public loadingCtrl: LoadingController, 
    public navCtrl: NavController, 
    public navParams: NavParams) {

    this.partner = this.navParams.get('partner');
    this.hours = JSON.parse(this.partner.hours);

  }

  modified() {
    console.log(JSON.stringify(this.hours));
    console.log(this.partner.hours);

    if (JSON.stringify(this.hours) == this.partner.hours)
      this.isReadyToChange = false;
    else
      this.isReadyToChange = true;
  }

  changeHour() {
    let auth = this.authentication.getAuthorization();
    let loading = this.loadingCtrl.create({
      spinner: 'ios'
    });
    let seq = this.api.put(`api/business/${this.partner.id}`, {hours: JSON.stringify(this.hours)}, this.authentication.getRequestOptions());

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
          message: 'Updated the business hours successfully',
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
    console.log('ionViewDidLoad PartnerSettingsHoursPage');
  }

}
