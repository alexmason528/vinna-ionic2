import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController, AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

import { Api, AuthenticationProvider } from '../../providers/providers';

/**
 * Generated class for the PartnerSettingsPicturesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-partner-settings',
  templateUrl: 'partner-settings-pictures.html',
})
export class PartnerSettingsPicturesPage {

  form: FormGroup;
  partner: any;

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

    this.partner = this.navParams.get('partner');
    this.form = this.formBuilder.group({
       picture1: [this.partner.picture1],
       picture2: [this.partner.picture2],
       picture3: [this.partner.picture3],
       picture4: [this.partner.picture4]
    });

    this.form.valueChanges.subscribe( e => {
      this.isReadyToUpdate = this.form.valid;
    });
  }

  openSourceTypeSheet(pictureNumber) {
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
            this.getPicture(options, pictureNumber);
          }
        },{
          text: 'From PhotoLibrary',
          handler: () => {
            options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY; 
            this.getPicture(options, pictureNumber);
          }
        },{
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).present();
  }

  getPicture(options, pictureNumber) {
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;

      switch (pictureNumber) {
        case 1:
          this.form.patchValue({ 'picture1': base64Image });
          break;
        case 2:
          this.form.patchValue({ 'picture2': base64Image });
          break;
        case 3:
          this.form.patchValue({ 'picture3': base64Image });
          break;
        case 4:
          this.form.patchValue({ 'picture4': base64Image });
          break;

        default:
          break;
      }

      
    }, (err) => {
      this.alertCtrl.create({
        message: 'Unable to take a photo',
        buttons: ['Okay']
      }).present();
    });
  }

  changePicture() {
    let auth = this.authentication.getAuthorization();
    let loading = this.loadingCtrl.create({
      spinner: 'ios'
    });
    let partnerPicture = {};

    loading.present();

    for (const key in this.form.value) {
      const value = this.form.value[key];

      if(value !== null && (value.search('http://') == -1)) {
        partnerPicture[key] = value;
      }
    }

    let seq = this.api.put('api/business/' + this.partner.id, partnerPicture, this.authentication.getRequestOptions());

    seq
    .map(res => res.json())
    .subscribe(res => {
      loading.dismiss();

      for (const key in auth['partners']) {
        if (auth['partners'][key]['id'] == res.id) {
          auth['partners'][key] = res;
          break;
        }
      }

      this.authentication.saveAuthorization(auth);
      this.authentication.saveProfile({
        type: 'partner',
        object: res
      });

      this.alertCtrl.create({
        message: 'Successfully updated partner images',
        buttons: ['Okay']
      }).present();
    }, err => {
      loading.dismiss();
      this.alertCtrl.create({
        title: 'Sorry!',
        subTitle: err._body,
        buttons: ['Okay']
      }).present();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartnerSettingsPicturePage');
  }

}
