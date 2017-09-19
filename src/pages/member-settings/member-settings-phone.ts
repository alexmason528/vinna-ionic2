import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';

import { Api, AuthenticationProvider } from '../../providers/providers';

/**
 * Generated class for the MemberSettingsPhonePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-member-settings',
  templateUrl: 'member-settings-phone.html',
})
export class MemberSettingsPhonePage {

  account: any;
  phoneForm: FormGroup;
  isReadyToUpdate = false;
  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  
  constructor(
    public alertCtrl: AlertController, 
    public api: Api, 
    public authService: AuthenticationProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, 
    public navCtrl: NavController, 
    public navParams: NavParams) {

    let auth = this.authService.getAuthorization();

    this.account = auth.account;

    this.phoneForm = formBuilder.group({
      current_phone:[{value: this.account.phone, disabled:true}],
      phone:['', Validators.compose([Validators.required])]
    });

    this.phoneForm.valueChanges.subscribe( (evt) => {
      const phone_number = this.phoneForm.value.phone.replace(/\D+/g, '')
      if (this.account.phone == phone_number || phone_number.length != 10) {
        this.isReadyToUpdate = false;
      } else {
        this.isReadyToUpdate = this.phoneForm.valid;
      }
    });
  }

  changePhone() {
    this.phoneForm.patchValue({'phone': this.phoneForm.value.phone.replace(/\D+/g, '')});

    let loading = this.loadingCtrl.create({
      spinner: 'ios'
    });
    let auth = this.authService.getAuthorization();
    let seq = this.api.post(`api/account/${this.account.id}/update_phone`, this.phoneForm.value, this.authService.getRequestOptions());

    loading.present();
    seq
    .map(res => res.json())
    .subscribe(res => {
      loading.dismiss();

      auth.account.new_phone = this.account.new_phone = this.phoneForm.value.phone;
      auth.account.phone_verified = this.account.phone_verified = false;

      this.authService.saveAuthorization(auth);

      this.alertCtrl.create({
        message: 'Updated the phone number successfully',
        buttons: [
        {
          text: 'Okay',
          handler: () => { this.navCtrl.pop(); }
        }]
      }).present();      
    }, err => {
      console.log(err);
      loading.dismiss();
      this.alertCtrl.create({
        message: err._body,
        buttons: ['Dismiss']
      }).present();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberSettingsPhonePage');
  }

}
