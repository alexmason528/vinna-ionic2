import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';

import { CreateMemberAccount2Page } from './create-member-account-2';
import { FormHelperProvider } from '../../providers/providers';


/**
 * Generated class for the CreateMemberAccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-member-account',
  templateUrl: 'create-member-account.html',
})
export class CreateMemberAccountPage {
  form: FormGroup;
  maxDate: string;
  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public formHelper: FormHelperProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {

    let today = new Date();

    const month = today.getMonth()+1;
    const day = today.getDate();

    let monthString = '';
    if (month < 10) monthString = '0' + month;
    else monthString = month.toString();

    let dayString = '';
    if (day < 10) dayString = '0' + day;
    else dayString = dayString.toString();

    this.maxDate = (today.getFullYear()-16) + '-' + monthString + '-' + dayString;

    if(!this.form) {
      this.form = this.formBuilder.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        phone: ['', Validators.required],
        password: ['', Validators.required],
        dob: ['', Validators.required],
        gender: ['', Validators.required]
      });
    }
  }

  navNextPage() {
    this.form.patchValue({'phone': this.form.value['phone'].replace(/\D+/g, '')});

    if(this.form.invalid) {
      let error_message;

      if (this.form.get('first_name').hasError('required')) {
        error_message = 'Please input your first name';
      } else if(this.form.get('last_name').hasError('required')) {
        error_message = 'Please input your last name'; 
      } else if(this.form.get('email').hasError('required')) {
        error_message = 'Please input your email address'; 
      } else if(this.form.get('email').hasError('email')) {
        error_message = 'Please input valid email address'; 
      } else if(this.form.get('phone').hasError('required')) {
        error_message = 'Please input your phone number'; 
      } else if(this.form.get('password').hasError('required')) {
        error_message = 'Please input your password'; 
      } else if(this.form.get('dob').hasError('required')) {
        error_message = 'Please select your date of birth'; 
      } else if(this.form.get('gender').hasError('required')) {
        error_message = 'Please select your gender'; 
      }

      this.alertCtrl.create({
        message: error_message,
        buttons: ['Okay']
      }).present();

      return;
    }
    this.navCtrl.push(CreateMemberAccount2Page, { accountInfo: this.form.value});
  }

  ionViewWillUnload() {
    this.formHelper.setForm('CreateMemberAccount', this.form);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateMemberAccountPage');
  }

}
