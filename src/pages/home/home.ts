import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import firebase from 'firebase';
import { TextToSpeech } from '@ionic-native/text-to-speech';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private usr: firebase.database.Reference = firebase.database().ref(`/usr/`);

  constructor(public navCtrl: NavController, private tts: TextToSpeech) {

  }

  newMailNotification(): void {
  this.tts.speak('You have received a new email!')
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));
  }

}
