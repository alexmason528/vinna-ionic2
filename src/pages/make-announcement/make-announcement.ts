import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { Api, AuthenticationProvider } from '../../providers/providers';

/**
 * Generated class for the MakeAnnouncementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-make-announcement',
  templateUrl: 'make-announcement.html',
})
export class MakeAnnouncementPage {

  notificationForm: FormGroup;
  partner: any;

  minDate;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public api: Api,
    public authService: AuthenticationProvider,
    public camera: Camera,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams) {

    let today = new Date();
    let tomorrow = new Date();
    tomorrow.setUTCDate(today.getUTCDate() + 1);

    this.notificationForm = this.formBuilder.group({
        category: ['', Validators.required],
        title: ['', Validators.required],
        description: ['', Validators.compose([Validators.required, Validators.maxLength(140)])],
        link: [''],
        start:[today.toISOString()],
        end:[tomorrow.toISOString()],
        picture:['', Validators.required]
    });

    const month = today.getMonth()+1;
    const day = today.getDate();

    let monthString = '';
    if (month < 10) monthString = '0' + month;
    else monthString = month.toString();

    let dayString = '';
    if (day < 10) dayString = '0' + day;
    else dayString = day.toString();

    this.minDate = (today.getFullYear()) + '-' + monthString + '-' + dayString;
    this.partner = this.navParams.get('partner');
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
      cameraDirection:this.camera.Direction.BACK,
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
      }]
    }).present();
  }

  getPicture(options) {
    this.camera.getPicture(options).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.notificationForm.patchValue({ 'picture': base64Image });
    }, (err) => {
      this.alertCtrl.create({
        message: 'Unable to take a photo',
        buttons: ['Okay']
      }).present();
    });
  }

  makeAnnounce() {
    let error_message = '';
    
    if (this.notificationForm.get('category').hasError('required')) {
      error_message = 'Please select category';
    } else if(this.notificationForm.get('title').hasError('required')) {
      error_message = 'Please input title'; 
    } else if(this.notificationForm.get('description').hasError('required')) {
      error_message = 'Please input description'; 
    } else if(this.notificationForm.get('description').hasError('maxlength')) {
      error_message = 'Description can not exceed 140 characters'; 
    } else if(this.notificationForm.get('picture').hasError('required')) {
      error_message = 'Please add picture'; 
    } else if(this.notificationForm.value.start >= this.notificationForm.value.end) {
      error_message = 'Start date should be earlier than end date';
    }

    if (error_message != '') {
      this.alertCtrl.create({
        message: error_message,
        buttons: ['Okay']
      }).present();

      return;
    }


    let loading = this.loadingCtrl.create({
        spinner: 'ios'
    });

    loading.present();

    let notificationInfo = this.notificationForm.value;
    notificationInfo['business_id'] = this.partner.id;

    let seq = this.api.post('api/notification', notificationInfo, this.authService.getRequestOptions());

    seq
    .map(res => res.json())
    .subscribe(res => {
      loading.dismiss();
      this.alertCtrl.create({
        message: 'Successfully added the notification.', 
        buttons: [{
         text: 'OK',
         handler: data => {
           this.navCtrl.pop();
         }
       }]
      }).present();
    }, err => {
      console.log(err);
      loading.dismiss();
      this.alertCtrl.create({
          message: 'There was a problem to add the notification.' + err,
          buttons: ['Okay']
      });
    });
  }
}
