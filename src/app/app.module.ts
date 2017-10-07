import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {HttpClientModule} from "@angular/common/http";
import {CategoryManagerService} from "./manager-services/category-manager.service";
import {CategorySelectorComponent} from './category-selector/category-selector.component';
import {TreeNodeComponent} from './category-selector/tree-node/tree-node.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategorySelectorComponent,
    TreeNodeComponent
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
