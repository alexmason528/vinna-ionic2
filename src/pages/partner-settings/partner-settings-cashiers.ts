import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';

import { Api, AuthenticationProvider } from '../../providers/providers';

/**
 * Generated class for the PartnerSettingsCashiersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-partner-settings',
  templateUrl: 'partner-settings-cashiers.html',
})
export class PartnerSettingsCashiersPage {

  new_cashier_email: string;
  cashiers = [];
  account: any;

  partner: any;

  cashierForm: FormGroup;

  isReadyToAdd = false;

  constructor(
    public alertCtrl: AlertController, 
    public api: Api, 
    public authentication: AuthenticationProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, 
    public navCtrl: NavController, 
    public navParams: NavParams) {

    this.cashierForm = formBuilder.group({
      email: ['', Validators.email]
    });

    this.cashierForm.valueChanges.subscribe( e => {
      this.isReadyToAdd = this.cashierForm.valid;
    });

    const auth = this.authentication.getAuthorization();

    this.partner = this.navParams.get('partner');
    this.account = auth.account;

    let seq = this.api.get('api/business/'+this.partner.id+'/cashier', {}, this.authentication.getRequestOptions());

    seq
      .map(res => res.json())
      .subscribe(res => {
         this.cashiers = res;
      }, err => {
        console.log(err);
      });

  }

  addCashier() {
    let loading = this.loadingCtrl.create({
      spinner: 'ios'
    });

    loading.present();
    
    let auth = this.authentication.getAuthorization();
    let seq = this.api.post('api/business/'+this.partner.id+'/cashier', this.cashierForm.value, this.authentication.getRequestOptions());

    seq
      .map(res => res.json())
      .subscribe(res => {
        auth['cashiers'] = res;
        this.authentication.saveAuthorization(auth);
        this.cashiers = res;
        loading.dismiss();
      }, err => {
        loading.dismiss();
        this.alertCtrl.create({
          title: 'Sorry!',
          subTitle: err._body,
          buttons: ['Okay']
        }).present();
      });
  }
  removeCashier(id) {
    let loading = this.loadingCtrl.create({
      spinner: 'ios'
    });
    loading.present();

    let auth = this.authentication.getAuthorization();
    this.account = auth['account'];
    
    let seq = this.api.delete('api/business/'+this.partner.id+'/cashier/'+id, this.authentication.getRequestOptions());

    seq
    .map(res => res.json())
    .subscribe(res => {
       auth['cashiers'] = res;
       this.authentication.saveAuthorization(auth);
       this.cashiers = res;
       loading.dismiss();
    }, err => {
      loading.dismiss();
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartnerSettingsCashiersPage');
  }

}
