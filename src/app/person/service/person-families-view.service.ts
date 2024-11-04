import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {SortDirection} from "@angular/material/sort";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {FamilyResponsePaginated} from "../component/person-families-view/person-families-view.component";

@Injectable({
  providedIn: 'root'
})
export class PersonFamiliesViewService {

  private baseUrl = 'http://localhost:8080/api/v1/genealogy/trees';

  constructor(private http: HttpClient) {
  }

  getPersonFamilies(treeId: string, personId: string, sort: string, order: SortDirection, page: number, size: number): Observable<FamilyResponsePaginated> {
    const requestUrl = `${this.baseUrl}/${treeId}/persons/${personId}/families`;

    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', `${sort},${order}`);

    return this.http.get<any>(requestUrl, {params}).pipe(
      map(response => ({
        items: response.content,
        total_count: response.totalElements
      }))
    );
  }
}
