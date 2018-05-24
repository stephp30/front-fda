import { MessageService } from 'primeng/components/common/messageservice';
import { Message, SortEvent } from 'primeng/api';
import { FormGroup, FormBuilder } from '@angular/forms';
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
  ilots: Ilots[];
  ilot: Ilots = {};
  selectedIlot: Ilots;
  newIlot: boolean;
  cols: any[];
  userform: FormGroup;
  submitted: boolean;
  msgs: Message[] = [];

  constructor(private ilotService: IlotService, private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {

    this.getIlots();

    this.cols = [

      { field: 'nom', header: 'Nom' }

    ];
  }
  getIlots() {
    this.ilotService.getAll().subscribe(ilots => {
      this.ilots = ilots;
    });
  }
  showDialogToAdd() {
    this.newIlot = true;
    this.ilot = {};
    this.displayDialog = true;
  }
  save() {
    const ilot = [...this.ilots];
    if (this.newIlot) {
      ilot.push(this.ilot),
        this.ilotService.create(this.ilot).subscribe(
          fl => this.ilot = fl,

        );
      this.getIlots();
    } else {
      this.ilotService.update(this.ilot).subscribe(() => {
      });
      this.getIlots();
    }

    this.getIlots();
    this.ilot = null;
    this.displayDialog = false;
  }

  delete() {
    const index = this.ilots.indexOf(this.selectedIlot);
    this.ilots = this.ilots.filter((val, i) => i !== index);
    this.ilotService.delete(this.ilot.id).subscribe();
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
