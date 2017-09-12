import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';

import { Api, AuthenticationProvider, VersionInfoProvider } from '../../providers/providers';

/**
 * Generated class for the QrProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-qr-profile',
  templateUrl: 'qr-profile.html',
})
export class QrProfilePage {

  account: any;

  constructor(
    public alertCtrl: AlertController,
    public api: Api,
    public authentication: AuthenticationProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public versionInfoProvider: VersionInfoProvider) {
    this.authentication.updates().subscribe(data => {
      if (data) {
        const auth = this.authentication.getAuthorization();
        this.account = auth.account;
      }
    });

    const auth = this.authentication.getAuthorization();
    this.account = auth.account;

    this.versionInfoProvider.refreshVersionInfo();
  }

  getVersionInfo() {
    let seq = this.api.get(`api/core/mapp/ios/version`);
    seq
    .map(res => res.json())
    .subscribe(res => {
      
    }, err => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    this.versionInfoProvider.updates().subscribe(data => {
      this.alertCtrl.create({
        message: data,
        buttons: ['Okay']
      }).present();
    });
  }

}
