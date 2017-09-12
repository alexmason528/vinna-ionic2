import { Component, ViewChild } from '@angular/core';
import { AlertController, NavController, NavParams, Slides } from 'ionic-angular';

import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

import { LoginPage } from '../login/login';
import { HomePartnerMorePage } from './home-partner-more';

import { VersionInfoProvider } from '../../providers/providers';

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
  public currentVersion: 0.9;
  public showSlide: any;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private nativePageTransitions: NativePageTransitions,
    public versionInfoProvider: VersionInfoProvider) {
    this.showSlide = 0;
    this.versionInfoProvider.refreshVersionInfo();
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

  ionViewWillEnter() {

  }

  ionViewDidEnter() {
    this.setSwipeRules();
  }

  ionViewDidLoad() {
    this.versionInfoProvider.updates().subscribe(data => {
      this.alertCtrl.create({
        message: data,
        buttons: ['Okay']
      }).present();
    });

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
