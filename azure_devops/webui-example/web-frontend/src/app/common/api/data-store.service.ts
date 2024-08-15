import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {baseUrl} from "../const/path";
import {WorkItem} from "../model/workitems";

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  constructor(private httpClient: HttpClient) { }

  // WebAPIの呼び出し
  getWorkItems(): Observable<WorkItem[]> {
    // WebAPIの呼び出し
    return this.httpClient.get<WorkItem[]>(baseUrl + 'api/workitems').pipe(
      map((workItems) => {
        return workItems;
      }));
  }

}
