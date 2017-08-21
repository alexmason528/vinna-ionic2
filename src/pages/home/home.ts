import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';

import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

import { LoginPage } from '../login/login';
import { HomePartnerMorePage } from './home-partner-more';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild('homeSlider') slider: Slides;
  public showSlide: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private nativePageTransitions: NativePageTransitions) {
    this.showSlide = 0;
  }

  ngAfterViewInit() {
    this.slider.enableKeyboardControl(false);
    this.slider.lockSwipes(true);
  } 

  goToSlide(index) {    
    this.slider.lockSwipes(false);

    if (index > 0) {
      this.showSlide = index;
      this.slider.slideTo(1, 250);
    } else {
      this.slider.slideTo(0, 250);
    }
  }
  
  goSlideHome() {
    this.goToSlide(0);
  }
  
  slideChanged() {
    let currentIndex = this.slider.getActiveIndex();

    if (currentIndex == 0) this.showSlide = 0;

    this.setSwipeRules();
  }

  setSwipeRules() {
    let currentIndex = this.slider.getActiveIndex();

    if (currentIndex == 0)
      this.slider.lockSwipes(true);
    else {
      this.slider.lockSwipeToNext(true);
      this.slider.lockSwipeToPrev(false);      
    }
  }

  navToLogin() {
    let options: NativeTransitionOptions = {
        direction: 'up',
        duration: 275
       };

    this.nativePageTransitions.slide(options)
      .then(onSuccess => {})
      .catch(onError => {});

    this.navCtrl.push(LoginPage, {}, {animate:false});
  }

  goHomePartnerMore() {
    this.navCtrl.push(HomePartnerMorePage);
  }


  ionViewDidEnter() {
    this.setSwipeRules();
  }

  ionViewDidLoad() {
    /*
    this.navBar.backButtonClick = (e:UIEvent)=>{
      let currentIndex = this.slider.getActiveIndex();

      if (currentIndex != 0)
        this.goSlideHome();
      else this.navController.pop();
    }
    */
  }
}