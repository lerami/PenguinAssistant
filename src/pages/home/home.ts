import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import firebase from 'firebase';
import { TextToSpeech } from '@ionic-native/text-to-speech';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  newEmail;

  constructor(public navCtrl: NavController, private tts: TextToSpeech) {

  }
  

  newMailNotification(emailDetail): void {
  this.tts.speak(`You have received a new mail from ${emailDetail.sender} : ${emailDetail.body}`)
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));
  }

  ionViewDidLoad() {
    let emailRef: firebase.database.Reference = firebase.database().ref(`/usr/email/`);
    emailRef.on('value', snapshot => {
      this.newEmail = snapshot.val();
      this.newMailNotification(this.newEmail);
    });
  }

}
