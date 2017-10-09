import {Routes as NgRoutes} from '@angular/router';
import {NoContentComponent} from "./no-content/no-content.component";

export const Routes: NgRoutes = [
  {path: '', component: NoContentComponent},
  {path: '**', component: NoContentComponent},
];
