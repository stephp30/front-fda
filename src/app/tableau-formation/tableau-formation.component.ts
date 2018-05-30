import { Message, SortEvent } from 'primeng/api';
import { Formations } from './../modeles/formation';
import { FormationService } from './../services/formation.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-tableau-formation',
  templateUrl: './tableau-formation.component.html',
  styleUrls: ['./tableau-formation.component.css']
})
export class TableauFormationComponent implements OnInit {

  displayDialog: boolean;
  allFormation: Formations[];
  formation: Formations = {};
  selected: Formations;
  new: boolean;
  cols: any[];
  userform: FormGroup;
  submitted: boolean;
  msgs: Message[] = [];

  constructor(private service: FormationService, private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.getAll();

    this.cols = [

      { field: 'nom', header: 'Nom' },  { field: 'code', header: 'Code' }, {field: 'duree', header: 'Durée'}

    ];
  }
  getAll() {
    this.service.getAll().subscribe(item => {
      this.allFormation = item;
    });
  }
  showDialogToAdd() {
    this.new = true;
    this.formation = {};
    this.displayDialog = true;
  }
  save() {
    const item = [...this.allFormation];
    if (this.new) {
      item.push(this.formation),
        this.service.create(this.formation).subscribe(
          fl => this.formation = fl,

        );
    } else {
      item[this.allFormation.indexOf(this.selected)] = this.formation;
      this.service.update(this.formation).subscribe(() => {});
    }
    this.allFormation = item;
    this.formation = null;
    this.displayDialog = false;
  }

  delete() {
    const index = this.allFormation.indexOf(this.selected);
    this.allFormation = this.allFormation.filter((val, i) => i !== index);
    this.service.delete(this.formation.id).subscribe();
    this.formation = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.new = false;
    this.formation = this.clone(event.data);
    this.displayDialog = true;
  }

  clone(f: Formations): Formations {
    const item = {};
    // tslint:disable-next-line:forin
    for (const prop in f) {
      item[prop] = f[prop];
    }
    return item;
  }

  // Filtre
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      const value1 = data1[event.field];
      const value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null) {
        result = -1;
      } else if (value1 != null && value2 == null) {
        result = 1;
      } else if (value1 == null && value2 == null) {
        result = 0;
      } else if (typeof value1 === 'string' && typeof value2 === 'string') {
        result = value1.localeCompare(value2);
      } else {
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
      }
      return (event.order * result);
    });
  }

  show() {
    this.msgs.push({ severity: 'success', summary: 'Info Message', detail: 'Flux Supprimé' });
  }

  clear() {
    this.messageService.clear();
}
}
