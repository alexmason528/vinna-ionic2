import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { Camera } from '@ionic-native/camera';
import { GoogleMaps } from '@ionic-native/google-maps';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MyApp } from './app.component';

import { AboutPartnerProgramPage } from '../pages/about-partner-program/about-partner-program';
import { AccountRegistrationPage } from '../pages/account-registration/account-registration';
import { AccountRegistrationConfirmPage } from '../pages/account-registration/account-registration-confirm';
import { BusinessDirectoryPage } from '../pages/business-directory/business-directory';
import { BusinessProfilePage } from '../pages/business-profile/business-profile';
import { CompleteMemberAccountPage } from '../pages/complete-member-account/complete-member-account';
import { CompleteMemberAccount2Page } from '../pages/complete-member-account/complete-member-account-2';
import { CreateMemberAccountPage } from '../pages/create-member-account/create-member-account';
import { CreateMemberAccount2Page } from '../pages/create-member-account/create-member-account-2';
import { CreatePartnerAccountPage } from '../pages/create-partner-account/create-partner-account';
import { CreatePartnerAccount2Page } from '../pages/create-partner-account/create-partner-account-2';
import { CreatePartnerAccount3Page } from '../pages/create-partner-account/create-partner-account-3';
import { HomePage } from '../pages/home/home';
import { LandingPage } from '../pages/landing/landing';
import { LoginPage } from '../pages/login/login';
import { LoginForgetPasswordPage } from '../pages/login/login-forget-password';
import { LoginPasswordPage } from '../pages/login/login-password';
import { LoginPasswordChangeSuccessPage } from '../pages/login/login-password-change-success';
import { MakeAnnouncementPage } from '../pages/make-announcement/make-announcement';
import { MemberSettingsPage } from '../pages/member-settings/member-settings';
import { MemberSettingsBankPage } from '../pages/member-settings/member-settings-bank';
import { MemberSettingsEmailPage } from '../pages/member-settings/member-settings-email';
import { MemberSettingsMailingPage } from '../pages/member-settings/member-settings-mailing';
import { MemberSettingsNotificationPage } from '../pages/member-settings/member-settings-notification';
import { MemberSettingsPasswordPage } from '../pages/member-settings/member-settings-password';
import { MemberSettingsPhonePage } from '../pages/member-settings/member-settings-phone';
import { MemberSettingsPicturePage } from '../pages/member-settings/member-settings-picture';
import { NotificationPage } from '../pages/notification/notification';
import { PartnerSettingsPage } from '../pages/partner-settings/partner-settings';
import { PartnerSettingsBankPage } from '../pages/partner-settings/partner-settings-bank';
import { PartnerSettingsCashiersPage } from '../pages/partner-settings/partner-settings-cashiers';
import { PartnerSettingsDescriptionPage } from '../pages/partner-settings/partner-settings-description';
import { PartnerSettingsEmailPage } from '../pages/partner-settings/partner-settings-email';
import { PartnerSettingsHoursPage } from '../pages/partner-settings/partner-settings-hours';
import { PartnerSettingsMailingPage } from '../pages/partner-settings/partner-settings-mailing';
import { PartnerSettingsPercentagesPage } from '../pages/partner-settings/partner-settings-percentages';
import { PartnerSettingsPhonePage } from '../pages/partner-settings/partner-settings-phone';
import { PartnerSettingsPicturePage } from '../pages/partner-settings/partner-settings-picture';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileMenuPage } from '../pages/profile-menu/profile-menu';
import { QrProfilePage } from '../pages/qr-profile/qr-profile';
import { RegisterSalePage } from '../pages/register-sale/register-sale';
import { StatementPage } from '../pages/statement/statement';
import { SwitchProfilePage } from '../pages/switch-profile/switch-profile';
import { TabsPage } from '../pages/tabs/tabs';
import { TabsAccountPage } from '../pages/tabs/tabs-account';
import { ThreeStepsPage } from '../pages/three-steps/three-steps';
import { VerificationPage } from '../pages/verification/verification';
import { WelcomeMemberPage } from '../pages/welcome-member/welcome-member';
import { WelcomeToPartnerPage } from '../pages/welcome-to-partner/welcome-to-partner';

import { Api, AuthenticationProvider, DirectoryProvider, NotificationProvider, TransactionProvider, FormHelperProvider } from '../providers/providers';

import { TextMaskModule } from 'angular2-text-mask';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

let pages = [
  MyApp,
  AboutPartnerProgramPage,
  AccountRegistrationConfirmPage,
  BusinessDirectoryPage,
  BusinessProfilePage,
  CompleteMemberAccountPage,
  CompleteMemberAccount2Page,
  CreateMemberAccountPage,
  CreateMemberAccount2Page,
  CreatePartnerAccountPage,
  CreatePartnerAccount2Page,
  CreatePartnerAccount3Page,
  HomePage,
  LandingPage,
  LoginPage,
  LoginForgetPasswordPage,
  LoginPasswordPage,
  LoginPasswordChangeSuccessPage,
  MakeAnnouncementPage,
  MemberSettingsPage,
  MemberSettingsBankPage,
  MemberSettingsEmailPage,
  MemberSettingsMailingPage,
  MemberSettingsNotificationPage,
  MemberSettingsPasswordPage,
  MemberSettingsPhonePage,
  MemberSettingsPicturePage,
  NotificationPage,
  PartnerSettingsPage,
  PartnerSettingsBankPage,
  PartnerSettingsCashiersPage,
  PartnerSettingsDescriptionPage,
  PartnerSettingsEmailPage,
  PartnerSettingsHoursPage,
  PartnerSettingsMailingPage,
  PartnerSettingsPercentagesPage,
  PartnerSettingsPhonePage,
  PartnerSettingsPicturePage,
  ProfilePage,
  ProfileMenuPage,
  QrProfilePage,
  RegisterSalePage,
  StatementPage,
  SwitchProfilePage,
  TabsPage,
  TabsAccountPage,
  ThreeStepsPage,
  VerificationPage,
  WelcomeMemberPage,
  WelcomeToPartnerPage,
];

export function declarations() {
  return pages;
}

export function entryComponents() {
  return pages;
}

@NgModule({
  declarations: declarations(),
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    TextMaskModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      backButtonIcon: 'arrow-round-back',
      platforms: {
          ios: {
            scrollAssist: false,
            autoFocusAssist: false
          }
      }
    }),
    IonicStorageModule.forRoot({
        name: 'VinnaDB',
        driverOrder: ['sqlite', 'websql', 'indexeddb']
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: [
    Api,
    Camera,
    GoogleMaps,
    SocialSharing,
    SplashScreen,
    StatusBar,
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthenticationProvider,
    DirectoryProvider,
    NotificationProvider,
    TransactionProvider,
    FormHelperProvider
  ]
})
export class AppModule { }
