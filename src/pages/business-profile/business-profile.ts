import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/providers';

/**
 * Generated class for the BusinessProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-business-profile',
  templateUrl: 'business-profile.html',
})
export class BusinessProfilePage {
  media;
  partner;
  partner_phone_formatted: any;
  ratings: Array<{ value: number, icon: string }> = [];
  tab;

  constructor(
    public authentication: AuthenticationProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
    this.media = "videos";    
    this.partner = this.navParams.get('partner');

    if (!this.partner) this.navCtrl.pop();

    let number = '(' + this.partner.phone.slice(0,3) + ') ' + this.partner.phone.slice(3,6) + '-' + this.partner.phone.slice(6);
    this.partner_phone_formatted = '+1 ' + number;

    this.ratings.push({
      value: 1,
      icon: 'star-outline'
    },
    {
      value: 2,
      icon: 'star-outline'
    },
    {
      value: 3,
      icon: 'star-outline'
    },
    {
      value: 4,
      icon: 'star-outline'
    },
    {
      value: 5,
      icon: 'star-outline'
    });
    this.tab = "hello";
  }

  rate(val) {
    this.ratings.forEach(star => {
      star.icon = 'star-outline';
    })
    this.ratings.forEach(star => {
      if (star.value <= val) {
        star.icon = 'star';
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessProfilePage');
  }

}
