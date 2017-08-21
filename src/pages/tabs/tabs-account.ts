import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';

import { BusinessDirectoryPage } from '../business-directory/business-directory';
import { LandingPage } from '../landing/landing';
import { NotificationPage } from '../notification/notification';
import { ProfilePage } from '../profile/profile';
import { QrProfilePage } from '../qr-profile/qr-profile';
import { StatementPage } from '../statement/statement';

import { AuthenticationProvider } from '../../providers/providers';
/**
 * Generated class for the TabsAccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs-account',
  templateUrl: 'tabs-account.html',
})
export class TabsAccountPage {
  @ViewChild('myTabs') tabRef: Tabs;

  QrProfile = QrProfilePage;
  Profile = ProfilePage;
  Landing = LandingPage;
  Notifications = NotificationPage;
  BusinessDirectory = BusinessDirectoryPage;
  Statement = StatementPage;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authentication: AuthenticationProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsAccountPage');
  }

  ionViewWillEnter() {
    this.tabRef.select(0);
  }
}
