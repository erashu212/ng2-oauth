import { provide, ComponentRef, Component } from '@angular/core'
import { bootstrap } from "@angular/platform-browser-dynamic";
import { FacebookComponent } from './comp/facebook/fb.component'

@Component({
  selector: 'ngApp',
  template: '<fb></fb>',
  directives : [ FacebookComponent]
})

export class RootComponent {

}
