import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";


export interface Tree {
  id: string;
  name: string;
}
@Injectable({
  providedIn: 'root'
})
export class TreeViewService {

  private baseUrl = 'http://localhost:8080/api/v1/genealogy/trees';

  constructor(private http: HttpClient) {}

  getTrees(): Observable<Tree[]> {
    return this.http.get<Tree[]>(this.baseUrl);
  }
}
