import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider,NotificationProvider } from '../../providers/providers';

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
  notifications = [];
  ratings: Array<{ value: number, icon: string }> = [];
  tab;

  constructor(
    public authentication: AuthenticationProvider,
    public notificationProvider: NotificationProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
    this.media = "videos";    
    this.partner = this.navParams.get('partner');

    this.notificationProvider.updates().subscribe(data => {
      this.notifications = data;
    });

    this.notifications = this.notificationProvider.getNotifications();

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

    console.log(this.partner);

    
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

  ionViewWillEnter() {
    this.notificationProvider.refreshNotifications();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessProfilePage');
  }

}
