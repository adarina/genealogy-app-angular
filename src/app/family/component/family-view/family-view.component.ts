import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FamilyViewService} from "../../service/family-view.service";
import {catchError, of} from 'rxjs';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {DatePipe, NgIf} from "@angular/common";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";



@Component({
  selector: 'app-family-view',
  standalone: true,
  imports: [

  ],
  templateUrl: './family-view.component.html',
  styleUrl: './family-view.component.css'
})
export class FamilyViewComponent {

}
