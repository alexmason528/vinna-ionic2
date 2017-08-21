import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/providers';

/**
 * Generated class for the BusinessProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-business-profile',
  templateUrl: 'business-profile.html',
})
export class BusinessProfilePage {
  media;
  partner;
  ratings: Array<{ value: number, icon: string }> = [];
  tab;

  constructor(
    public authentication: AuthenticationProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
    this.media = "videos";    
    this.partner = this.navParams.get('partner');
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
