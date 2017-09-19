import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Api } from './api';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Observable';

/*
  Generated class for the DirectoryProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DirectoryProvider {
  public partners: any = [];

  public directory: any;
  public directoryObserver: any;

  public isGetting:any = false;
  
  constructor(
    public http: Http,
    public api: Api) {

    this.partners = [];

    this.directory = Observable.create(observer => {
      this.directoryObserver = observer;
    });    

    this.refreshPartners(null);
  }

  updates(): Observable<any> { return this.directory; }

  refreshPartners(options) {
    if (this.isGetting) return;

    this.api.get('api/business/')
      .map(res => res.json())
      .subscribe(res => {
        this.isGetting = false;
        this.partners = res;
        if (this.directoryObserver) this.directoryObserver.next(this.partners);
      }, err => {
        this.isGetting = false;
        console.log(err);
      });
  }

  getPartners() {
    return this.partners;
  }

}
