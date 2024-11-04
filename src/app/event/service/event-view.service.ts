import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventViewService {


  private baseUrl = 'http://localhost:8080/api/v1/genealogy/trees';

  constructor(private http: HttpClient) {
  }

  getEvents(treeId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${treeId}/events`);
  }
}
