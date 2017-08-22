import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';

import { Api, AuthenticationProvider } from '../../providers/providers';

/**
 * Generated class for the MemberSettingsEmailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-member-settings',
  templateUrl: 'member-settings-email.html',
})
export class MemberSettingsEmailPage {
  account: any;
  user: any;
  emailForm: FormGroup;
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

    this.account = auth.account;
    this.user = auth.user;

    this.emailForm = formBuilder.group({
      current_email:[{value: this.user.email, disabled: true}],
      email:['', Validators.compose([Validators.required, Validators.email])],
    });

    this.emailForm.valueChanges.subscribe( v => {
      if(this.user.email == this.emailForm.value.email) {
        this.isReadyToUpdate = false;
      } else {
        this.isReadyToUpdate = this.emailForm.valid;
      }
    });
  }

  changeEmail() {
    let loading = this.loadingCtrl.create({
      spinner: 'ios'
    });

    let auth = this.authentication.getAuthorization();
    let seq = this.api.post('api/account/' + this.account.id + '/update_email', this.emailForm.value, this.authentication.getRequestOptions());

    loading.present();

    seq
      .map(res => res.json())
      .subscribe(res => {
        loading.dismiss();
        this.alertCtrl.create({
          message: 'Updated the email successfully',
          buttons: ['Okay']
        }).present();

        auth.account.new_email = this.account.new_email = this.emailForm.value.email;
        auth.account.email_verified = this.account.email_verified = false;
        
        this.authentication.saveAuthorization(auth);
      }, err => {
        loading.dismiss();
        this.alertCtrl.create({
          title: 'Sorry!',
          subTitle: err._body,
          buttons: ['Dismiss']
        }).present();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberSettingsEmailPage');
  }

}
