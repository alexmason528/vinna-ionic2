import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Camera, CameraOptions } from '@ionic-native/camera';

import { ActionSheetController, AlertController, IonicPage, LoadingController, NavController, NavParams, Platform } from 'ionic-angular';

import { HomePage } from '../home/home';
import { WelcomeMemberPage } from '../welcome-member/welcome-member';

import { Api, AuthenticationProvider, FormHelperProvider } from '../../providers/providers';


/**
 * Generated class for the CreateMemberAccount2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-member-account-2',
  templateUrl: 'create-member-account-2.html',
})
export class CreateMemberAccount2Page {
  accountInfo: any;
  form: FormGroup;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public api: Api,
    public authentication: AuthenticationProvider,
    public camera: Camera,
    public formBuilder: FormBuilder, 
    public formHelper: FormHelperProvider,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public platform: Platform) {

    this.accountInfo = navParams.get('accountInfo');
    this.form = this.formHelper.getForm('CreateMemberAccount2');

    if (!this.form) {
      this.form = formBuilder.group({
        profilePic: ['', Validators.required]
      });
    }
  }

  openSourceTypeSheet() {
    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 400,
      targetHeight: 400,
      allowEdit:true,
      cameraDirection:this.camera.Direction.FRONT,
    };

    this.actionSheetCtrl.create({
      title: 'Choose your picture source',
      buttons: [
        {
          text: 'Using Camera',
          handler: () => {
            options.sourceType = this.camera.PictureSourceType.CAMERA;
            this.getPicture(options);
          }
        },{
          text: 'From PhotoLibrary',
          handler: () => {
            options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY; 
            this.getPicture(options);
          }
        },{
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).present();
  }

  getPicture(options) {
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.form.patchValue({ 'profilePic': base64Image });
    }, (err) => {
      if (err != "no image selected") {
        this.alertCtrl.create({
          message: 'Unable to take a photo.' + err,
          buttons: ['Okay']
        }).present();
      }
    });
  }

  cancel() {
    this.navCtrl.push(HomePage);
  }

  createMember() {

    if(this.form.invalid) {
      let error_message;

      if (this.form.get('profilePic').hasError('required')) {
        error_message = 'Please add your profile image';
      }

      this.alertCtrl.create({
        message: error_message,
        buttons: ['Okay']
      }).present();

      return;
    } 

    this.formHelper.setForm('CreateMemberAccount2', this.form); 

    let loading = this.loadingCtrl.create({
      spinner: 'ios'
    });
  
    loading.present();

    this.accountInfo['language_id'] = 1;

    if (this.platform.is('core')) // For testing on web browser.
      this.accountInfo['profile_photo_url'] = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEX/TQBcNTh/AAAAAXRSTlPM0jRW/QAAAApJREFUeJxjYgAAAAYAAzY3fKgAAAAASUVORK5CYII=";
    else
      this.accountInfo['profile_photo_url'] = this.form.controls['profilePic'].value;

    let seq = this.api.post('api/account', this.accountInfo);

    seq
      .map(res => res.json())
      .subscribe(res => {
        this.formHelper.flushForm('CreateMemberAccount');
        this.formHelper.flushForm('CreateMemberAccount2');
        const credential = {
          username: this.accountInfo['email'],
          password: this.accountInfo['password']
        };
        
        this.authentication
        .logIn(credential, 
          res => {
            loading.dismiss();
            this.navCtrl.push(WelcomeMemberPage);  
          }, 
          err => {
            loading.dismiss();
            console.log(err);
            this.alertCtrl.create({
              title: 'Sorry',
              subTitle: err._body,
              buttons: ['Okay']
            }).present();
          }
        );
      }, err => {
        console.log(err);
        loading.dismiss();
        this.alertCtrl.create({
          title: 'Sorry',
          subTitle: err._body,
          buttons: ['Okay']
        }).present();
      });
  }

  ionViewWillUnload() {
    this.formHelper.setForm('CompleteMemberAccount2', this.form); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateMemberAccount2Page');
  }

}
