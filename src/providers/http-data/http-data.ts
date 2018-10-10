import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { App } from 'ionic-angular';

/*
  Generated class for the HttpDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpDataProvider {

  apiBase = '';
  accessToken : string;

  constructor(public http: Http,
              private storage:Storage,
              private app: App,) {
    console.log('Hello HttpDataProvider Provider');
  }

  post(request?){

    return new Promise((resolve,reject) => {
       let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        //headers.append('Authorization', 'Bearer ' + user.token );
        let options = new RequestOptions({ headers:headers });

        this.http.post(request.url, request.body, options).subscribe(res=>{

          let data = res.json().success;
          if( res.json().success ) {
            resolve(data)
          }
        },(error) => {
          if (401 === error.status) {
            console.log('logout');
            this.app.getRootNavs()[0].setRoot('LoginPage');
          }
          reject(error);

          //http error
          throw new Error('There was an error posting to ' + request.method + error);

        }, ()=>{
          //Complete
        });
    });

  }

}
