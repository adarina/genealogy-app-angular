import { Injectable } from '@angular/core';
import {FamilyChildrenResponse} from "../dto/family-children-response";
import {FamilyParentResponse} from "../dto/family-parent-response";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FamilyViewService {
  private baseUrl = 'http://localhost:8080/api/v1/genealogy/trees';

  constructor(private http: HttpClient) {}


}
