import { Injectable } from '@angular/core';

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
  private transactions: any = [];
  private summary: any = [];

  private isGettingTransactions:any = false;
  private isGettingSummary:any = false;

  // Observer variables
  public transactionObservable: any;
  public transactionObserver: any;
  public summaryObservable: any;
  public summaryObserver: any;
  
  constructor(
    public authentication: AuthenticationProvider,
    public api: Api) {

    this.isGettingTransactions = false;
    this.isGettingSummary = false;

    this.transactions = [];

    this.authentication.updates().subscribe(authorized => {
      console.log('refreshing after auth update');

      this.refreshTransactions();
      this.refreshSummary();
    });

    this.transactionObservable = Observable.create(observer => {
      this.transactionObserver = observer;
    });    

    this.summaryObservable = Observable.create(observer => {
      this.summaryObserver = observer;
    });    

    this.refreshTransactions();
    this.refreshSummary();
  }

  transactionUpdates(): Observable<any> { return this.transactionObservable; }
  summaryUpdates(): Observable<any> { return this.summaryObservable; }

  private refreshTransactions() {    
    console.log('try getting ');
    console.log(this.isGettingTransactions);

    if (this.isGettingTransactions) return;
    this.isGettingTransactions = true;

    let profile = this.authentication.getProfile();
      
    let t = this;
    this.authentication.getAuthorizationPromise2().then(auth => {
      
      if(auth.token) {
        console.log('getting');
        let seq:any; // = t.api.get(`api/account/${auth.account.id}/purchase`, {}, this.authentication.getRequestOptions());

        if (profile.type == 'member') {
          console.log('getting member statement')
          seq = t.api.get(`api/account/${auth.account.id}/purchase`, {}, this.authentication.getRequestOptions());
        } else if (profile.type == 'partner') {
          console.log('getting partner statement')
          seq = t.api.get(`api/business/${profile.object.id}/purchase`, {}, this.authentication.getRequestOptions());
        } else if (profile.type == 'cashier') {
          console.log('getting cashier statement')
          seq = t.api.get(`api/business/${profile.object.id}/purchase`, {}, this.authentication.getRequestOptions());
        }

        seq
        .map(res => res.json())
        .subscribe(res => {
          t.isGettingTransactions = false;
          t.transactions = res;
          if (t.transactionObserver) t.transactionObserver.next(t.transactions);
        }, err => {
          t.isGettingTransactions = false;
          console.log(err);
        });

      } else {
        console.log('noooo')
        t.isGettingTransactions = false;
      }

    });
  
  }

  private refreshSummary() {    
    console.log('try getting summary ');
    console.log(this.isGettingSummary);

    if (this.isGettingSummary) return;
    this.isGettingSummary = true;

    let profile = this.authentication.getProfile();
      
    let t = this;
    this.authentication.getAuthorizationPromise2().then(auth => {
      
      if(auth.token) {
        let seq:any;

        if (profile.type == 'member') {
          seq = this.api.get(`api/account/${auth.account.id}/purchase_summary`, {}, this.authentication.getRequestOptions());
        } else if (profile.type == 'partner') {
          seq = this.api.get(`api/business/${profile.object.id}/purchase_summary`, {}, this.authentication.getRequestOptions());
        } else if (profile.type == 'cashier') {
          seq = this.api.get(`api/business/${profile.object.id}/purchase_summary`, {}, this.authentication.getRequestOptions());
        }

        seq
        .map(res => res.json())
        .subscribe(res => {
          t.isGettingSummary = false;
          t.summary = res;
          if (t.summaryObserver) t.summaryObserver.next(t.summary);
        }, err => {
          t.isGettingSummary = false;
          console.log(err);
        });
      } else {
        console.log('noooo')
        t.isGettingSummary = false;
      }

    });
  
  }  

  public getTransactions() {
    /*
    // TODO Add hash checking logic.
    // For now, refresh every time.
    */
    this.refreshTransactions();

    if (this.transactions && this.transactions.length > 0) 
      return this.transactions;
  }

  public getSummary() {
    /*
    // TODO Add hash checking logic.
    // For now, refresh every time.
    */
    this.refreshSummary();

    if (this.summary) {
      return this.summary;
    }
  }
}
