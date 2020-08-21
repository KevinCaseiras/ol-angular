import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-transcript-view',
  templateUrl: './transcript-view.component.html',
  styleUrls: ['./transcript-view.component.css']
})
export class TranscriptViewComponent implements OnInit {
  dateTime: string;
  transcript;
  loading;

  constructor(private activatedRoute: ActivatedRoute,
              private httpClient: HttpClient) {
    this.dateTime = this.activatedRoute.snapshot.params.dateTime;
  }

  ngOnInit(): void {
    this.loading = true;
    this.httpClient.get<any>('http://localhost:8080/api/3/transcripts/' + this.dateTime).subscribe(
      res => {
        this.transcript = res.result;
        console.log(this.transcript);
        this.loading = false;
      }
    );
  }

}
