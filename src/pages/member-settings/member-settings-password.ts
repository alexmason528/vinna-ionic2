import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../../pages/login/login';

import { Api, AuthenticationProvider } from '../../providers/providers';

/**
 * Generated class for the MemberSettingsPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-member-settings',
  templateUrl: 'member-settings-password.html',
})
export class MemberSettingsPasswordPage {

  account: any;
  user: any;

  passwordForm: FormGroup;

  isReadyToUpdate = false;

  constructor(
    public alertCtrl: AlertController, 
    public api: Api, 
    public authentication: AuthenticationProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, 
    public navCtrl: NavController, 
    public navParams: NavParams) {

    let auth = this.authentication.getAuthorization();

    this.account = auth['account'];
    this.user = auth['user'];

    this.passwordForm = formBuilder.group({
      current_password: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.passwordForm.valueChanges.subscribe( e => {
      this.isReadyToUpdate = this.passwordForm.valid;
    });

  }

  changePassword() {
    let loading = this.loadingCtrl.create({
      spinner: 'ios'
    });

    this.passwordForm.value['username'] = this.user['username'];

    let seq = this.api.put('api/account/' + this.account['id'], this.passwordForm.value, this.authentication.getRequestOptions());

    loading.present();

    seq
    .map(res => res.json())
    .subscribe(res => {
      loading.dismiss();
      this.alertCtrl.create({
        message: 'Updated the password successfully',
        buttons: [ { 
          text: 'Okay', 
          handler: () => {
            this.authentication.removeAuthorization();
            this.navCtrl.push(LoginPage);
          } 
        }]
      }).present();
      
    }, err => {
      loading.dismiss();
      this.alertCtrl.create({
        message: 'There was a problem to update the password.',
        buttons: ['Dismiss']
      }).present();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberSettingsPasswordPage');
  }

}
