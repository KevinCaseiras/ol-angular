import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BillsComponent } from './bills/bills.component';
import { TranscriptsSearchComponent } from './transcripts/transcripts-search/transcripts-search.component';
import { LawsComponent } from './laws/laws.component';
import { CalendarsComponent } from './calendars/calendars.component';
import { AgendasComponent } from './agendas/agendas.component';
import { TranscriptViewComponent } from './transcripts/transcript-view/transcript-view.component';

@NgModule({
  declarations: [
    AppComponent,
    BillsComponent,
    TranscriptsSearchComponent,
    LawsComponent,
    CalendarsComponent,
    AgendasComponent,
    TranscriptViewComponent
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
