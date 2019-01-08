import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { AuthPage } from '../pages/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = AuthPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp({
      apiKey: "AIzaSyD6_ZIzpIqEl29f7k0imsuFTa29o3hwVxM",
      authDomain: "penguinassistant-90944.firebaseapp.com",
      databaseURL: "https://penguinassistant-90944.firebaseio.com",
      projectId: "penguinassistant-90944",
      storageBucket: "penguinassistant-90944.appspot.com",
      messagingSenderId: "1072275262211"
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

