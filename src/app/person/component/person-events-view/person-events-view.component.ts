import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {DatePipe, NgIf} from "@angular/common";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {ActivatedRoute, Router} from "@angular/router";
import {merge, of as observableOf} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {PersonEventsViewService} from "../../service/person-events-view.service";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {PersonEventsManagementComponent} from "../person-events-management/person-events-management.component";
import {PersonEventsManagementService} from "../../service/person-events-management.service";


export interface Participant {
  id: string;
  name: string;
}

export interface Citation {
  id: string;
}

export interface Event {
  id: string;
  type: string;
  date: string;
  participants: Participant[];
  formattedParticipants?: string;

  citations: Citation[];
  formattedCitations?: string;

}

export interface EventResponsePaginated {
  items: Event[];
  total_count: number;
}

@Component({
  selector: 'app-person-events-view',
  standalone: true,
  imports: [
    DatePipe,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    MatHeaderCellDef,
    MatIcon,
    NgIf,
    MatButton
  ],
  templateUrl: './person-events-view.component.html',
  styleUrl: './person-events-view.component.css'
})
export class PersonEventsViewComponent implements OnInit, AfterViewInit {

  treeId!: string;
  personId!: string;
  dataSource = new MatTableDataSource<Event>();
  displayedColumns: string[] = ['id', 'type', 'date', 'participants', 'relationship', 'place', 'description', 'citations'];
  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private personEventsViewService: PersonEventsViewService, private personEventsManagementService: PersonEventsManagementService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {

  }

  addEvent(): void {
    const dialogRef = this.dialog.open(PersonEventsManagementComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

  selectedEvent: Event | null = null;

  selectEvent(event: Event): void {
    if (this.selectedEvent === event) {
      this.selectedEvent = null;
    } else {
      this.selectedEvent = event;
    }
  }

  deleteSelectedEvent(): void {
    if (this.selectedEvent) {
      const eventId = this.selectedEvent.id;
      console.log(eventId);

      this.personEventsManagementService.deleteEvent(this.treeId, this.personId, eventId).subscribe(() => {
        this.ngAfterViewInit();
        this.selectedEvent = null;
      });
    }
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
          return this.personEventsViewService.getPersonEvents(
            this.treeId,
            this.personId,
            this.sort.active || 'id',
            this.sort.direction || 'asc',
            this.paginator.pageIndex,
            this.paginator.pageSize || 5
          ).pipe(
            catchError(() => observableOf({items: [], total_count: 0} as EventResponsePaginated))
          );
        }),
        map((data: EventResponsePaginated) => {
          this.isLoadingResults = false;
          this.resultsLength = data.total_count;
          return data.items.map(event => ({
            ...event,
            formattedParticipants: event.participants
              .map(participant => participant.name)
              .join(', '),
            formattedCitations: event.citations
              .map(citation => citation.id)
              .join(', ')
          }));
        })
      )
      .subscribe(data => {
        this.dataSource.data = data;
      });
  }
}
