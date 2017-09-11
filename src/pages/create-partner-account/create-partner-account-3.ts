import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Stripe } from '@ionic-native/stripe';

import { AlertController, ActionSheetController, LoadingController, NavController, NavParams } from 'ionic-angular';

import { WelcomeToPartnerPage } from '../welcome-to-partner/welcome-to-partner';

import { Api, AuthenticationProvider, DirectoryProvider, FormHelperProvider } from '../../providers/providers';

/**
 * Generated class for the CreatePartnerAccount3Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-partner-account-3',
  templateUrl: 'create-partner-account-3.html',
})
export class CreatePartnerAccount3Page {

  businessInfo: any;
  paymentInfo: any;
  paymentType: any;

  form: FormGroup;
  loader: any;

  hours = [{
    dow: 'Mon',
    enabled: false,
    start: new Date(2017, 6, 20, 4).toISOString(),
    end: new Date(2017, 6, 20, 14).toISOString()
  },{
    dow: 'Tue',
    enabled: false,
    start: new Date(2017, 6, 20, 4).toISOString(),
    end: new Date(2017, 6, 20, 14).toISOString()
  },{
    dow: 'Wed',
    enabled: false,
    start: new Date(2017, 6, 20, 4).toISOString(),
    end: new Date(2017, 6, 20, 14).toISOString()
  },{
    dow: 'Thu',
    enabled: false,
    start: new Date(2017, 6, 20, 4).toISOString(),
    end: new Date(2017, 6, 20, 14).toISOString()
  },{
    dow: 'Fri',
    enabled: false,
    start: new Date(2017, 6, 20, 4).toISOString(),
    end: new Date(2017, 6, 20, 14).toISOString()
  },{
    dow: 'Sat',
    enabled: false,
    start: new Date(2017, 6, 20, 4).toISOString(),
    end: new Date(2017, 6, 20, 14).toISOString()
  },{
    dow: 'Sun',
    enabled: false,
    start: new Date(2017, 6, 20, 4).toISOString(),
    end: new Date(2017, 6, 20, 14).toISOString()
  }];

  constructor(
    
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public api: Api, 
    public authentication: AuthenticationProvider, 
    public camera: Camera,
    public directory: DirectoryProvider,
    public formBuilder: FormBuilder, 
    public formHelper: FormHelperProvider,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public stripe: Stripe) {

    this.businessInfo = this.navParams.get('businessInfo');
    this.paymentInfo = this.navParams.get('paymentInfo');
    this.paymentType = this.navParams.get('paymentType');

    this.form = this.formHelper.getForm('CreatePartnerAccount3');
    if (!this.form) {
      this.form = this.formBuilder.group({
        picture1: ['', Validators.required],
        picture2: [''],
        picture3: [''],
        picture4: [''],
        description: ['', Validators.required],
      });
    } else {
      this.hours = JSON.parse(this.formHelper.getHours());
    }

    const stripeKey = this.authentication.getAuthorization().stripe_key;
    this.stripe.setPublishableKey(stripeKey);
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
      cameraDirection:this.camera.Direction.BACK,
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

  createPaymentMethod() {
    if(this.form.invalid) {
      let error_message;

      if (this.form.get('picture1').hasError('required')) {
        error_message = 'Please add first picture';
      } else if(this.form.get('description').hasError('required')) {
        error_message = 'Please input description'; 
      }

      this.alertCtrl.create({
        message: error_message,
        buttons: ['Okay']
      }).present();

      return;
    }

    this.formHelper.setForm('CreatePartnerAccount3', this.form); 
    this.formHelper.setHours(JSON.stringify(this.hours));

    this.loader = this.loadingCtrl.create({
      spinner: 'ios'
    });

    this.loader.present();
    this.paymentInfo['currency'] = 'USD';
    this.paymentInfo['country'] = 'US';

    let changed = false;

    console.log('**********************');
    console.log(this.formHelper.getPaymentInfo());
    console.log(this.paymentInfo);
    if (!this.formHelper.getPaymentInfo() || (JSON.stringify(this.formHelper.getPaymentInfo()) != JSON.stringify(this.paymentInfo))) {
      this.formHelper.setPaymentInfo(this.paymentInfo);
      changed = true;
    }

    let token = this.formHelper.getToken();

    console.log(changed);
    console.log(token);
    console.log('*********************');

    if (changed || !token) {
      

      if (this.paymentType == 'bank') {
        this.stripe.createBankAccountToken(this.paymentInfo)
        .then((res) => {
          token = res['id'];
          this.formHelper.setToken(token);
          this.createPartner();
        })
        .catch((error) => {
          this.loader.dismiss();
          this.alertCtrl.create({
            title: 'Sorry!',
            subTitle: error,
            buttons: [
            {
              text: 'Okay',
              handler: () => { this.navCtrl.pop(); }
            }]
          }).present();
        });
      } else if(this.paymentType == 'card') {
        this.stripe.createCardToken(this.paymentInfo)
        .then((res) => {
          token = res['id'];
          this.formHelper.setToken(token);
          this.createPartner();
        })
        .catch((error) => {
          this.loader.dismiss();
          this.alertCtrl.create({
            title: 'Sorry!',
            subTitle: error,
            buttons: [
            {
              text: 'Okay',
              handler: () => { this.navCtrl.pop(); }
            }]
          }).present();
        });
      }
    } else {
      console.log('^^^^^^^^^^^^^^');;
      this.createPartner();
    }
    
    
  }

  createPartner() {
    const auth = this.authentication.getAuthorization();

    this.businessInfo['account_id'] = auth.account.id;
    this.businessInfo['picture1'] = this.form.value.picture1;
    this.businessInfo['picture2'] = this.form.value.picture2;
    this.businessInfo['picture3'] = this.form.value.picture3;
    this.businessInfo['picture4'] = this.form.value.picture4;
    this.businessInfo['description'] = this.form.value.description;

    let text = (this.paymentType == 'bank') ? this.paymentInfo['account_number'] : this.paymentInfo['number'];

    let businessBillingInfo = {
      active: 1,
      type: this.paymentType,
      text: text.substr(text.length - 4),
      token: this.formHelper.getToken(),
      country_id: this.businessInfo['country_id'],
      state_id: this.businessInfo['state_id'],
      zip: this.businessInfo['zip'],
      address1: this.businessInfo['address1'],
      address2: this.businessInfo['address2']
    }

    this.businessInfo['billing_info'] = businessBillingInfo;
    this.businessInfo['hours'] = JSON.stringify(this.hours);

    let seq = this.api.post('api/business', this.businessInfo, this.authentication.getRequestOptions());

    seq
      .map(res => res.json())
      .subscribe(res => {
        this.formHelper.flushForm('CreatePartnerAccount');
        this.formHelper.flushForm('CreatePartnerAccount2-Card'); 
        this.formHelper.flushForm('CreatePartnerAccount2-Bank'); 
        this.formHelper.flushForm('CreatePartnerAccount3'); 
        this.formHelper.flushHours();
        this.formHelper.flushToken();
        this.formHelper.flushPayType();
        this.formHelper.flushPaymentInfo();

        const newProfile = {
          type: 'partner',
          object: res
        };

        this.authentication.reAuthenticate(res => {
          this.loader.dismiss();
          this.authentication.saveProfile(newProfile);
          this.directory.refreshPartners(null);
          this.navCtrl.push(WelcomeToPartnerPage);
        }, err=> {
          console.log(err);
          this.loader.dismiss();
          this.alertCtrl.create({
            title: 'Sorry!',
            subTitle: err._body,
            buttons: ['Okay']
          }).present();
        });
        
      }, err => {
        console.log(err);
        this.loader.dismiss();

        this.alertCtrl.create({
          title: 'Sorry!',
          subTitle: err._body,
          buttons: ['Okay']
        }).present();
    
      });
  }

  ionViewWillUnload() {
    this.formHelper.setForm('CreatePartnerAccount3', this.form); 
    this.formHelper.setHours(JSON.stringify(this.hours));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePartnerAccount3Page');
  }

}
