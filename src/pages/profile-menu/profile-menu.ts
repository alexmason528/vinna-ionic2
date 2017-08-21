import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';

import { CompleteMemberAccountPage } from "../complete-member-account/complete-member-account";
import { CreatePartnerAccountPage } from "../create-partner-account/create-partner-account";
import { HomePage } from "../home/home";
import { MakeAnnouncementPage } from '../make-announcement/make-announcement';
import { MemberSettingsPage } from '../member-settings/member-settings';
import { PartnerSettingsPage } from '../partner-settings/partner-settings';
import { PartnerSettingsCashiersPage } from '../partner-settings/partner-settings-cashiers'
import { RegisterSalePage } from '../register-sale/register-sale';
import { SwitchProfilePage } from "../switch-profile/switch-profile";
import { VerificationPage } from '../verification/verification';

import { Api, AuthenticationProvider } from '../../providers/providers';


/**
 * Generated class for the ProfileMenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-menu',
  templateUrl: 'profile-menu.html',
})
export class ProfileMenuPage {

  account: any;
  member: any;

  purchaseInfo: any;
  profile: any;
  profileView: any;

  verified: boolean = false;

  constructor(
    public app: App,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public alertCtrl: AlertController,
    public socialSharing:SocialSharing, 
    public api: Api, 
    public authProvider: AuthenticationProvider) {

    const auth = this.authProvider.getAuthorization();
    
    this.account = auth.account;
    this.member = auth.member;

    this.verified = this.account.email_verified && this.account.phone_verified;
  }

  ionViewWillEnter() {
    this.doProfile();
  }

  goBack() {
    this.navCtrl.pop();
  }

  goSwitchProfile() {
    this.navCtrl.push(SwitchProfilePage);
  }  

  completeRegistration() {
    this.navCtrl.push(CompleteMemberAccountPage);
  }

  createPartnerAccount() {
    this.navCtrl.push(CreatePartnerAccountPage);
  }

  connectMember() {
    this.socialSharing.shareWithOptions({
        'message': "Welcome to Vinna!\n" + this.account.registration_link
      }).then(() => {
    }).catch((err) => {
      this.alertCtrl.create({
        message: 'There was a problem to send a referral link.' + err,
        buttons: ['Okay']
      }).present();
    });
  }

  loadVerification() {
    this.navCtrl.push(VerificationPage);    
  }

  registerSale() {
    this.navCtrl.push(RegisterSalePage);
  }

  partnerMakeAnnouncement() {
    this.navCtrl.push(MakeAnnouncementPage, {partner: this.profile});
  }
  
  partnerConnectCashier() {
    this.navCtrl.push(PartnerSettingsCashiersPage, {partner: this.profile});
  }

  goLogout() {
    this.alertCtrl.create({
      title: 'Log Out',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Logout',
          handler: () => {
            this.authProvider.logOut();
            this.app.getRootNav().setRoot(HomePage).then(() => {
              this.app.getRootNav().popToRoot();
            });
          }
        }
      ]
    }).present();
  }

  verify() {
    this.navCtrl.push(VerificationPage);
  }

  goAccountSettings() {
    this.navCtrl.push(MemberSettingsPage);    
  }

  goPartnerProgram() {
    this.navCtrl.push(CreatePartnerAccountPage);
  }

  goPartnerSettings() {
    this.navCtrl.push(PartnerSettingsPage, {partner: this.profile});
  }

  goPartnerConnectCashier() {
    this.navCtrl.push(PartnerSettingsCashiersPage, {partner: this.profile});
  }

  goVerify() {
    this.navCtrl.push(VerificationPage);
  }

  doProfile() {
    let profile = this.authProvider.getProfile();

    const auth = this.authProvider.getAuthorization();

    if (auth) {
      this.account = auth.account;
      this.member = auth.member;

      this.verified = this.account.email_verified && this.account.phone_verified;
    }

    this.profileView ='member';

    if (profile.type == 'cashier') {
      this.profileView ='cashier';
      this.profile = profile.object;
    } else if (profile.type == 'partner') {
      this.profileView ='partner';
      this.profile = profile.object;
    } else { // member
      this.profile = this.member;
    }
  }

}
