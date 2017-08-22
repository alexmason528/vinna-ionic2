import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MemberSettingsBankPage } from './member-settings-bank';
import { MemberSettingsEmailPage } from './member-settings-email';
import { MemberSettingsPasswordPage } from './member-settings-password';
import { MemberSettingsPhonePage } from './member-settings-phone';
import { MemberSettingsPicturePage } from './member-settings-picture';
import { MemberSettingsMailingPage } from './member-settings-mailing';
import { MemberSettingsNotificationPage } from './member-settings-notification';

import { AuthenticationProvider } from '../../providers/providers';

/**
 * Generated class for the MemberSettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-member-settings',
  templateUrl: 'member-settings.html',
})
export class MemberSettingsPage {

  account:any;
  member:any;

  pages = {
    IDPicturePage: MemberSettingsPicturePage,
    EmailAddressPage: MemberSettingsEmailPage,
    PhoneNumberPage: MemberSettingsPhonePage,
    PasswordPage: MemberSettingsPasswordPage,
    MailingAddressPage: MemberSettingsMailingPage,
    BankAccountPage: MemberSettingsBankPage,
    ManageNotificationPage: MemberSettingsNotificationPage
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public authentication: AuthenticationProvider) {
    
    const auth = this.authentication.getAuthorization();
    this.account = auth.account;
    this.member = auth.member;
  }

  openNavDetailsPage(page) {
    this.navCtrl.push(this.pages[page]);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberSettingsPage');
  }

}
