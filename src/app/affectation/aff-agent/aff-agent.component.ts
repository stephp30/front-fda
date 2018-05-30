import { HttpClient } from '@angular/common/http';
import { Agents } from './../../modeles/agents';
import { AgentService } from './../../services/agent.service';
import { Sessions } from './../../modeles/sessions';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-aff-agent',
  templateUrl: './aff-agent.component.html',
  styleUrls: ['./aff-agent.component.css']
})
export class AffAgentComponent implements OnInit {

  session: Sessions;
  id: number;
  liste1: Agents[];
  liste2: Agents[];
  agents: Agents[];

  constructor(private service: SessionService, private agentService: AgentService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.getAgents();
    this.liste2 = [];
    this.id = +this.route.snapshot.params.id;
    this.getSession();
  }

  getSession() {
    this.service.getOne(this.id).subscribe(item => {
      this.session = item;
    });
  }

  getAgents() {
    this.agentService.getAll().subscribe(agents => {
      this.liste1 = agents;
    });
  }

  save() {
    this.session.agent = [];
    this.liste2.forEach(element => {
      this.session.agent.push(element);

    });
    this.service.update(this.session).subscribe(() => {
    });
    console.log(this.session);
  }

  convocation() {
    this.service.convocation(this.session).subscribe(() => {
      window.open('http://localhost:8080/pdf/convocation.pdf');
    });
  }
}


