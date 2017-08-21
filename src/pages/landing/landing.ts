import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AboutPartnerProgramPage } from '../about-partner-program/about-partner-program';
import { AccountRegistrationPage } from '../account-registration/account-registration';
import { AccountRegistrationConfirmPage } from '../account-registration/account-registration-confirm';
import { BusinessDirectoryPage } from '../business-directory/business-directory';
import { BusinessProfilePage } from '../business-profile/business-profile';
import { CompleteMemberAccountPage } from '../complete-member-account/complete-member-account';
import { CompleteMemberAccount2Page } from '../complete-member-account/complete-member-account-2';
import { CreateMemberAccountPage } from '../create-member-account/create-member-account';
import { CreateMemberAccount2Page } from '../create-member-account/create-member-account-2';
import { CreatePartnerAccountPage } from '../create-partner-account/create-partner-account';
import { CreatePartnerAccount2Page } from '../create-partner-account/create-partner-account-2';
import { CreatePartnerAccount3Page } from '../create-partner-account/create-partner-account-3';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { LoginForgetPasswordPage } from '../login/login-forget-password';
import { LoginPasswordChangeSuccessPage } from '../login/login-password-change-success';
import { MakeAnnouncementPage } from '../make-announcement/make-announcement';
import { MemberSettingsPage } from '../member-settings/member-settings';
import { MemberSettingsBankPage } from '../member-settings/member-settings-bank';
import { MemberSettingsEmailPage } from '../member-settings/member-settings-email';
import { MemberSettingsMailingPage } from '../member-settings/member-settings-mailing';
import { MemberSettingsNotificationPage } from '../member-settings/member-settings-notification';
import { MemberSettingsPasswordPage } from '../member-settings/member-settings-password';
import { MemberSettingsPhonePage } from '../member-settings/member-settings-phone';
import { MemberSettingsPicturePage } from '../member-settings/member-settings-picture';
import { NotificationPage } from '../notification/notification';
import { PartnerSettingsPage } from '../partner-settings/partner-settings';
import { PartnerSettingsBankPage } from '../partner-settings/partner-settings-bank';
import { PartnerSettingsCashiersPage } from '../partner-settings/partner-settings-cashiers';
import { PartnerSettingsDescriptionPage } from '../partner-settings/partner-settings-description';
import { PartnerSettingsEmailPage } from '../partner-settings/partner-settings-email';
import { PartnerSettingsHoursPage } from '../partner-settings/partner-settings-hours';
import { PartnerSettingsMailingPage } from '../partner-settings/partner-settings-mailing';
import { PartnerSettingsPercentagesPage } from '../partner-settings/partner-settings-percentages';
import { PartnerSettingsPhonePage } from '../partner-settings/partner-settings-phone';
import { PartnerSettingsPicturePage } from '../partner-settings/partner-settings-picture';
import { ProfilePage } from '../profile/profile';
import { ProfileMenuPage } from '../profile-menu/profile-menu';
import { QrProfilePage } from '../qr-profile/qr-profile';
import { RegisterSalePage } from '../register-sale/register-sale';
import { StatementPage } from '../statement/statement';
import { SwitchProfilePage } from '../switch-profile/switch-profile';
import { TabsPage } from '../tabs/tabs';
import { TabsAccountPage } from '../tabs/tabs-account';
import { ThreeStepsPage } from '../three-steps/three-steps';
import { VerificationPage } from '../verification/verification';
import { WelcomeMemberPage } from '../welcome-member/welcome-member';
import { WelcomeToPartnerPage } from '../welcome-to-partner/welcome-to-partner';

/**
 * Generated class for the LandingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  homePage;
  welcomeMemberPage;
  qrProfilePage;
  profilePage;
  threeStepsPage;
  businessDirectoryPage;
  businessProfilePage;
  memberSettingsPage;
  loginPage;
  createMemberAccountPage;
  createMemberAccount2Page;
  completeMemberAccountPage;
  completeMemberAccount2Page;
  createPartnerAccountPage;
  createPartnerAccount2Page;
  createPartnerAccount3Page;
  welcomeToPartnerPage;
  registerSalePage;
  makeAnnouncementPage;
  statementPage;
  switchProfilePage;
  partnerSettingsPage;
  notificationPage;
  verificationPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.homePage = HomePage;
    this.welcomeMemberPage = WelcomeMemberPage;
    this.qrProfilePage = QrProfilePage;
    this.profilePage = ProfilePage;
    this.threeStepsPage = ThreeStepsPage;
    this.businessDirectoryPage = BusinessDirectoryPage;
    this.businessProfilePage = BusinessProfilePage;
    this.loginPage = LoginPage;
    this.memberSettingsPage = MemberSettingsPage;
    this.createMemberAccountPage = CreateMemberAccountPage;
    this.createMemberAccount2Page = CreateMemberAccount2Page;
    this.completeMemberAccountPage = CompleteMemberAccountPage;
    this.completeMemberAccount2Page = CompleteMemberAccount2Page;
    this.createPartnerAccountPage = CreatePartnerAccountPage;
    this.createPartnerAccount2Page = CreatePartnerAccount2Page;
    this.createPartnerAccount3Page = CreatePartnerAccount3Page;
    this.welcomeToPartnerPage = WelcomeToPartnerPage;
    this.registerSalePage = RegisterSalePage;
    this.makeAnnouncementPage = MakeAnnouncementPage;
    this.statementPage = StatementPage;
    this.partnerSettingsPage = PartnerSettingsPage;
    this.notificationPage = NotificationPage;
    this.verificationPage = VerificationPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }

}
