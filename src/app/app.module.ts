import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BillsComponent } from './bills/bills.component';
import { TranscriptsComponent } from './transcripts/transcripts.component';
import { LawsComponent } from './laws/laws.component';
import { CalendarsComponent } from './calendars/calendars.component';
import { AgendasComponent } from './agendas/agendas.component';

@NgModule({
  declarations: [
    AppComponent,
    BillsComponent,
    TranscriptsComponent,
    LawsComponent,
    CalendarsComponent,
    AgendasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
