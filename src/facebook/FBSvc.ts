import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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

export class FBServiceObservable {
  userData$: BehaviorSubject<IUserData> = new BehaviorSubject<IUserData>({
    status: false,
    msg: '',
    data: null
  });

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

    /* init fb sdk  */
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
    FB.getLoginStatus((response: any) => {
      this.statusChangeCallback(response);
    });
  }

  public fbLogout() {
    FB.logout();
  }

  public statusChangeCallback(resp: any) {
    if (resp.status === 'connected') {
      this.getUserData();
    } else if (resp.status === 'not_authorized') {
      this.userData$.next({
        status: false,
        msg: 'not_authorized',
        data: null
      });
    } else {
      FB.login();
    }
  }

  public getUserData() {
    FB.api('/me', (response: any) => {
      this.userData$.next({
        status: true,
        msg: '',
        data: {
          name: response.name,
          email: response.email
        }
      });
    });
  }
}
