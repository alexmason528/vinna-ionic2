import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertController, NavController, NavParams } from 'ionic-angular';

import { CreatePartnerAccount2Page } from './create-partner-account-2';
import { Api, AuthenticationProvider, FormHelperProvider } from '../../providers/providers';

/**
 * Generated class for the CreatePartnerAccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-partner-account',
  templateUrl: 'create-partner-account.html',
})
export class CreatePartnerAccountPage {
  form: FormGroup;

  countries = [];
  states = [];
  categories = [];
  sub_categories = [];

  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
    public alertCtrl: AlertController,
    public api: Api, 
    public authentication: AuthenticationProvider,
    public formBuilder: FormBuilder,
    public formHelper: FormHelperProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {

    this.form = this.formHelper.getForm('CreatePartnerAccount');
    if (!this.form) {
      this.form = formBuilder.group({
        category_id: ['', Validators.required],
        sub_category_id: [{value:'', disabled:true}],
        text: ['', Validators.required],
        taxid: ['', Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(15)])],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        phone: ['', Validators.required],
        country_id: ['', Validators.required],
        state_id: [{value:'', disabled:true}, Validators.required],
        city: ['', Validators.required],
        zip: ['', Validators.required],
        address1: ['', Validators.required],
        address2: [''],
      });
     } else {
       this.getStates(this.form.value.country_id);
     }

    const auth = this.authentication.getAuthorization();

    this.countries = auth.countries;
    this.categories = auth.categories;
  }

  navNextPage() {
    this.form.patchValue({'phone': this.form.value['phone'].replace(/\D+/g, '')});

    if(this.form.invalid) {
      let error_message;

      if (this.form.get('category_id').hasError('required')) {
        error_message = 'Please select category';
      } else if(this.form.get('text').hasError('required')) {
        error_message = 'Please input business or place name'; 
      } else if(this.form.get('taxid').hasError('required')) {
        error_message = 'Please input taxid'; 
      } else if(this.form.get('taxid').hasError('minlength')) {
        error_message = 'TaxID should be greater than 9 digits'; 
      } else if(this.form.get('taxid').hasError('maxlength')) {
        error_message = 'TaxID should be less than 15 digits'; 
      } else if(this.form.get('email').hasError('required')) {
        error_message = 'Please input email'; 
      } else if(this.form.get('email').hasError('email')) {
        error_message = 'Please input valid email'; 
      } else if(this.form.get('phone').hasError('required')) {
        error_message = 'Please input phone number'; 
      } else if(this.form.get('country_id').hasError('required')) {
        error_message = 'Please select country'; 
      } else if(this.form.get('state_id').hasError('required')) {
        error_message = 'Please select state'; 
      } else if(this.form.get('city').hasError('required')) {
        error_message = 'Please input city'; 
      } else if(this.form.get('zip').hasError('required')) {
        error_message = 'Please input zipcode'; 
      } else if(this.form.get('address1').hasError('required')) {
        error_message = 'Please input mailing address'; 
      }

      this.alertCtrl.create({
        message: error_message,
        buttons: ['Okay']
      }).present();

      return;
    }

    let businessInfo = this.form.value;
    if (businessInfo.sub_category_id == '') delete businessInfo.sub_category_id;

    this.navCtrl.push(CreatePartnerAccount2Page, { businessInfo: businessInfo });
  }

  getStates(id) {
    this.form.controls['state_id'].disable();
    for(let country of this.countries) {
      if (country.id == id) {
        this.states = country.states;
        if (country.states.length > 0) {
          this.form.controls['state_id'].enable();
        }
        break;
      }
    }
  }

  getSubCategories(id) {
    this.form.controls['sub_category_id'].disable();
    for(let category of this.categories) {
      if (category.id == id) {
        this.sub_categories = category.sub_categories;
        if(category.sub_categories.length > 0) {
          this.form.controls['sub_category_id'].enable();
        }
        this.form.patchValue({ sub_category_id: ''});        
        break;
      }
    }
  }

  ionViewWillUnload() {
    this.formHelper.setForm('CreatePartnerAccount', this.form); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePartnerAccountPage');
  }

}
