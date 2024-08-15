import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";

import {baseUrl} from "../const/path";

@Injectable({
  providedIn: 'root'
})
export class DataOperationService {

  constructor(private httpClient: HttpClient) { }

  public postExecuteDataUpdate(): Observable<boolean> {
    return this.httpClient.post<boolean>(baseUrl + 'api/data-operation/load-data', "", {headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })}).pipe(map((r) => {return r;} ));
  }



}
