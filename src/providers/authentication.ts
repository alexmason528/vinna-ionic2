import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Headers, Http, RequestOptions } from '@angular/http';

import { Api } from './api';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Observable';

/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {

  public auth:any;
  public profile:any;

  public authorized: any;
  public authorizedObserver: any;

  public isVerifyingToken: any;
  
  constructor(public http: Http, public storage: Storage, public api: Api) {
    this.isVerifyingToken = false;

    this.auth = {};
    this.initAuthorization();

    try {
      this.authorized = Observable.create(observer => {
        this.authorizedObserver = observer;
      });
    } catch (err) {
      console.log(err);
    }

    // Every half hour.
    let intervalId = setInterval(() => {  
      this.verifyToken();
    }, 1000   // milliseconds
      * 60    // seconds
      * 60    // minutes
      * .5    // hours
    );    
  }

  updates(): Observable<any> {
    return this.authorized;
  }

  private initAuthorization():Promise<any> {
    console.log('initAuthorization');
    let t = this;

    return new Promise(function(resolve, reject) {
      t.storage.get('auth').then(data => {
        if (data) {
          t.auth = JSON.parse(data);
          t.profile = { type:'member', object:t.auth.member };
          t.saveProfile(t.profile);

          if (t.authorizedObserver) t.authorizedObserver.next(true);

          // TODO 
          t.verifyToken();
          resolve(t.auth);
        } else {
          console.log("no auth found.");

//          reject();
        }
      })
      .catch(err => {
        console.log(err);
      }); 
    });
  }

  public getAuthorizationPromise2():Promise<any> {
    let t = this;
    console.log('getAuthorizationPromise2');
    console.log(this.auth);
    return new Promise(function(resolve, reject) {
      if (t.auth) {

          resolve(t.auth);
      } else {
        return t.initAuthorization();
      }
    });
  }

  public getAuthorization() {
    return this.auth;
  }

  public getProfilePromise() {
    return this.storage.get('profile');
  }

  public getProfile() {
    return this.profile;
  }

  public saveAuthorization(data) {
    let newData = JSON.stringify(data);
    this.auth = data;
    if (this.authorizedObserver) this.authorizedObserver.next(true);
    this.storage.set('auth', newData);
  }

  public saveProfile(data) {
    let newData = JSON.stringify(data);
    this.profile = data;
    this.storage.set('profile', newData);
  }

  public removeAuthorization(){
    this.auth = '';
    if(this.authorizedObserver) this.authorizedObserver.next(true);
    this.storage.remove('auth');
  }

  public removeProfile() {
    this.profile = '';
    this.storage.remove('profile');
  }

  public verifyToken() {
    if (this.isVerifyingToken) return;

    this.isVerifyingToken = true;

    const auth = this.getAuthorization();
    let authHeaders = new Headers();
    
    if (Object.keys(auth).length !== 0) {
      authHeaders.append('Authorization', 'JWT ' + auth.token);

      let seq = this.api.post('api-token-verify', {'token': auth.token}, new RequestOptions({headers: authHeaders}));

      seq
        .map(res => res.json())
        .subscribe(res => {
          this.isVerifyingToken = false;
        }, err => {
          this.reAuthenticate(res => {
            this.isVerifyingToken = false;
          }, err => {
            this.isVerifyingToken = false;
          });
          console.log(err);
        });
    } else {
      this.isVerifyingToken = false;      
    }
  }

  public getRequestOptions() {
    const auth = this.getAuthorization();
    let authHeaders = new Headers();
    authHeaders.append('Authorization', 'JWT ' + auth.token);
    console.log('getRequestOptions');
    console.log(authHeaders);
    return new RequestOptions({headers: authHeaders});
  }

  public logIn(accountInfo: any, onSuccess: any, onError: any){
    let seq = this.api.post('api-token-auth', accountInfo);
    
    seq
      .map(res => res.json())
      .subscribe(res => {
        console.log(res);
        res.user['password'] = accountInfo.password;
        this.saveAuthorization(res);
        this.saveProfile({
          type: 'member',
          object: res.member
        });
        onSuccess(res);
      }, err => {
        console.log(err);
        onError(err);
      });
  }

  public reAuthenticate(onSuccess, onError) {
    console.log('reAuthenticating');
    this.getAuthorizationPromise2().then(auth => {
      this.logIn({
        username: auth.user.username,
        password: auth.user.password
      }, onSuccess, onError);            
    });
  }

  public logOut() {
    this.removeAuthorization();
    this.removeProfile();
  }
}
