import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { Api } from './api';
import { AuthenticationProvider } from './authentication';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Observable';

/*
  Generated class for the TransactionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class TransactionProvider {
  public transactions: any = [];

  public transaction: any;
  public transactionObserver: any;

  public isGetting:any;
  
  constructor(
    public http: Http,
    public authentication: AuthenticationProvider,
    public api: Api) {

    this.isGetting = false;

    this.transactions = [];

    this.authentication.updates().subscribe(authorized => {
      console.log('refreshing');
      this.transactions = this.refreshTransactions();    
    });

    this.transaction = Observable.create(observer => {
      this.transactionObserver = observer;
    });    

    this.refreshTransactions();
  }

  updates(): Observable<any> { return this.transaction; }

  refreshTransactions() {    
    if (this.isGetting) return;

    this.isGetting = true;

    let t = this;

    this.authentication.getAuthorizationPromise2().then(auth => {
      if(auth.token) {
        console.log(this.authentication.getRequestOptions());
        let seq = t.api.get(`api/account/${auth.account.id}/purchases`, {}, this.authentication.getRequestOptions());

        seq
        .map(res => res.json())
        .subscribe(res => {
          t.isGetting = false;
          t.transactions = res;
          if (t.transactionObserver) t.transactionObserver.next(t.transactions);
        }, err => {
          t.isGetting = false;
          console.log(err);
        });
      } else {
        console.log('noooo')
        t.isGetting = false;        
      }
    });
  
  }

  getTransactions() {
    if (!this.transactions) this.refreshTransactions();
    else return this.transactions;
  }

}
