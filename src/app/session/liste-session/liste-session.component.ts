import { SalleService } from './../../services/salle.service';
import { FormateurService } from './../../services/formateur.service';
import { FormationService } from './../../services/formation.service';
import { Salles } from './../../modeles/salle';
import { Message, SortEvent } from 'primeng/api';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SessionService } from './../../services/session.service';
import { Sessions } from './../../modeles/sessions';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Formations } from '../../modeles/formation';
import { Formateurs } from '../../modeles/formateurs';

@Component({
  selector: 'app-liste-session',
  templateUrl: './liste-session.component.html',
  styleUrls: ['./liste-session.component.css']
})
export class ListeSessionComponent implements OnInit {

  displayDialog: boolean;
  sessions: Sessions[];
  session: Sessions = {};
  selected: Sessions;
  new: boolean;
  cols: any[];
  submitted: boolean;
  form: FormGroup;
  msgs: Message[] = [];
  listeFormation: Formations[];
  listeFormateur: Formateurs[];
  listeSalle: Salles[];
  fr: any;
  dateDebut: Date;
  dateFin: Date;


  constructor(private sessionService: SessionService, private formationService: FormationService,
    private formateurService: FormateurService,
    private salleService: SalleService, private fb: FormBuilder) { }

  ngOnInit() {
    this.getSession();
    this.getFormateur();
    this.getFormation();
    this.getSalle();

    this.fr = {
      firstDayOfWeek: 1,
      dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      dayNamesMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
      monthNames: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
      today: 'Aujourd\'hui',
      clear: 'Effacer'
    };

    this.cols = [
      { field: 'nom', header: 'Nom' },
      { field: 'nbrePersonne', header: 'Nombre de personnes' },
      { field: 'dateDebut', header: 'Date de début' },
      { field: 'dateFin', header: 'Date de Fin' },
      { field: 'formateur', header: 'Formateur' },
      { field: 'formation', header: 'Formation' },
      { field: 'salle', header: 'Salle' }
    ];

    this.form = this.fb.group({
      'nom': new FormControl('', Validators.required),
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

  getFormateur() {
    this.formateurService.getAll().subscribe(formateurs => {
      this.listeFormateur = formateurs;
    });
  }

  getFormation() {
    this.formationService.getAll().subscribe(formations => {
      this.listeFormation = formations;
    });
  }

  getSalle() {
    this.salleService.getAll().subscribe(salles => {
      this.listeSalle = salles;
    });
  }

  getSession() {
    this.sessionService.getAll().subscribe(sessions => {
      this.sessions = sessions;
    });
  }

  showDialogToAdd() {
    this.new = true;
    this.session = {};
    this.displayDialog = true;

  }
  save() {
    const sessions = [...this.sessions];
    if (this.new) {
      sessions.push(this.session),
        this.sessionService.create(this.session).subscribe(
          session => this.session = session,
        );
    } else {
      const x: Sessions = {};
      x.id = this.session.id;
      x.nom = this.session.nom;
      x.formateur = this.session.formateur;
      x.formation = this.session.formation;
      x.salle = this.session.salle;
      x.dateDebut = this.dateDebut;
      x.dateFin = this.dateFin;
      sessions[this.sessions.indexOf(this.selected)] = this.session;
      this.sessionService.update(x).subscribe(() => {
      });
    }
    this.sessions = sessions;
    this.session = null;
    this.displayDialog = false;
  }

  delete() {
    const index = this.sessions.indexOf(this.selected);
    this.sessions = this.sessions.filter((val, i) => i !== index);
    this.sessionService.delete(this.session.id).subscribe();
    this.session = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.new = false;
    this.session = this.clone(event.data);
    this.displayDialog = true;
    this.dateDebut = new Date(this.session.dateDebut);
    this.dateFin = new Date(this.session.dateFin);
    console.log('testtttttttttttt : ' + this.session.dateDebut);
    console.log('testtttttttttttt : ' + this.session.dateFin);
  }

  clone(a: Sessions): Sessions {
    const session = {};
    // tslint:disable-next-line:forin
    for (const prop in a) {
      session[prop] = a[prop];
    }
    return session;
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

  customSort1(event: SortEvent) {
    event.data.sort((data1, data2) => {
      const value1 = data1[event.field].nom;
      const value2 = data2[event.field].nom;
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

  getDate(item: Sessions) {
    const date = item.dateDebut.toDateString;
    return date;
  }


  customSort2(event: SortEvent) {
    event.data.sort((data1, data2) => {
      const value1 = data1[event.field].grade;
      const value2 = data2[event.field].grade;
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
}
