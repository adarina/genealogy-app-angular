import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonEventsManagementService {

  private baseUrl = 'http://localhost:8080/api/v1/genealogy/trees';

  constructor(private http: HttpClient) {}


  deleteEvent(treeId: string, personId: string, eventId: string): Observable<void> {
    const url = `${this.baseUrl}/${treeId}/persons/${personId}/events/${eventId}`;
    return this.http.delete<void>(url, { headers: this.createHeaders() });
  }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
}
