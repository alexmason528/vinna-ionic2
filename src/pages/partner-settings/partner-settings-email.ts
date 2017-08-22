import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';

import { Api, AuthenticationProvider } from '../../providers/providers';

/**
 * Generated class for the PartnerSettingsEmailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-partner-settings',
  templateUrl: 'partner-settings-email.html',
})
export class PartnerSettingsEmailPage {
  emailForm: FormGroup;

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

    this.partner = this.navParams.get('partner');
    
    let auth = this.authentication.getAuthorization();

    this.emailForm = formBuilder.group({
      current_email:[{value: this.partner.email, disabled: true}],
      email:['', Validators.compose([Validators.required, Validators.email])]
    });

    this.emailForm.valueChanges.subscribe( v => {
      if(this.partner.email == this.emailForm.value['email']) {
        this.isReadyToUpdate = false;
      } else {
        this.isReadyToUpdate = this.emailForm.valid;
      }
    });
  }

  changeEmail() {
    const auth = this.authentication.getAuthorization();
    
    let loading = this.loadingCtrl.create({
      spinner: 'ios'
    });

    loading.present();

    let seq = this.api.put('api/business/' + this.partner.id, this.emailForm.value, this.authentication.getRequestOptions());

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
        this.alertCtrl.create({
          message: 'Updated the business email successfully',
          buttons: ['Okay']
        }).present();
        this.navCtrl.pop();        
      }, err => {
        loading.dismiss();
        this.alertCtrl.create({
          title: 'Sorry!',
          subTitle: err,
          buttons: ['Dismiss']
        }).present();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartnerSettingsEmailPage');
  }

}
