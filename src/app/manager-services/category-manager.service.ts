import {Injectable} from "@angular/core";
import {ManagerServiceConstants} from "./manager-service-constants";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'


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
      .map(categories => categories.map(category => <ICategory>({
        name: category.Text
      })))
      .do(x => console.log("After:\n" + JSON.stringify(x)))
      .catch(this.handleHttpError);
    ;
  }

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
}
