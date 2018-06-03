import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css',
    ]
})
export class MenuComponent implements OnInit {

    constructor() { }

    items: MenuItem[];
    route: String;

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
