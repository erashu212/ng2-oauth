```
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core'
import { FBService } from 'ng2-oauth/ng2-oauth';

@Component({
  selector: 'fb',
  template: `
    <button type="button" class="btn col-md-3 btn-block btn-primary" (click)="loginByPromise()">Login</button>
    <h1>{{userData}}</h1>
  `
})

export class FacebookComponent {
  private fb: FBService;
  private userData;
  private isLoggedIn: boolean;
  private subscriber: any

  @Input() appId: string;
  @Output() onLogin: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.fb = new FBService(/* Use your appId*/'848981768477076');
  }

  loginByPromise() {
    this.fb.fbLogin().then((res: any) => {
      this.userData =  res.data ? res.data.name : '';
    })
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}

```
