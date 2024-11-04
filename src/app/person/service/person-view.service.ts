import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {PersonResponsePaginated} from "../component/person-view/person-view.component";
import {SortDirection} from "@angular/material/sort";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PersonViewService {

  private baseUrl = 'http://localhost:8080/api/v1/genealogy/trees';

  constructor(private http: HttpClient) {
  }

  getPersons(treeId: string, sort: string, order: SortDirection, page: number, size: number): Observable<PersonResponsePaginated> {
    const requestUrl = `${this.baseUrl}/${treeId}/persons`;

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
