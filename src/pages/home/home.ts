import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import firebase from 'firebase';
import { TextToSpeech } from '@ionic-native/text-to-speech';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userDelivery;

  constructor(public navCtrl: NavController, private tts: TextToSpeech) {

  }
  

  deliverMsgToUser(userDelivery): void {
  this.tts.speak(`${userDelivery.msg} ${userDelivery.cmd}`)
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));
  }

  ionViewDidLoad() {
    let usr: firebase.database.Reference = firebase.database().ref(`/usr/`);
    usr.on('value', snapshot => {
      this.userDelivery = snapshot.val();
      this.deliverMsgToUser(this.userDelivery);
    });
  }

}
