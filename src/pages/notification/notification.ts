import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';

import { NotificationProvider } from '../../providers/notification';

/**
 * Generated class for the NotificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  notifications = [];
  filteredNotifications = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public notificationProvider: NotificationProvider) {

    this.notificationProvider.updates().subscribe(data => {
      this.notifications = data;
      this.filter();
    });

    this.notifications = this.notificationProvider.getNotifications();
    this.filter();
  }

  ionViewWillEnter() {
    this.notificationProvider.refreshNotifications();
  }

  filter(search='') {    
    search = search.toLowerCase();

    if (search && search.trim() != '') {
      this.filteredNotifications = this.notifications.filter((notification) => {
        return ((notification.category.toLowerCase().indexOf(search) != -1 ) || (notification.title.toLowerCase().indexOf(search) != -1) || (notification.description.toLowerCase().indexOf(search) != -1));
      });
    } else {
      this.filteredNotifications = this.notifications;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

}
