import { SessionComponent } from './session/session.component';
import { TableauIlotComponent } from './tableau-ilot/tableau-ilot.component';
import { TableauFluxComponent } from './tableau-flux/flux.component';
import { TableauAgentComponent } from './tableau-agent/tableau-agent.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TableauSalleComponent } from './tableau-salle/tableau-salle.component';
import { TableauFormationComponent } from './tableau-formation/tableau-formation.component';
import { TableauFormateurComponent } from './tableau-formateur/tableau-formateur.component';
import { TableauGradesComponent } from './tableau-grades/tableau-grades.component';

const routes: Routes = [
  { path: '', redirectTo: '/agents', pathMatch: 'full' },
  { path: 'sessions', component: SessionComponent },
  { path: 'agents', component: TableauAgentComponent },
  { path: 'flux', component: TableauFluxComponent },
  { path: 'ilots', component: TableauIlotComponent },
  { path: 'salles', component: TableauSalleComponent },
  { path: 'grades', component: TableauGradesComponent },
  { path: 'formations', component: TableauFormationComponent },
  { path: 'formateurs', component: TableauFormateurComponent }

];

@NgModule({
  imports: [CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
