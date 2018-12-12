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
  emailStack;

  constructor(public navCtrl: NavController, private tts: TextToSpeech) { }
  
  deliverMsgToUser(userDelivery): void {
  this.tts.speak(`${userDelivery.msg}. You can read your emails by saying : ${userDelivery.cmd}`)
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));
  }

  ionViewDidLoad() {
    let email: firebase.database.Reference = firebase.database().ref(`/users/user1/usr/email/`);
    email.on('value', snapshot => {
      this.emailStack = snapshot.val();
      let length = this.emailStack.length;

      for (let i = 0; i < this.emailStack.length; i++) {
        console.log(this.emailStack[i]);
      }

      this.deliverMsgToUser(this.emailStack[length-1]);
    });
  }

}
