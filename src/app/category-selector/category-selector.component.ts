import {Component, OnInit} from '@angular/core';
import {ICategory, CategoryManagerService} from "../manager-services/category-manager.service";

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements OnInit {
  categories: ICategory[] = [];

  constructor(private _categoryManagerService: CategoryManagerService) {
  }

  ngOnInit(): void {
    this._categoryManagerService.getAllSorted()
      .subscribe(categories => this.categories = categories, error => console.log(error));
  }

}
