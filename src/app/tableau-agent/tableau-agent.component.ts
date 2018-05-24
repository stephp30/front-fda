import { Grades } from './../modeles/grade';
import { Ilots } from './../modeles/ilots';
import { style } from '@angular/animations';
import { Flux } from './../modeles/flux';
import { Agents } from './../modeles/agents';
import { ConfirmationService, SelectItem, Message, SortEvent, SelectItemGroup } from 'primeng/api';
import { Component, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { ObjectUtils } from 'primeng/components/utils/objectutils';
import { PatternValidator } from '@angular/forms';
import { AgentService } from '../services/agent.service';
import { FluxService } from '../services/flux.service';
import { IlotService } from '../services/ilot.service';
import { GradeService } from '../services/grade.service';

@Component({
  selector: 'app-tableau-agent',
  templateUrl: './tableau-agent.component.html',
  styleUrls: ['./tableau-agent.component.css'],


})
export class TableauAgentComponent implements OnInit {

  displayDialog: boolean;
  agents: Agents[];
  agent: Agents = {};
  selectedAgent: Agents;
  newAgent: boolean;
  cols: any[];
  submitted: boolean;
  agentForm: FormGroup;
  msgs: Message[] = [];
  listeFlux: Flux[];
  listeIlots: Ilots[];
  listeGrades: Grades[];


  constructor(private agentService: AgentService, private fluxService: FluxService, private ilotService: IlotService,
    private gradeService: GradeService, private fb: FormBuilder) { }

  ngOnInit() {
    this.getFlux();
    this.getAgents();
    this.getIlots();
    this.getGrades();

    this.agentForm = this.fb.group({
      'prenom': new FormControl('', Validators.required),
      'nom': new FormControl('', Validators.required),
      'idrh': new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]{3}[0-9]{3}$')])),

  });
  }

    cacherBouton(): boolean {
      let a: boolean;
      a = true;
      if (this.agentForm.valid) {
        a = false;
      }
      return a;
    }


    getAgents() {
      this.agentService.getAll().subscribe(agents => {
        this.agents = agents;
      });
    }

    getIlots() {
      this.ilotService.getAll().subscribe(ilots => {
        this.listeIlots = ilots;
      });
    }

    getFlux() {
      this.fluxService.getAll().subscribe(flux => {
        this.listeFlux = flux;
      });
    }

    getGrades() {
      this.gradeService.getAll().subscribe(grades => {
        this.listeGrades = grades;
      });
    }

    showDialogToAdd() {
      this.newAgent = true;
      this.agent = {};
      this.displayDialog = true;

    }
    save() {
      const agents = [...this.agents];
      if (this.newAgent) {
        agents.push(this.agent),
          this.agentService.create(this.agent).subscribe(
            agent => this.agent = agent,
          );
        this.getAgents();
      } else {
        this.agentService.update(this.agent).subscribe(() => {
        });
        this.getAgents();
      }

      this.getAgents();
      this.agent = null;
      this.displayDialog = false;
    }

    delete () {
      const index = this.agents.indexOf(this.selectedAgent);
      this.agents = this.agents.filter((val, i) => i !== index);
      this.agentService.delete(this.agent.id).subscribe();
      this.agent = null;
      this.displayDialog = false;
    }

    onRowSelect(event) {
      this.newAgent = false;
      this.agent = this.cloneAgent(event.data);
      this.displayDialog = true;
    }

    cloneAgent(a: Agents): Agents {
      const agent = {};
      // tslint:disable-next-line:forin
      for (const prop in a) {
        agent[prop] = a[prop];
      }
      return agent;
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

  }
