import { ActivatedRoute, Router } from '@angular/router';
import { Sessions } from './../modeles/sessions';
import { Salles } from './../modeles/salle';
import { FormationService } from './../services/formation.service';
import { Formations } from './../modeles/formation';
import { FormateurService } from './../services/formateur.service';
import { Formateurs } from './../modeles/formateurs';
import { Component, OnInit, OnChanges } from '@angular/core';
import { SelectItem, SelectItemGroup } from 'primeng/api';
import { SalleService } from '../services/salle.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  dateDebut: Date;
  dateFin: Date;
  fr: any;
  selected: any;
  listeFormateurs: Formateurs[];
  formateur: Formateurs = {};
  listeFormations: Formations[];
  formation: Formations = {};
  listeSalles: Salles[];
  salle: Salles = {};
  session: Sessions;
  nom: string;
  nbrePersonnes: number;

  constructor(private formateurService: FormateurService,
    private formationService: FormationService,
    private salleService: SalleService,
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.session = {
      'id': null,
      'nom': '',
      'validation': true,
      'nbrePersonne': null,
      'dateDebut': null,
      'dateFin': null,
      'formateur': {
        'id': null,
      },
      'formation': {
        'id': null,
      },
      'salle': {
        'id': null,
      }
    };
    this.getFormateurs();
    this.getFormations();
    this.getSalles();


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
  }

  save() {
    this.session.nbrePersonne = this.nbrePersonnes;
    this.session.nom = this.nom;
    this.session.dateDebut = this.dateDebut;
    this.session.dateFin = this.dateFin;
    this.session.formateur.id = this.formateur.id;
    this.session.formation.id = this.formation.id;
    this.session.salle.id = this.salle.id;

    this.sessionService.create(this.session).subscribe(
      session => {
      this.session = session,
        this.router.navigate(['/sessions']);
      }
    );
    console.log(this.session);

  }

  getFormateurs() {
    this.formateurService.getAll().subscribe(formateurs => {
      this.listeFormateurs = formateurs;
    });
  }

  getFormations() {
    this.formationService.getAll().subscribe(formations => {
      this.listeFormations = formations;
    });
  }

  getSalles() {
    this.salleService.getAll().subscribe(salles => {
      this.listeSalles = salles;
    });
  }
}
