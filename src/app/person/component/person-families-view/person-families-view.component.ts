import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute, Router} from "@angular/router";
import {merge, of as observableOf} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {PersonFamiliesViewService} from "../../service/person-families-view.service";
import {DatePipe, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

export interface Child {
  childId: string;
  childName: string;
  childBirthdate: string;
}

export interface Family {
  id: string;
  fatherId: string;
  fatherName: string;
  fatherBirthdate: string;
  motherId: string;
  motherName: string;
  motherBirthdate: string;
  children: Child[];
}

export interface FamilyResponsePaginated {
  items: Family[];
  total_count: number;
}

export interface FamilyRow {
  id: string;
  name: string;
  birthdate?: string;
  isLabelRow: boolean;
  label?: string;
  isCurrentPerson: boolean;
}

@Component({
  selector: 'app-person-families-view',
  standalone: true,
  imports: [
    DatePipe,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatIcon,
    MatPaginator,
    MatTable,
    NgIf,
    MatHeaderCellDef,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatSort
  ],
  templateUrl: './person-families-view.component.html',
  styleUrls: ['./person-families-view.component.css']
})
export class PersonFamiliesViewComponent implements OnInit, AfterViewInit {

  treeId!: string;
  personId!: string;
  dataSource = new MatTableDataSource<FamilyRow>();
  displayedColumns: string[] = ['id', 'label', 'name', 'birthdate'];
  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private personFamiliesViewService: PersonFamiliesViewService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.treeId = this.route.snapshot.paramMap.get('treeId')!;
    this.personId = this.route.snapshot.paramMap.get('personId')!;

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.personFamiliesViewService.getPersonFamilies(
            this.treeId,
            this.personId,
            this.sort.active || 'id',
            this.sort.direction || 'asc',
            this.paginator.pageIndex,
            this.paginator.pageSize || 5
          ).pipe(
            catchError(() => observableOf({items: [], total_count: 0} as FamilyResponsePaginated))
          );
        }),
        map((data: FamilyResponsePaginated) => {
          this.isLoadingResults = false;
          this.resultsLength = data.total_count;

          const flattenedFamilies: FamilyRow[] = data.items.flatMap(family => {
            const fatherRow: FamilyRow = {
              id: family.id,
              name: family.fatherName,
              birthdate: family.fatherBirthdate,
              isLabelRow: true,
              label: 'Father',
              isCurrentPerson: family.fatherId === this.personId
            };

            const motherRow: FamilyRow = {
              id: family.id,
              name: family.motherName,
              birthdate: family.motherBirthdate,
              isLabelRow: true,
              label: 'Mother',
              isCurrentPerson: family.motherId === this.personId
            };

            const childRows = family.children.map(child => ({
              id: family.id,
              name: child.childName,
              birthdate: child.childBirthdate,
              isLabelRow: true,
              label: 'Child',
              isCurrentPerson: child.childId === this.personId
            }));


            return [
              fatherRow,
              motherRow,
              ...childRows
            ];
          });

          return flattenedFamilies;
        })
      )
      .subscribe(data => {
        this.dataSource.data = data;
      });
  }
}
