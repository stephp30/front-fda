import { Flux } from './../modeles/flux';
import { ConfirmationService, SelectItem, Message, SortEvent } from 'primeng/api';
import { Component, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { FluxService } from '../services/flux.service';



@Component({
  selector: 'app-tableau-flux',
  templateUrl: './flux.component.html',
  styleUrls: ['./flux.component.css']

})
export class TableauFluxComponent implements OnInit {

  displayDialog: boolean;
  Allflux: Flux[];
  flux: Flux = {};
  selectedFlux: Flux;
  newFlux: boolean;
  cols: any[];
  form: FormGroup;
  submitted: boolean;
  msgs: Message[] = [];

  constructor(private service: FluxService, private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {

    this.flux = {
      'id': null,
      'nom': ''
    };

    this.getAllFlux();

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

  getAllFlux() {
    this.service.getAll().subscribe(flux => {
      this.Allflux = flux;
    });
  }
  showDialogToAdd() {
    this.newFlux = true;
    this.flux = {};
    this.displayDialog = true;
  }
  save() {
    const item = [...this.Allflux];
    if (this.newFlux) {
      item.push(this.flux),
        this.service.create(this.flux).subscribe(
          x => this.flux = x,

        );
    } else {
      item[this.Allflux.indexOf(this.selectedFlux)] = this.flux;
      this.service.update(this.flux).subscribe(() => { });
    }
    this.Allflux = item;
    this.flux = null;
    this.displayDialog = false;
  }

  delete() {
    const index = this.Allflux.indexOf(this.selectedFlux);
    this.Allflux = this.Allflux.filter((val, i) => i !== index);
    this.service.delete(this.flux.id).subscribe();
    this.flux = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newFlux = false;
    this.flux = this.cloneFlux(event.data);
    this.displayDialog = true;
  }

  cloneFlux(f: Flux): Flux {
    const flux = {};
    // tslint:disable-next-line:forin
    for (const prop in f) {
      flux[prop] = f[prop];
    }
    return flux;
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
