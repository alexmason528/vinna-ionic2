import { Component } from '@angular/core';

import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { Api, AuthenticationProvider } from '../../providers/providers';

/**
 * Generated class for the RegisterSalePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-register-sale',
  templateUrl: 'register-sale.html',
})
export class RegisterSalePage {

  amount:string = '';
  amount100:string = '';

  profile: any;
  isReadyToScan = false;

  constructor(
    public alertCtrl: AlertController, 
    public api: Api,
    public authentication: AuthenticationProvider,
    public barcodeScanner: BarcodeScanner, 
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams) {

    this.profile = this.authentication.getProfile();
  }

  numpadClicked(number) {

    switch (number) {
      case '0':
        if(this.amount100 == '') return;
        this.amount100 += number;
        break;
      case 'dot':
        //if(this.amount100.length == 0 || this.amount.search(/[.]/g) != -1) return;
        //this.amount += '.';
        break;
      case 'back':
        if (this.amount100.length == 0) return;
        this.amount100 = this.amount100.substr(0, this.amount100.length-1);
        break;
      default:
        this.amount100 += number;
        break;
    }

    console.log(this.amount100);

    if (this.amount100.length == 0) this.amount = "00.00";
    else {
      this.amount = (parseFloat(this.amount100) / 100).toFixed(2);
      if (parseFloat(this.amount100) < 100) this.amount = "0" + this.amount;
    }

    this.amount = '$ ' + this.amount;

    if (this.amount100.length > 0)
      this.isReadyToScan = true;
    else 
      this.isReadyToScan = false;
  }

  scanCode() {
    this.barcodeScanner.scan().then( qrcode => {

      if (!qrcode.text) return;

      const amountNumber = parseFloat(this.amount100) / 100;

      let loading = this.loadingCtrl.create({
        spinner: 'ios'
      });

      const saleInfo = {
        'amount': amountNumber,
        'qrcode': qrcode.text,
        'business_id': this.profile.object.id,
        'cashier_account_id': this.profile.object.account_id
      };

      let seq = this.api.post('api/purchase', saleInfo, this.authentication.getRequestOptions());

      seq
      .map(res => res.json())
      .subscribe(res => {
        loading.dismiss();
        this.alertCtrl.create({
          message: 'Successfully registered sale',
          buttons: ['Okay']
        }).present();
        this.navCtrl.pop();
      }, err => {
        loading.dismiss();
        this.alertCtrl.create({
          message: 'There was a problem to register sale' + err._body,
          buttons: ['Okay']
        }).present();
      });

    }, err => {
      this.alertCtrl.create({
        message: 'Unable to scan QR Code',
        buttons: ['Okay']
      }).present();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterSalePage');
  }

}
