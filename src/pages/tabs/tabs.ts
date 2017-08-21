import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';

import { BusinessDirectoryPage } from '../business-directory/business-directory';
import { CreateMemberAccountPage } from '../create-member-account/create-member-account';
import { HomePage } from '../home/home';
import { LandingPage } from '../landing/landing';
import { LoginPage } from '../login/login';
import { NotificationPage } from '../notification/notification';
import { StatementPage } from '../statement/statement';

import { AuthenticationProvider } from '../../providers/providers';

/**
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;

  CreateMember = CreateMemberAccountPage;
  Home = HomePage;
  Landing = LandingPage;
  BusinessDirectory = BusinessDirectoryPage;
  Login = LoginPage;
  Notifications = NotificationPage;
  Statement = StatementPage;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authentication: AuthenticationProvider) {
  }

  ionViewWillEnter() {
    this.authentication.verifyToken();
    this.tabRef.select(1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
