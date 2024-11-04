import { Routes } from '@angular/router';
import {FamilyDetailsViewComponent} from "./family/component/family-details-view/family-details-view.component";
import {PersonViewComponent} from "./person/component/person-view/person-view.component";
import {EventViewComponent} from "./event/component/event-view/event-view.component";
import {TreeViewComponent} from "./tree/component/tree-view/tree-view.component";
import {AppComponent} from "./app.component";
import {FamilyViewComponent} from "./family/component/family-view/family-view.component";
import {PersonDetailsViewComponent} from "./person/component/person-details-view/person-details-view.component";

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'trees/:treeId', component: TreeViewComponent },
  { path: 'families', component: FamilyViewComponent },
  { path: 'persons', component: PersonViewComponent },
  { path: 'events', component: EventViewComponent },
  { path: 'family/:id', component: FamilyDetailsViewComponent },
  { path: 'person/:treeId/:personId', component: PersonDetailsViewComponent }
];
