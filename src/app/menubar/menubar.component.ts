import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {


  items: MenuItem[];
  constructor() { }

  ngOnInit() {
    this.items = [{
      label: 'Formateurs',
      items: [{ label: 'Création de Session', icon: 'fa-briefcase', routerLink: ['sessions'] },
      { label: 'Validation de Session', icon: 'fa-list', routerLink: ['validation'] }]
  },
  {
      label: 'Encadrants',
      items: [{ label: 'Affectations', icon: 'fa-briefcase', routerLink: ['affectations'] }]
  },
  {
      label: 'Listes',
      items: [
          { label: 'Agents', icon: 'fa-table', routerLink: ['agents'] },
          { label: 'Flux', icon: 'fa-table', routerLink: ['flux'] },
          { label: 'Ilots', icon: 'fa-table', routerLink: ['ilots'] },
          { label: 'Grades', icon: 'fa-table', routerLink: ['grades'] },
          { label: 'Formateurs', icon: 'fa-table', routerLink: ['formateurs'] },
          { label: 'Formations', icon: 'fa-table', routerLink: ['formations'] },
          { label: 'Salles', icon: 'fa-table', routerLink: ['salles'] }
      ]
  },
  {
      label: 'Gestion',
      items: [
          { label: 'Statistiques', icon: 'fa-sort-numeric-desc' },
          { label: 'Graphiques', icon: 'fas fa-area-chart', routerLink: ['graph'] },
      ]
  }];
}

}
