import { MessageService } from 'primeng/components/common/messageservice';
import { Message, SortEvent } from 'primeng/api';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Ilots } from './../modeles/ilots';
import { Component, OnInit } from '@angular/core';
import { IlotService } from '../services/ilot.service';

@Component({
  selector: 'app-tableau-ilot',
  templateUrl: './tableau-ilot.component.html',
  styleUrls: ['./tableau-ilot.component.css']
})
export class TableauIlotComponent implements OnInit {

  displayDialog: boolean;
  allIlots: Ilots[];
  ilot: Ilots = {};
  selected: Ilots;
  newIlot: boolean;
  cols: any[];
  form: FormGroup;
  submitted: boolean;
  msgs: Message[] = [];

  constructor(private service: IlotService, private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {

    this.ilot = {
      'id': null,
      'nom': ''
    };

    this.getIlots();

    this.cols = [
      { field: 'nom', header: 'Nom' }
    ];

    this.form = this.fb.group({
      'nom': new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z].+$')]))
    });
  }

  cacherBouton(): boolean {
    let a: boolean;
    a = true;
    if (this.form.valid) {
      a = false;
    }
    return a;
  }

  getIlots() {
    this.service.getAll().subscribe(ilots => {
      this.allIlots = ilots;
    });
  }
  showDialogToAdd() {
    this.newIlot = true;
    this.ilot = {};
    this.displayDialog = true;
  }


  save() {
    const item = [...this.allIlots];
    if (this.newIlot) {
      item.push(this.ilot),
        this.service.create(this.ilot).subscribe(
          x => this.ilot = x,

        );
    } else {
      item[this.allIlots.indexOf(this.selected)] = this.ilot;
      this.service.update(this.ilot).subscribe(() => {});
    }
    this.allIlots = item;
    this.ilot = null;
    this.displayDialog = false;
  }

  delete() {
    const index = this.allIlots.indexOf(this.selected);
    this.allIlots = this.allIlots.filter((val, i) => i !== index);
    this.service.delete(this.ilot.id).subscribe();
    this.ilot = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newIlot = false;
    this.ilot = this.cloneIlot(event.data);
    this.displayDialog = true;
  }

  cloneIlot(f: Ilots): Ilots {
    const ilot = {};
    // tslint:disable-next-line:forin
    for (const prop in f) {
      ilot[prop] = f[prop];
    }
    return ilot;
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
    this.msgs.push({ severity: 'success', summary: 'Info Message', detail: 'Ilot Supprimé' });
  }

  clear() {
    this.messageService.clear();
}
}
