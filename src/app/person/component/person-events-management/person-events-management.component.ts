import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";

@Component({
  selector: 'app-person-events-management',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions
  ],
  templateUrl: './person-events-management.component.html',
  styleUrl: './person-events-management.component.css'
})
export class PersonEventsManagementComponent {

}
