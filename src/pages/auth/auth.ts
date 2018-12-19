
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
declare var window: any;

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform
  ) {
  }

  public login() {
    this.platform.ready()
      .then(this.googleLogin)
      .then((success) => {
        this.navCtrl.push("ContactsPage", {
          token: success
        })
      }, (error) => {
        throw new Error(error);
      })
  }

  public googleLogin(): Promise<any> {
    return new Promise(function (resolve, reject) {
      const CLIENT_ID = '242087552758-mavpac4kroqtd58arlo0jitkeorr7cud.apps.googleusercontent.com';
      const url = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}` +
        "&redirect_uri=http://localhost/callback" +
        "&scope=https://www.googleapis.com/auth/contacts.readonly" +
        "&response_type=token";
      const browserRef = window.cordova.InAppBrowser.open(
        url,
        "_blank",
        "location=no, clearsessioncache=yes, clearcache=yes"
      );
      let responseParams: string;
      let parsedResponse: Object = {};
      browserRef.addEventListener("loadstart", (evt) => {
        if ((evt.url).indexOf("http://localhost/callback") === 0) {
          browserRef.removeEventListener("exit", (evt) => { });
          browserRef.close();
          responseParams = ((evt.url).split("#")[1]).split("&");
          for (var i = 0; i < responseParams.length; i++) {
            parsedResponse[responseParams[i].split("=")[0]] = responseParams[i].split("=")[1];
          }
          if (parsedResponse["access_token"] !== undefined &&
            parsedResponse["access_token"] !== null) {
            resolve(parsedResponse);
          } else {
            reject("Problème d’authentification avec Google");
          }
        }
      });
      browserRef.addEventListener("exit", function (evt) {
        reject("Une erreur est survenue lors de la tentative de connexion à Google");
      });
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
  }

}
