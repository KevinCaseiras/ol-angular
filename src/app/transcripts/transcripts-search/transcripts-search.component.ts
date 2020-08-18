import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-transcripts-search',
  templateUrl: './transcripts-search.component.html',
  styleUrls: ['./transcripts-search.component.css']
})

export class TranscriptsSearchComponent implements OnInit {
  // term = 'blue bird';
  matches = [];

  searchForm = new FormGroup({
    term: new FormControl(''),
    year: new FormControl('2020'),
  });

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
    return this.httpClient.get('http://localhost:8080/api/3/transcripts/search?term=' + this.searchForm.value.term);
  }

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

}
