import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {HttpClientModule} from "@angular/common/http";
import {CategoryManagerService} from "./manager-services/category-manager.service";
import {CategorySelectorComponent} from './category-selector/category-selector.component';
import {TreeNodeComponent} from './category-selector/tree-node/tree-node.component';
import {RouterModule, PreloadAllModules} from "@angular/router";
import {Routes} from './app.routes';
import {NoContentComponent} from './no-content/no-content.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategorySelectorComponent,
    TreeNodeComponent,
    NoContentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(Routes, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
  ],
  providers: [CategoryManagerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
