import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EventViewService} from "../../service/event-view.service";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";

export interface Participant {
  id: string;
  name: string;
}

export interface Event {
  id: string;
  type: string;
  date: string;
  participants: Participant[];
  formattedParticipants?: string;

}

@Component({
  selector: 'app-event-view',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef
  ],
  templateUrl: './event-view.component.html',
  styleUrl: './event-view.component.css'
})
export class EventViewComponent implements OnInit {
  @Input() treeId!: string;

  events: Event[] = [];
  displayedColumns: string[] = ['id', 'type', 'date', 'participants'];
  clickedRows = new Set<Event>();

  constructor(private eventViewService: EventViewService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventViewService.getEvents(this.treeId).subscribe((data: Event[]) => {
      this.events = data.map((event: Event) => ({
        ...event,
        formattedParticipants: event.participants.map(participant => participant.name).join(', ')
      }));
    });
  }


  navigateToEventDetails(personId: string) {
    this.router.navigate(['/event', personId]).catch(err => console.error('Navigation error:', err));
  }

}
