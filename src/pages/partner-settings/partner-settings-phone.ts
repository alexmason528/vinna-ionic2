import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';

import { Api, AuthenticationProvider } from '../../providers/providers';


/**
 * Generated class for the PartnerSettingsPhonePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-partner-settings',
  templateUrl: 'partner-settings-phone.html',
})
export class PartnerSettingsPhonePage {
  phoneForm: FormGroup;

  isReadyToUpdate = false;
  partner: any;

  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
    public alertCtrl: AlertController, 
    public api: Api, 
    public authentication: AuthenticationProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, 
    public navCtrl: NavController, 
    public navParams: NavParams) {

    this.partner = this.navParams.get('partner'); 

    this.phoneForm = formBuilder.group({
      current_phone:[{value: this.partner.phone, disabled:true}],
      phone:['', Validators.compose([Validators.required])]
    });

    this.phoneForm.valueChanges.subscribe( e => {
      const phone_number = this.phoneForm.value['phone'].replace(/\D+/g, '');
      if(this.partner.phone == phone_number || phone_number.length != 10) {
        this.isReadyToUpdate = false;
      } else {
        this.isReadyToUpdate = this.phoneForm.valid;
      }
    });  
  }

  changePhone() {
    let auth = this.authentication.getAuthorization();
    
    let loading = this.loadingCtrl.create({
      spinner: 'ios'
    });
  
    this.phoneForm.patchValue({'phone': this.phoneForm.value['phone'].replace(/\D+/g, '')});

    let seq = this.api.put('api/business/' + this.partner.id, this.phoneForm.value, this.authentication.getRequestOptions());

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

      this.phoneForm.patchValue({'phone': ''});
      
      this.authentication.saveAuthorization(auth);
      this.authentication.saveProfile({
        type: 'partner',
        object: res
      });

      this.alertCtrl.create({
        message: 'Updated the business phone number successfully',
        buttons: [
        {
          text: 'Okay',
          handler: () => { this.navCtrl.pop(); }
        }]
      }).present();
    }, err => {
      loading.dismiss();
      this.alertCtrl.create({
        message: 'There was a problem to update the business phone number.',
        buttons: ['Dismiss']
      }).present();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartnerSettingsPhonePage');
  }

}
