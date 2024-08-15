import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {baseUrl} from '../const/path';
import {Category} from "../model/category";
import {Field} from "../model/field";
import {Classification} from "../model/classification";
import {State} from "../model/state";
import {WorkItemTypes} from "../model/workitemtypes";
import {Process} from "../model/process";


@Injectable({
  providedIn: 'root'
})
export class MetaDataService {

  // コンストラクタ(HttpClientModuleをDI)
  constructor(private httpClient: HttpClient) { }


  // WebAPIの呼び出し
  getMetaDataCategories(): Observable<Category> {
    // WebAPIの呼び出し
    return this.httpClient.get<Category>(baseUrl + 'api/categories').pipe(
      map((category) => {
        return category;
      }));
  }

  getMetaDataFields(): Observable<Field> {
    // WebAPIの呼び出し
    return this.httpClient.get<Field>(baseUrl + 'api/fields').pipe(
      map((field) => {
        return field;
      }));
  }

  getMetaDataWorkItemTypes(): Observable<WorkItemTypes> {
    // WebAPIの呼び出し
    return this.httpClient.get<WorkItemTypes>(baseUrl + 'api/workitemtypes').pipe(
      map((value) => {
        return value;
      }));
  }

  getMetaDataClassification(): Observable<Classification> {
    // WebAPIの呼び出し
    return this.httpClient.get<Classification>(baseUrl + 'api/classification').pipe(
      map((field) => {
        return field;
      }));
  }

  getMetaDataStates(): Observable<State> {
    // WebAPIの呼び出し
    return this.httpClient.get<State>(baseUrl + 'api/states').pipe(
      map((state) => {
        return state;
      }));
  }

  getMetaDataProcessesLayout(): Observable<Process> {
    // WebAPIの呼び出し
    return this.httpClient.get<Process>(baseUrl + 'api/processes/layout').pipe(
      map((process) => {
        return process;
      }));
  }





}
