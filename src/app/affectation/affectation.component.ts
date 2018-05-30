import { SessionService } from './../services/session.service';
import { Sessions } from './../modeles/sessions';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-affectation',
  templateUrl: './affectation.component.html',
  styleUrls: ['./affectation.component.css']
})
export class AffectationComponent implements OnInit {

  cols: any[];
  sessions: Sessions[];

  selected: Sessions;
  name: any;

  constructor(private service: SessionService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getAll();
    this.cols = [
      { valeur: 'id', titre: 'ID' },
      { valeur: 'nom', titre: 'Nom' },
      { valeur: 'nbrePersonne', titre: 'Nombres de Places' },
      { date: 'dateDebut', titre: 'Date' },
      { heure: 'dateDebut', titre: 'Heure' },
      { date: 'dateFin', titre: 'Date' },
      { heure: 'dateFin', titre: 'Heure' }
    ];
  }

  getAll() {
    this.service.getValide().subscribe(item => {
      this.sessions = item;
    });
  }

  affAgent(session: Sessions) {
    this.selected = session;
    this.router.navigate(['/affectation', this.selected.id]);
  }
}
