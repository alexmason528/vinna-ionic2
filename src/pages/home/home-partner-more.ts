import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

import { LoginPage } from '../login/login';

/**
 * Generated class for the HomePartnerMorePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-partner-more',
  templateUrl: 'home-partner-more.html',
})
export class HomePartnerMorePage {

  @ViewChild('homeSlider') slider: Slides;
  public showSlide: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
    this.showSlide = 0;
  } 

  ngAfterViewInit() {
    
  }

  goToSlide(index) {
    this.showSlide = index;
    if (index > 0)
      this.slider.slideTo(1, 500);
    else 
      this.slider.slideTo(0, 500);
  }

  navToLogin() {
    this.navCtrl.push(LoginPage);
  }

  goBack() {
    this.navCtrl.pop();
  }

  ionViewDidEnter() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePartnerMorePage');
  }

}
