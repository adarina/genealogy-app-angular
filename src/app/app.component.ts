import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {Tree, TreeViewService} from "./tree/service/tree-view.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatMenu, MatMenuTrigger, MatToolbar, MatMenuItem, MatButton, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit {
  title = 'genealogy-app-angular';
  availableTrees: Tree[] = [];

  constructor(private router: Router, private treeViewService: TreeViewService) {}

  ngOnInit(): void {
    this.loadTrees();
  }

  loadTrees() {
    this.treeViewService.getTrees().subscribe({
      next: trees => this.availableTrees = trees,
      error: error => console.error('Error loading trees', error),
      complete: () => console.log('Trees loading complete')
    });
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

  selectTree(treeId: string) {
    this.router.navigate(['/trees', treeId]);
  }

}
