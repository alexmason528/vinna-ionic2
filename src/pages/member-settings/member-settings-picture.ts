import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActionSheetController, AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { Api, AuthenticationProvider } from '../../providers/providers';
/**
 * Generated class for the MemberSettingsPicturePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-member-settings',
  templateUrl: 'member-settings-picture.html',
})
export class MemberSettingsPicturePage {

  account: any;
  pictureForm: FormGroup;

  isReadyToUpdate = false;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public api: Api, 
    public authentication: AuthenticationProvider,
    public camera: Camera,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, 
    public navCtrl: NavController, 
    public navParams: NavParams) {

    let auth = this.authentication.getAuthorization();

    this.account = auth.account;

    this.pictureForm = formBuilder.group({
      profile_photo_url:[this.account.profile_photo_url, Validators.required]
    });

    this.pictureForm.valueChanges.subscribe( e => {
      this.isReadyToUpdate = this.pictureForm.valid;
    });
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
      let base64Image = `data:image/jpeg;base64,${imageData}`;
      this.pictureForm.patchValue({ 'profile_photo_url': base64Image });
    }, (err) => {
      this.alertCtrl.create({
        message: 'Unable to take a photo',
        buttons: ['Okay']
      }).present();
    });
  }

  changePicture() {
    let loading = this.loadingCtrl.create({
      spinner: 'ios'
    });
    let auth = this.authentication.getAuthorization();
    let seq = this.api.put(`api/account/${this.account.id}`, this.pictureForm.value, this.authentication.getRequestOptions());

    loading.present();

    seq
      .map(res => res.json())
      .subscribe(res => {
        loading.dismiss();

        auth.account.profile_photo_url = res.profile_photo_url;;
        this.authentication.saveAuthorization(auth);

        this.alertCtrl.create({
          message: 'Updated the photo successfully',
          buttons: [{
            text: 'Okay',
            handler: () => { this.navCtrl.pop(); }
          }]
        }).present();
      }, err => {
        loading.dismiss();
        this.alertCtrl.create({
          message: 'There was a problem to update the photo.',
          buttons: ['Dismiss']
        }).present();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberSettingsPicturePage');
  }

}
