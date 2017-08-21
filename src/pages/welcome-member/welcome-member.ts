import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsAccountPage } from '../tabs/tabs-account';
import { AuthenticationProvider } from '../../providers/providers';

/**
 * Generated class for the WelcomeMemberPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome-member',
  templateUrl: 'welcome-member.html',
})
export class WelcomeMemberPage {
  account: any;

  constructor(
    public app: App, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authProvider: AuthenticationProvider) {

    let auth = authProvider.getAuthorization();
    this.account = auth.account;
  }

  enter() {
    this.navCtrl.setRoot(TabsAccountPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeMemberPage');
  }

}
