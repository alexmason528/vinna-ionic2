import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the FormHelperProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

@Injectable()
export class FormHelperProvider {
  public forms: any = {};
  public payInfo: any;
  public payType: any;
  public token: string;
  public hours: string;
  
  constructor(public http: Http) {

  }

  setForm(name, form) {
    this.forms[name] = form;
  }

  getForm(name) {
    return this.forms[name];
  }

  flushForm(name) {
    this.forms[name] = null;
  }

  setPaymentInfo(payInfo) {
    this.payInfo = payInfo;
  }

  getPaymentInfo() {
    return this.payInfo;
  }

  flushPaymentInfo() {
    this.payInfo = null;
  }

  setToken(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  flushToken() {
    this.token = null;
  }

  setPayType(payType) {
    this.payType = payType;
  }

  getPayType() {
    return this.payType;
  }

  flushPayType() {
    this.payType = null;
  }

  setHours(hours) {
    this.hours = hours;
  }

  getHours() {
    return this.hours;
  }

  flushHours() {
    this.hours = null;
  }
}

