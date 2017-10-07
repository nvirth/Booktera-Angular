import {Injectable} from "@angular/core";
import {ManagerServiceConstants} from "./manager-service-constants";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
import * as _ from "lodash";
import {List} from "linq-collections";
import {Utils} from "../shared/utils/utils";

@Injectable()
export class CategoryManagerService {
  private static readonly _baseUrl: string = ManagerServiceConstants.baseUrl + "EntityManagers/CategoryManagerService.svc/";
  private static readonly _urls = {
    getAllSortedJsonUrl: CategoryManagerService._baseUrl + "GetAllSortedJson"
  };

  constructor(private _httpClient: HttpClient) {
  }

  public getAllSorted(): Observable<ITreeNode<ICategory>> {
    return this._httpClient.get<ICategoryData[]>(CategoryManagerService._urls.getAllSortedJsonUrl)
      .do(x => console.log("Before:\n" + JSON.stringify(x)))
      .map(this._mapCategoryList)
      .do(x => console.log("After:\n" + Utils.local.jsonStringifySafe(x)))
      .catch(this.handleHttpError);
  }

  private _mapCategoryList = (rawCategories: ICategoryData[]): ITreeNode<ICategory> => {
    let categories = rawCategories
      .filter(c => c.Value)
      .map(CategoryManagerService._convertToCategory);

    let categoryList = new List<ICategory>(categories);
    for (let c of categories) {
      c.parent = this._getParent(c, categoryList);
    }

    let categoryTree = CategoryManagerService._constructCategoryTree(categoryList);
    return categoryTree;
  };

  private static _convertToCategory(categoryData: ICategoryData) {
    let id = parseInt(categoryData.Value) || -1;
    let split = categoryData.Text.split(" - ").map(str => str.trim());
    let level = split.length;
    let categoryName = _.last(split);
    let parentFullName = level <= 1 ? null : _.take(split, split.length - 1).join(" - ");

    let category = <ICategory>{
      fullName: categoryData.Text,
      id: id,
      level: level,
      name: categoryName,
      parent: undefined,
      parentFullName: parentFullName,
    };
    return category;
  }

  private _getParent = (category: ICategory, allCategories: List<ICategory>): ICategory => {
    let parentFullName = (<any>category).parentFullName;
    if (!parentFullName)
      return null;

    try {
      return allCategories.first(c => c.fullName === parentFullName);
    } catch (e) {
      throw e;
    }
  };

  //#region _constructCategoryTree
  private static _constructCategoryTree(categories: List<ICategory>): ITreeNode<ICategory> {
    let root: ITreeNode<ICategory> = {
      node: null,
      parent: null,
      children: null,
    };

    CategoryManagerService._constructCategoryTreeImpl(root, categories);
    return root;
  }

  private static _constructCategoryTreeImpl(parentNode: ITreeNode<ICategory>, categories: List<ICategory>): void {
    parentNode.children = parentNode.children || new List<ITreeNode<ICategory>>();

    let childCategories = categories.where(c => c.parent === parentNode.node);
    childCategories.forEach(category => {
      let node: ITreeNode<ICategory> = {
        node: category,
        parent: parentNode,
        children: null,
      };
      parentNode.children.add(node);

      CategoryManagerService._constructCategoryTreeImpl(node, categories);
    })
  }

  //#endregion

  protected handleHttpError(error: HttpErrorResponse): any {
    console.log(error);
    return Observable.throw(error);
  }
}

interface ICategoryData {
  Class: string;
  Selected: boolean;
  Text: string;
  Value: string;
}

export interface ICategory {
  name: string;
  fullName: string;
  id: number;
  parent: ICategory;
  level: number;
}

export interface ITreeNode<T> {
  node: T,
  parent: ITreeNode<T>,
  children: List<ITreeNode<T>>,
}
