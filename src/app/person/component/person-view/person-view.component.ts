import {Component, Input, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Router} from "@angular/router";
import {PersonViewService} from "../../service/person-view.service";
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {DatePipe} from "@angular/common";

export interface Person {
  id: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  gender: string;
}

export interface PersonResponsePaginated {
  items: Person[];
  total_count: number;
}

@Component({
  selector: 'app-person-view',
  standalone: true,
  templateUrl: './person-view.component.html',
  imports: [
    MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, DatePipe
  ],
  styleUrls: ['./person-view.component.css']
})
export class PersonViewComponent implements OnInit, AfterViewInit {
  @Input() treeId!: string;

  dataSource = new MatTableDataSource<Person>();
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'birthdate', 'gender'];
  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private personViewService: PersonViewService, private router: Router) {
  }

  ngOnInit(): void {

  }


  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.personViewService.getPersons(
            this.treeId,
            this.sort.active || 'id',
            this.sort.direction || 'asc',
            this.paginator.pageIndex,
            this.paginator.pageSize || 5
          ).pipe(
            catchError(() => observableOf({items: [], total_count: 0} as PersonResponsePaginated))
          );
        }),
        map((data: PersonResponsePaginated) => {
          this.isLoadingResults = false;
          this.resultsLength = data.total_count;
          return data.items;
        })
      )
      .subscribe(data => {
        this.dataSource.data = data;
      });
  }

  navigateToPersonDetails(treeId: string, personId: string) {
    this.router.navigate(['/person', treeId, personId]).catch(err => console.error('Navigation error:', err));
  }
}
