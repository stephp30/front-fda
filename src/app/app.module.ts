import { SessionService } from './services/session.service';
import { FormationService } from './services/formation.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MegaMenuModule } from 'primeng/megamenu';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { TableauAgentComponent } from './tableau-agent/tableau-agent.component';
import {
  DialogModule,
  KeyFilterModule,
  TooltipModule,
  MenubarModule,
  CardModule,
  CheckboxModule,
  RadioButtonModule,
  CalendarModule,
  SpinnerModule,
  FieldsetModule,
  PickListModule
} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { FormsModule, FormGroupDirective, FormControlDirective, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageService } from 'primeng/components/common/messageservice';
import { GrowlModule, MessageModule } from 'primeng/primeng';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './/app-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { TableauFluxComponent } from './tableau-flux/flux.component';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { TableauIlotComponent } from './tableau-ilot/tableau-ilot.component';
import { TableauFormationComponent } from './tableau-formation/tableau-formation.component';
import { TableauSalleComponent } from './tableau-salle/tableau-salle.component';
import { TableauFormateurComponent } from './tableau-formateur/tableau-formateur.component';
import { MenubarComponent } from './menubar/menubar.component';
import { PlurielsPipe } from './pipe/pluriels.pipe';
import { AgentService } from './services/agent.service';
import { FluxService } from './services/flux.service';
import { IlotService } from './services/ilot.service';
import { GradeService } from './services/grade.service';
import { SalleService } from './services/salle.service';
import { SessionComponent } from './session/session.component';
import { FormateurService } from './services/formateur.service';
import { TableauGradesComponent } from './tableau-grades/tableau-grades.component';
import { AffectationComponent } from './affectation/affectation.component';
import { AffAgentComponent } from './affectation/aff-agent/aff-agent.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TableauAgentComponent,
    TableauFluxComponent,
    TableauIlotComponent,
    TableauFormationComponent,
    TableauSalleComponent,
    TableauFormateurComponent,
    MenubarComponent,
    PlurielsPipe,
    SessionComponent,
    TableauGradesComponent,
    AffectationComponent,
    AffAgentComponent
  ],
  imports: [
    BrowserModule,
    AccordionModule,
    AngularFontAwesomeModule,
    MegaMenuModule,
    MenuModule,
    DialogModule,
    TableModule,
    FormsModule,
    HttpClientModule,
    ConfirmDialogModule,
    FlexLayoutModule,
    BrowserModule,
    ReactiveFormsModule,
    InputMaskModule,
    KeyFilterModule,
    GrowlModule,
    MessageModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    DropdownModule,
    CodeHighlighterModule,
    MenubarModule,
    CardModule,
    RadioButtonModule,
    CheckboxModule,
    CalendarModule,
    SpinnerModule,
    FieldsetModule,
    PickListModule,
    TooltipModule

  ],
  exports: [BrowserModule],
  providers: [
    AgentService,
    FluxService,
    IlotService,
    GradeService,
    ConfirmationService,
    FormControlDirective,
    FormGroupDirective,
    SalleService,
    FormateurService,
    FormationService,
    SessionService,
    MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
