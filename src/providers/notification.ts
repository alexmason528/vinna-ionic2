import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { Api } from './api';
import { AuthenticationProvider } from './authentication';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Observable';

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class NotificationProvider {
  public notifications: any = [];

  public notification: any;
  public notificationObserver: any;

  public isGetting: any;
  
  constructor(
    public http: Http,
    public authentication: AuthenticationProvider,
    public api: Api) {

    this.isGetting = false;

    this.notifications = [];

    this.authentication.updates().subscribe(authorized => {
      console.log('refreshing');
      this.notifications = this.refreshNotifications();    
    });

    this.notification = Observable.create(observer => {
      this.notificationObserver = observer;
    });    

    this.refreshNotifications();
  }

  updates(): Observable<any> { return this.notification; }

  refreshNotifications() {
    if (this.isGetting) return;
    this.isGetting = true;

    this.authentication.getAuthorizationPromise2().then(auth => {
      if(auth.token) {
        let seq = this.api.get('api/notification', {}, this.authentication.getRequestOptions());

        seq
        .map(res => res.json())
        .subscribe(res => {
          this.isGetting = false;
          this.notifications = res;
          if (this.notificationObserver) this.notificationObserver.next(this.notifications);        
        }, err => {
          this.isGetting = false;
          console.log(err);
        });
      } else {
        this.isGetting = false;          
      }
    });
  }

  getNotifications() {
    return this.notifications;
  }

}
