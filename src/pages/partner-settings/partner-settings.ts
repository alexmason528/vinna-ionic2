import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { PartnerSettingsBankPage } from './partner-settings-bank';
import { PartnerSettingsCashiersPage } from './partner-settings-cashiers';
import { PartnerSettingsDescriptionPage } from './partner-settings-description';
import { PartnerSettingsEmailPage } from './partner-settings-email';
import { PartnerSettingsHoursPage } from './partner-settings-hours';
import { PartnerSettingsMailingPage } from './partner-settings-mailing';
import { PartnerSettingsPercentagesPage } from './partner-settings-percentages';
import { PartnerSettingsPhonePage } from './partner-settings-phone';
import { PartnerSettingsPicturesPage } from './partner-settings-pictures';

import { AuthenticationProvider } from '../../providers/providers';

/**
 * Generated class for the PartnerSettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-partner-settings',
  templateUrl: 'partner-settings.html',
})
export class PartnerSettingsPage {
  pages = {
    BankAccountPage: PartnerSettingsBankPage,
    BusinessDescriptionPage: PartnerSettingsDescriptionPage,
    BusinessHoursPage: PartnerSettingsHoursPage,
    CashiersPage: PartnerSettingsCashiersPage,
    EmailAddressPage: PartnerSettingsEmailPage,
    MailingAddressPage: PartnerSettingsMailingPage,
    PercentagesPage: PartnerSettingsPercentagesPage,
    PhoneNumberPage: PartnerSettingsPhonePage,
    PicturesPage: PartnerSettingsPicturesPage
  };

  profile: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public authentication: AuthenticationProvider) {
    // TODO Set NavParams?
  }

  ionViewWillEnter() {
    this.profile = this.authentication.getProfile();
  }

  openNavDetailsPage(page) {
    this.navCtrl.push(this.pages[page], {partner: this.profile.object});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartnerSettingsPage');
  }

}
