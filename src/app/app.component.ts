import { Component, ViewChild } from '@angular/core';
import { Nav, Config, Platform } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsAccountPage } from '../pages/tabs/tabs-account';


import { AuthenticationProvider, DirectoryProvider, NotificationProvider, TransactionProvider } from '../providers/providers';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  @ViewChild(Nav) nav: Nav;

  constructor(
    private authentication: AuthenticationProvider,
    private config: Config, 
    private directory: DirectoryProvider,
    private notification: NotificationProvider,
    private platform: Platform, 
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen,
    private storage: Storage,
    private transaction: TransactionProvider) {

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (window.indexedDB) {
         console.log("I'm in WKWebView!");
      } else {
         console.log("I'm in UIWebView");
      }

      this.statusBar.overlaysWebView(false);
      this.statusBar.show();
      this.statusBar.backgroundColorByHexString('#960200');
      this.statusBar.styleLightContent();

      this.storage.get('auth')
      .then(val => {
        if (val)
          this.rootPage = TabsAccountPage;
        else
          this.rootPage = HomePage;

        this.splashScreen.hide();
      })
      .catch(err => {
        this.rootPage = HomePage;

        this.splashScreen.hide();
      });
    });
  }
}
