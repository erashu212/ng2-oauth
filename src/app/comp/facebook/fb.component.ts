import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core'
import { FBService } from './FBConnector';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Component({
  selector: 'fb',
  template: `
    <button type="button" class="btn col-md-3 btn-block btn-primary" (click)="fb.fbLogin()">Login</button>
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

  ngOnInit() {
    this.subscriber = this.fb.userData$.subscribe((data) => {
      this.isLoggedIn = data.status;
      this.userData =  data.data ? data.data.name : '';
    })
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
