import {Component, OnInit} from '@angular/core';
import {CategoryManagerService, ICategory} from "./manager-services/category-manager.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  categories: ICategory[] = [];

  constructor(private _categoryManagerService: CategoryManagerService) {
  }

  ngOnInit(): void {
    this._categoryManagerService.getAllSorted()
      .subscribe(categories => this.categories = categories, error => console.log(error));
  }
}
