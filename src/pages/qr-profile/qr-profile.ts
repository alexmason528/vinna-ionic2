import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthenticationProvider } from '../../providers/providers';

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
    public authentication: AuthenticationProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
    this.authentication.updates().subscribe(data => {
      if (data) {
        const auth = this.authentication.getAuthorization();
        this.account = auth.account;
      }
    });

    const auth = this.authentication.getAuthorization();
    this.account = auth.account;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrProfilePage');
  }

}
