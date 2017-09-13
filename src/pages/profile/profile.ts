import { Component } from '@angular/core';
import { AlertController, App, LoadingController, ModalController, NavController, NavParams } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';

import { CompleteMemberAccountPage } from '../complete-member-account/complete-member-account';
import { CreatePartnerAccountPage } from '../create-partner-account/create-partner-account';
import { MakeAnnouncementPage } from '../make-announcement/make-announcement';
import { MemberSettingsPage } from '../member-settings/member-settings';
import { PartnerSettingsCashiersPage } from '../partner-settings/partner-settings-cashiers'
import { PartnerSettingsPage } from '../partner-settings/partner-settings';
import { ProfileMenuPage } from '../profile-menu/profile-menu';
import { RegisterSalePage } from '../register-sale/register-sale';
import { SwitchProfilePage } from '../switch-profile/switch-profile';
import { VerificationPage } from '../verification/verification';

import { Api, AuthenticationProvider, TransactionProvider } from '../../providers/providers';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  account: any;
  member: any;

  purchaseInfo: any;
  profile: any;
  profileView: any;

  summary: any = [];

  verified: boolean = false;

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public api: Api, 
    public authentication: AuthenticationProvider,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public socialSharing:SocialSharing,
    public transaction: TransactionProvider) {

    const auth = this.authentication.getAuthorization();
    
    this.account = auth.account;
    this.member = auth.member;

    this.verified = this.account.email_verified && this.account.phone_verified;

    this.doProfile();
    this.authentication.updates().subscribe(data => {
       this.doProfile();
    });

    this.transaction.summaryUpdates().subscribe(data => {
      this.summary = data;
      console.log(data);
    });
/*
    let loader = this.loadingCtrl.create({ spinner: 'ios'});

    let seq = this.api.get(`api/account/${this.account.id}/purchase_summary`, {name: 'account_id', value: this.account.id}, this.authentication.getRequestOptions());

    loader.present();

    seq
    .map(res => res.json())
    .subscribe(res => {
      loader.dismiss();
      this.purchaseInfo = res;
      this.doProfile();
    }, err => {
      loader.dismiss();
      console.log(err);
    });
    */
  }

  ionViewWillEnter() {    
    this.doProfile();
  }


  openProfileMenu() {
    this.navCtrl.push(ProfileMenuPage);
  }

  openModal() {
    let modal = this.modalCtrl.create(SwitchProfilePage, {});

    modal.onDidDismiss(data => {
      this.profile = data;
      this.doProfile();
    });

    modal.onWillDismiss(data => {
      this.profile = data;
      this.doProfile();
    });

    modal.present();
  }

  doProfile() {
    console.log('doProfile');
    let profile = this.authentication.getProfile();
    console.log(profile);
    const auth = this.authentication.getAuthorization();
    console.log(auth);
    this.summary = this.transaction.getSummary();

    if (auth) {
      this.account = auth.account;
      this.member = auth.member;

      this.verified = this.account.email_verified && this.account.phone_verified;
    }

    this.profileView = profile.type;

    if (profile.type == 'cashier' || profile.type == 'partner') {
      this.profile = profile.object;
    } else {
      this.profile = this.member;
    }
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

  verify() {
    this.navCtrl.push(VerificationPage);
  }

  goAccountSettings() {
    this.navCtrl.push(MemberSettingsPage);    
  }

  goPartnerSettings() {
    this.navCtrl.push(PartnerSettingsPage);    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
