import { Message, SortEvent } from 'primeng/api';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Salles } from '../modeles/salle';
import { MessageService } from 'primeng/components/common/messageservice';
import { SalleService } from '../services/salle.service';

@Component({
  selector: 'app-tableau-salle',
  templateUrl: './tableau-salle.component.html',
  styleUrls: ['./tableau-salle.component.css']
})
export class TableauSalleComponent implements OnInit {

  displayDialog: boolean;
  AllSalle: Salles[];
  salle: Salles = {};
  selected: Salles;
  new: boolean;
  cols: any[];
  userform: FormGroup;
  submitted: boolean;
  msgs: Message[] = [];

  constructor(private service: SalleService, private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {

    this.salle = {
      'id': null,
      'nom': '',
      'etage': ''
    };

    this.getAll();

    this.cols = [
      { field: 'nom', header: 'Nom' }, { field: 'etage', header: 'Etage' }
    ];
  }

  getAll() {
    this.service.getAll().subscribe(item => {
      this.AllSalle = item;
    });
  }

  showDialogToAdd() {
    this.new = true;
    this.salle = {};
    this.displayDialog = true;
  }

  save() {
    const item = [...this.AllSalle];
    if (this.new) {
      item.push(this.salle),
        this.service.create(this.salle).subscribe(
          x => this.salle = x,
        );
    } else {
      const x: Salles = {};
      x.id = this.salle.id;
      x.nom = this.salle.nom;
      x.etage = this.salle.etage;
      item[this.AllSalle.indexOf(this.selected)] = this.salle;
      this.service.update(x).subscribe(() => {});
    }
    this.AllSalle = item;
    this.salle = null;
    this.displayDialog = false;
  }

  delete() {
    const index = this.AllSalle.indexOf(this.selected);
    this.AllSalle = this.AllSalle.filter((val, i) => i !== index);
    this.service.delete(this.salle.id).subscribe();
    this.salle = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.new = false;
    this.salle = this.clone(event.data);
    this.displayDialog = true;
  }

  clone(f: Salles): Salles {
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

