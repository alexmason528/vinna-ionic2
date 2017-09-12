import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Platform } from 'ionic-angular';

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
export class VersionInfoProvider {
  public currentVersion = '1.0';
  public versionInfo;

  public version: any;
  public versionObserver: any;

  public isGetting: any;
  
  // constructor(
  //   public http: Http,
  //   public authentication: AuthenticationProvider,
  //   public api: Api) {

    
  // }

  // updates(): Observable<any> { return this.versionInfo; }

  // refreshNotifications() {
  //   if (this.isGetting) return;
  //   this.isGetting = true;

  //   this.authentication.getAuthorizationPromise2().then(auth => {
  //     if(auth.token) {
  //       let seq = this.api.get('api/notification', {}, this.authentication.getRequestOptions());

  //       seq
  //       .map(res => res.json())
  //       .subscribe(res => {
  //         this.isGetting = false;
  //         this.notifications = res;
  //         if (this.notificationObserver) this.notificationObserver.next(this.notifications);        
  //       }, err => {
  //         this.isGetting = false;
  //         console.log(err);
  //       });
  //     } else {
  //       this.isGetting = false;          
  //     }
  //   });
  // }
  
  constructor(
    public api: Api,
    public authentication: AuthenticationProvider,
    public http: Http,
    public platform: Platform) {

    this.isGetting = false;

    this.version = Observable.create(observer => {
      this.versionObserver = observer;
    });
  }

  updates(): Observable<any> { return this.version; }

  refreshVersionInfo() {
    if (this.isGetting) return;
    this.isGetting = true;

    let platform = 'ios';

    if (this.platform.is('ios')) {
      platform = 'ios';
    } else if (this.platform.is('android')){
      platform = 'android';
    }

    if (platform == '') {
      this.isGetting = false;
      return;
    } 

    let seq = this.api.get(`api/core/mapp/${platform}/version`);

    seq
    .map(res => res.json())
    .subscribe(res => {
      this.isGetting = false;
      
      let msg = '';

      if (res.version > this.currentVersion) {
        msg = `Version ${res.version} is avilable.`;
      }

      if (res.supported.indexOf(this.currentVersion) == -1) {
        msg += `\nCurrent version is no longer supported.`;
      }

      this.versionInfo = msg;
      
      if (this.versionObserver) this.versionObserver.next(this.versionInfo);
    }, err => {
      this.isGetting = false;
    });
  }

  getVersionInfo() {
    return this.versionInfo;
  }

}
