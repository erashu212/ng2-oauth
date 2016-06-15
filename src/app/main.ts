/* Avoid: 'error TS2304: Cannot find name <type>' during compilation */
///<reference path="../../typings/browser/ambient/es6-shim/index.d.ts"/>

import { bootstrap } from "@angular/platform-browser-dynamic";
import { ROUTER_PROVIDERS, ROUTER_BINDINGS } from '@angular/router-deprecated';
import { HTTP_PROVIDERS } from '@angular/http'
import { RootComponent } from "./root";

bootstrap(RootComponent, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  ROUTER_BINDINGS
]);
