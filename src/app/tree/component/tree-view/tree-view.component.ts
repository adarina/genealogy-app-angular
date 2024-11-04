import {Component, OnInit} from '@angular/core';
import {FamilyViewComponent} from "../../../family/component/family-view/family-view.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {PersonViewComponent} from "../../../person/component/person-view/person-view.component";
import {EventViewComponent} from "../../../event/component/event-view/event-view.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-tree-view',
  standalone: true,
  imports: [
    FamilyViewComponent,
    MatTab,
    PersonViewComponent,
    MatTabGroup,
    EventViewComponent,
  ],
  templateUrl: './tree-view.component.html',
  styleUrl: './tree-view.component.css'
})
export class TreeViewComponent {
  treeId: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.treeId = params.get('treeId') || '';
    });
  }
}
