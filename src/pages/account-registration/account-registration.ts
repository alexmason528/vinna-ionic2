import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, AlertController, IonicPage, ModalController, NavController, NavParams, Platform, Slides } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { AccountRegistrationConfirmPage } from './account-registration-confirm';
import { LoginPage } from '../login/login';

/**
 * Generated class for the AccountRegistrationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-account-registration',
  templateUrl: 'account-registration.html',
})
export class AccountRegistrationPage {
  @ViewChild('memberRegistration') slider: Slides;

  bioForm: FormGroup;
  emailForm: FormGroup;
  nameForm: FormGroup;
  passwordForm: FormGroup;
  photoForm: FormGroup;

  forms = [];
  maxDate: string;
  recreate: boolean = false;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public camera: Camera,
    public formBuilder: FormBuilder,
    public modalCtrl: ModalController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform) {
    this.nameForm = this.formBuilder.group({
      first_name : ['', Validators.required],
      last_name: ['', Validators.required]
    });

    this.emailForm = this.formBuilder.group({
      email : ['', Validators.compose([Validators.required, Validators.email])],
    });

    this.passwordForm = this.formBuilder.group({
      password : ['', Validators.required],
      password_confirm: ['', Validators.required]
    });

    this.bioForm = this.formBuilder.group({
      dob: ['', Validators.required],
      gender: ['', Validators.required],
    });

    this.photoForm = this.formBuilder.group({
      profile_photo: ['', Validators.required]
    });

    this.forms = [this.nameForm, this.emailForm, this.passwordForm, this.bioForm, this.photoForm];

    let today = new Date();

    const month = today.getMonth()+1;
    const day = today.getDate();

    let monthString = '';
    if (month < 10) monthString = '0' + month;
    else monthString = month.toString();

    let dayString = '';
    if (day < 10) dayString = '0' + day;
    else dayString = day.toString();

    this.maxDate = (today.getFullYear()-16) + '-' + monthString + '-' + dayString;

    if (this.navParams.get('recreate'))
      this.recreate = true;
  }

  ngAfterViewInit() {
    this.slider.enableKeyboardControl(false);
    this.slider.lockSwipes(true);
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
      this.photoForm.patchValue({ 'profile_photo': base64Image });
    }, (err) => {
      if (err != "no image selected") {
        this.alertCtrl.create({
          message: 'Unable to take a photo.' + err,
          buttons: ['Okay']
        }).present();
      }
    });
  }


  prevSlide() {
    let currentIndex = this.slider.getActiveIndex();
    if (currentIndex == 0)
      this.navCtrl.pop();

    this.slider.lockSwipes(false);
    this.slider.slidePrev(250);
    this.slider.lockSwipes(true);
  }

  nextSlide() {
    let currentIndex = this.slider.getActiveIndex();
    let form = this.forms[currentIndex];
    let error_message;

    switch (currentIndex) {
      case 0:
        if (form.get('first_name').hasError('required')) 
          error_message = 'Please input your first name';
        else if (form.get('last_name').hasError('required'))
          error_message = 'Please input your last name';
        break;

      case 1:
        if (form.get('email').hasError('required'))
          error_message = 'Please input your email';
        else if (form.get('email').hasError('email'))
          error_message = 'Please input valid email';
        break;

      case 2:
        if (form.get('password').hasError('required'))
          error_message = 'Please input your password';
        else if (form.get('password_confirm').hasError('required'))
          error_message = 'Please input confirm password';
        else if (form.value['password'] != form.value['password_confirm'])
          error_message = 'Passwords do not match.';
        break;

      case 3:
        if (form.get('dob').hasError('required'))
          error_message = 'Please select your date of birth';
        else if (form.get('gender').hasError('required'))
          error_message = 'Please select gender';
        break;

      case 4:
        if (form.get('profile_photo').hasError('required'))
          error_message = 'Please add your profile photo';
        
        if (this.platform.is('core') || this.platform.is('mobileweb')) {
          this.photoForm.value['profile_photo'] = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEX/TQBcNTh/AAAAAXRSTlPM0jRW/QAAAApJREFUeJxjYgAAAAYAAzY3fKgAAAAASUVORK5CYII=";
          error_message = '';
        }
        break;
    }

    if (error_message) {
      this.alertCtrl.create({
        message: error_message,
        buttons: ['Okay']
      }).present();
    } else {
      const accountInfo = {
        first_name: this.nameForm.value['first_name'],
        last_name: this.nameForm.value['last_name'],
        email: this.emailForm.value['email'],
        password: this.passwordForm.value['password'],
        phone: this.navParams.get('phone'),
        dob: this.bioForm.value['dob'],
        gender: this.bioForm.value['gender'],
        profile_photo_url: this.photoForm.value['profile_photo'],
        recreate: this.recreate,
      };

      if(currentIndex == 4) {
        let confirmModal = this.modalCtrl.create(AccountRegistrationConfirmPage, {accountInfo: accountInfo, showBackdrop: true});
        confirmModal.present();
      } else {
        this.slider.lockSwipes(false);
        this.slider.slideNext(250);
        this.slider.lockSwipes(true);
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountRegistrationPage');
  }

}
