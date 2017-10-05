import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {HttpClientModule} from "@angular/common/http";
import {CategoryManagerService} from "./manager-services/category-manager.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CategoryManagerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
