import { Component } from '@angular/core';
import {PersonEventsViewComponent} from "../person-events-view/person-events-view.component";
import {EventViewComponent} from "../../../event/component/event-view/event-view.component";
import {FamilyViewComponent} from "../../../family/component/family-view/family-view.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {PersonViewComponent} from "../person-view/person-view.component";
import {TreeViewComponent} from "../../../tree/component/tree-view/tree-view.component";
import {PersonFamiliesViewComponent} from "../person-families-view/person-families-view.component";

@Component({
  selector: 'app-person-details-view',
  standalone: true,
  imports: [
    PersonEventsViewComponent,
    EventViewComponent,
    FamilyViewComponent,
    MatTab,
    MatTabGroup,
    PersonViewComponent,
    TreeViewComponent,
    PersonFamiliesViewComponent
  ],
  templateUrl: './person-details-view.component.html',
  styleUrl: './person-details-view.component.css'
})
export class PersonDetailsViewComponent {

  treeId?: string;
  personId?: string;
}
