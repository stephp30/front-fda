import { SortEvent, Message } from 'primeng/api';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Grades } from './../modeles/grade';
import { Component, OnInit } from '@angular/core';
import { GradeService } from '../services/grade.service';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-tableau-grades',
  templateUrl: './tableau-grades.component.html',
  styleUrls: ['./tableau-grades.component.css']
})
export class TableauGradesComponent implements OnInit {

  displayDialog: boolean;
  allGrade: Grades[];
  grade: Grades;
  selected: Grades;
  new: boolean;
  cols: any[];
  userform: FormGroup;
  submitted: boolean;
  msgs: Message[] = [];

  constructor(private service: GradeService, private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {

    this.grade = {
      'id': null,
      'classe': '',
      'grade': '',
    };

    this.getAll();

    this.cols = [

      { field: 'classe', header: 'Classe' }, { field: 'grade', header: 'Grade' }

    ];
  }
  getAll() {
    this.service.getAll().subscribe(item => {
      this.allGrade = item;
    });
  }
  showDialogToAdd() {
    this.new = true;
    this.grade = {};
    this.displayDialog = true;
  }
  save() {
    const item = [...this.allGrade];
    const item2 = new Object();
    if (this.new) {
      item.push(this.grade),
        this.service.create(this.grade).subscribe(
          fl => this.grade = fl,

        );
    } else {
      const x: Grades = {};
      x.id = this.grade.id;
      x.grade = this.grade.grade;
      x.classe = this.grade.classe;
      item[this.allGrade.indexOf(this.selected)] = this.grade;
      this.service.update(x).subscribe(() => { });
      console.log(x);
    }
    this.allGrade = item;
    this.grade = null;
    this.displayDialog = false;
  }

  delete() {
    const index = this.allGrade.indexOf(this.selected);
    this.allGrade = this.allGrade.filter((val, i) => i !== index);
    this.service.delete(this.grade.id).subscribe();
    this.grade = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.new = false;
    this.grade = this.clone(event.data);
    this.displayDialog = true;
  }

  clone(f: Grades): Grades {
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

