import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { TabsAccountPage } from '../tabs/tabs-account';
import { AuthenticationProvider } from '../../providers/providers';

/**
 * Generated class for the WelcomeMemberPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-welcome-member',
  templateUrl: 'welcome-member.html',
})
export class WelcomeMemberPage {
  account: any;

  constructor(
    public app: App, 
    public authentication: AuthenticationProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {

    let auth = authentication.getAuthorization();
    this.account = auth.account;
  }

  enter() {
    this.navCtrl.setRoot(TabsAccountPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeMemberPage');
  }

}
