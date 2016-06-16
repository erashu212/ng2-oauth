/// <reference path="../../typings/es6-promise/es6-promise.d.ts"/>

import { Promise } from 'es6-promise';

declare const FB: any;
declare const window: any;

export interface IUserData {
  status: boolean;
  msg: string;
  data: IFBUser;
}

export interface IFBUser {
  name: string;
  email: string;
  dob?: string;
}

export class FBService {

  constructor(appId: string) {
    if (!window.fbAsyncInit) {
      window.fbAsyncInit = () => {
        FB.init({
          appId: appId,
          xfbml: true,
          version: 'v2.5'
        });
      };
    }
    /* init fb sdk */
    let js: any,
      id: string = 'facebook-jssdk',
      ref: any = document.getElementsByTagName('script')[0];

    if (document.getElementById(id)) {
      return;
    }

    js = document.createElement('script');
    js.id = id;
    js.async = true;
    js.src = '//connect.facebook.net/en_US/sdk.js';

    ref.parentNode.insertBefore(js, ref);
  }

  public fbLogin() {
    return new Promise((resolve: any, reject: any) => {
      FB.login((response: any) => {
        if (response.authResponse) {
          FB.api('/me', function(response: any) {
            if (!response || response.error) {
              reject({
                data: null,
                msg: 'Sorry! We could not process your request this time.',
                status: false
              });
            } else {
              resolve({
                data: {
                  email: response.email,
                  name: response.name
                },
                msg: 'User successfully validated.',
                status: 'Success'
              });
            }
          });
        } else {
          reject({
            data: null,
            msg: 'User cancelled login or did not fully authorize.',
            status: false
          });
        }
      }, { scope: 'email,user_likes' });
    });
  }

  public fbLogout() {
    FB.logout();
  }
}
