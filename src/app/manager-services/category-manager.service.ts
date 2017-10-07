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

@Injectable()
export class CategoryManagerService {
  private static readonly _baseUrl: string = ManagerServiceConstants.baseUrl + "EntityManagers/CategoryManagerService.svc/";
  private static readonly _urls = {
    getAllSortedJsonUrl: CategoryManagerService._baseUrl + "GetAllSortedJson"
  };

  constructor(private _httpClient: HttpClient) {
  }

  public getAllSorted(): Observable<ICategory[]> {
    return this._httpClient.get<ICategoryData[]>(CategoryManagerService._urls.getAllSortedJsonUrl)
      .do(x => console.log("Before:\n" + JSON.stringify(x)))
      .map(this._mapCategoryList)
      .do(x => console.log("After:\n" + JSON.stringify(x)))
      .catch(this.handleHttpError);
  }

  private _mapCategoryList = (rawCategories: ICategoryData[]): ICategory[] => {
    let categories = rawCategories
      .filter(c => c.Value)
      .map(c => {
        let id = parseInt(c.Value) || -1;
        let split = c.Text.split(" - ").map(str => str.trim());
        let level = split.length;
        let categoryName = _.last(split);
        let parentFullName = level <= 1 ? null : _.take(split, split.length - 1).join(" - ");

        let category = <ICategory>{
          fullName: c.Text,
          id: id,
          level: level,
          name: categoryName,
          parent: undefined,
          parentFullName: parentFullName,
        };
        return category;
      });

    let categoryList = new List<ICategory>(categories);
    for (let c of categories) {
      c.parent = this._getParent(c, categoryList);
    }

    return categories;
  };

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
