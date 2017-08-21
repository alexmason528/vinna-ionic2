import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthenticationProvider } from '../../providers/providers';

/**
 * Generated class for the QrProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qr-profile',
  templateUrl: 'qr-profile.html',
})
export class QrProfilePage {

  account: any;

  constructor(
    public authProvider: AuthenticationProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
    this.authProvider.updates().subscribe(data => {
      if (data) {
        const auth = this.authProvider.getAuthorization();
        this.account = auth.account;
      }
    });

    const auth = this.authProvider.getAuthorization();
    this.account = auth.account;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrProfilePage');
  }

}
