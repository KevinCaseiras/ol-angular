import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CalendarsComponent} from './calendars/calendars.component';
import {AgendasComponent} from './agendas/agendas.component';
import {BillsComponent} from './bills/bills.component';
import {LawsComponent} from './laws/laws.component';
import {TranscriptsComponent} from './transcripts/transcripts.component';

const routes: Routes = [
  {path: 'calendars', component: CalendarsComponent},
  {path: 'agendas', component: AgendasComponent},
  {path: 'bills', component: BillsComponent},
  {path: 'laws', component: LawsComponent},
  {path: 'transcripts', component: TranscriptsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
