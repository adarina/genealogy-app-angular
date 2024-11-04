import { Injectable } from '@angular/core';
import {map} from "rxjs/operators";
import {HttpClient, HttpParams} from "@angular/common/http";
import {SortDirection} from "@angular/material/sort";
import {Observable} from "rxjs";
import {EventResponsePaginated} from "../component/person-events-view/person-events-view.component";

@Injectable({
  providedIn: 'root'
})
export class PersonEventsViewService {

  private baseUrl = 'http://localhost:8080/api/v1/genealogy/trees';

  constructor(private http: HttpClient) {
  }

  getPersonEvents(treeId: string,personId: string, sort: string, order: SortDirection, page: number, size: number): Observable<EventResponsePaginated> {
    const requestUrl = `${this.baseUrl}/${treeId}/persons/${personId}/events`;

    console.log(requestUrl);
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
