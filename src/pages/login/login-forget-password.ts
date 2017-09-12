import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { App, AlertController, LoadingController, NavController, NavParams, ModalController, Slides  } from 'ionic-angular';

import { LoginPasswordChangeSuccessPage } from './login-password-change-success';

import { Api } from '../../providers/providers';


/**
 * Generated class for the LoginForgetPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login-forget-password',
  templateUrl: 'login-forget-password.html',
})
export class LoginForgetPasswordPage {

  @ViewChild('forgetSlider') slider: Slides;

  firstname: any;
  phone: any;
  resetcode: any;

  resetCodeForm: FormGroup;
  passwordForm: FormGroup;
  forms = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public api: Api,
    public modalCtrl: ModalController) {

    this.resetCodeForm = this.formBuilder.group({
      reset_code : ['', Validators.required],
    });

    this.passwordForm = this.formBuilder.group({
      password : ['', Validators.required],
      password_confirm: ['', Validators.required]
    });

    this.forms = [this.resetCodeForm, this.passwordForm];

    this.firstname = this.navParams.get('firstname');
    this.phone = this.navParams.get('phone');
    
    let seq = this.api.post('api/core/forget_password', {phone: this.phone});

    seq
    .map(res => res.json())
    .subscribe(res => {
      this.resetcode = res;
    }, err => {
      this.alertCtrl.create({
        message: 'Failed to send reset code to your phone',
        buttons: ['Okay']
      }).present();
    });
  }

  ngAfterViewInit() {
    this.slider.enableKeyboardControl(false);
    this.slider.lockSwipes(true);
  }

  resendCode() {
    let seq = this.api.post('api/core/forget_password', {phone: this.phone});

    seq
    .map(res => res.json())
    .subscribe(res => {
      this.resetcode = res;
      this.alertCtrl.create({
        message: 'Successfully sent reset code to your phone',
        buttons: ['Okay']
      }).present();
      console.log(res);
    }, err => {
      this.alertCtrl.create({
        message: 'Failed to send reset code to your phone',
        buttons: ['Okay']
      }).present();
    })

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
        if (form.get('reset_code').hasError('required')) 
          error_message = 'Please input reset code';
        else if (form.value['reset_code'] != this.resetcode)
          error_message = 'Please input valid reset code';
        break;

      case 1:
        if (form.get('password').hasError('required'))
          error_message = 'Please input your password';
        else if (form.get('password_confirm').hasError('required'))
          error_message = 'Please input confirm password';
        else if (form.value['password'] != form.value['password_confirm'])
          error_message = 'Passwords do not match.';
        break;
    }

    if (error_message) {
      this.alertCtrl.create({
        message: error_message,
        buttons: ['Okay']
      }).present();
    } else {
      if (currentIndex == 1) {
        let seq = this.api.post('api/core/reset_password', {phone: this.phone, password: this.passwordForm.value['password']});

        seq
        .map(res => res.json())
        .subscribe(res => {
          let confirmModal = this.modalCtrl.create(LoginPasswordChangeSuccessPage, {phone: this.phone, password: this.passwordForm.value['password'], showBackdrop: true});
          confirmModal.present();
        }, err => {
          this.alertCtrl.create({
            message: 'Failed to reset your password. Please try again later',
            buttons: ['Okay']
          }).present();
        });
      } else {
        this.slider.lockSwipes(false);
        this.slider.slideNext(250);
        this.slider.lockSwipes(true);
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginForgetPasswordPage');
  }

}
