import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-transcripts',
  templateUrl: './transcripts.component.html',
  styleUrls: ['./transcripts.component.css']
})

export class TranscriptsComponent implements OnInit {
  term = 'blue bird';
  matches = [];

  search(): void {
    this.doSearch().subscribe(
      res => {
        console.log(res);
        this.matches = res.result.items;
        console.log(this.matches);
      }
    );
  }

  doSearch(): Observable<any>{
    return this.httpClient.get('http://localhost:8080/api/3/transcripts/search?term=' + this.term);
  }

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

}
