import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
    private platform: Platform, 
    private config: Config, 
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen,
    private storage: Storage,
    private directory: DirectoryProvider,
    private notification: NotificationProvider,
    private transaction: TransactionProvider,
    private authentication: AuthenticationProvider) {

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.overlaysWebView(false);
      this.statusBar.show();
      this.statusBar.backgroundColorByHexString('#960200');
      this.statusBar.styleLightContent();

      this.storage.get('auth')
      .then(val => {
        this.splashScreen.hide();

        if (val)
          this.rootPage = TabsAccountPage;
        else
          this.rootPage = HomePage;
        })
      .catch(err => {
        this.splashScreen.hide();

        this.rootPage = HomePage;        
      });
    });
  }
}
