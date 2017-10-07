import {Component, OnInit} from '@angular/core';
import {ICategory, CategoryManagerService} from "../manager-services/category-manager.service";
import {ITreeNode} from "../shared/utils/tree-node";

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements OnInit {
  categoryTree: ITreeNode<ICategory>;

  constructor(private _categoryManagerService: CategoryManagerService) {
  }

  ngOnInit(): void {
    this._categoryManagerService.getAllSorted()
      .subscribe(
        categoryTree => this.categoryTree = categoryTree,
        error => console.log(error)
      );
  }

}
