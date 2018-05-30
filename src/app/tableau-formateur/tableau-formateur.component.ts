import { MessageService } from 'primeng/components/common/messageservice';
import { Message, SortEvent } from 'primeng/api';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Formateurs } from './../modeles/formateurs';
import { Component, OnInit } from '@angular/core';
import { FormateurService } from '../services/formateur.service';

@Component({
  selector: 'app-tableau-formateur',
  templateUrl: './tableau-formateur.component.html',
  styleUrls: ['./tableau-formateur.component.css']
})
export class TableauFormateurComponent implements OnInit {

  displayDialog: boolean;
  allFormateur: Formateurs[];
  formateur: Formateurs;
  selected: Formateurs;
  new: boolean;
  cols: any[];
  userform: FormGroup;
  submitted: boolean;
  msgs: Message[] = [];

  constructor(private service: FormateurService, private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.getAll();

    this.cols = [

      { field: 'idRh', header: 'IDRH' }, { field: 'nom', header: 'Nom' }, { field: 'prenom', header: 'Prénom' },
      { field: 'mail', header: 'Mail' }, { field: 'tel', header: 'Téléphone' }

    ];
  }
  getAll() {
    this.service.getAll().subscribe(item => {
      this.allFormateur = item;
    });
  }
  showDialogToAdd() {
    this.new = true;
    this.formateur = {};
    this.displayDialog = true;
  }
  save() {
    const item = [...this.allFormateur];
    const item2 = new Object();
    if (this.new) {
      item.push(this.formateur),
        this.service.create(this.formateur).subscribe(
          fl => this.formateur = fl,

        );
    } else {
      item[this.allFormateur.indexOf(this.selected)] = this.formateur;
      this.service.update(this.formateur).subscribe(() => {});
    }
    this.allFormateur = item;
    this.formateur = null;
    this.displayDialog = false;
  }

  delete() {
    const index = this.allFormateur.indexOf(this.selected);
    this.allFormateur = this.allFormateur.filter((val, i) => i !== index);
    this.service.delete(this.formateur.id).subscribe();
    this.formateur = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.new = false;
    this.formateur = this.clone(event.data);
    this.displayDialog = true;
  }

  clone(f: Formateurs): Formateurs {
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
