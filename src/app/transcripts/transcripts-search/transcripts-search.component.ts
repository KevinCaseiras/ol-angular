import {Component, OnInit} from '@angular/core';
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
  years = [];
  searchForm: FormGroup;

  search(): void {
    const term = this.searchForm.value.term || '*';
    const year = this.searchForm.value.year;
    if (this.searchForm.value.year === 'Any') {
      this.doSearchAllYears(term).subscribe(
        res => {
          this.handleSearchResponse(res);
        }
      );
    } else {
      this.doSearchSingleYear(term, year).subscribe(
        res => {
          this.handleSearchResponse(res);
        }
      );
    }
  }

  doSearchAllYears(term: string): Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/3/transcripts/search?term=' + term);
  }

  doSearchSingleYear(term: string, year: number): Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/3/transcripts/' + year + '/search?term=' + term);
  }

  handleSearchResponse(res): void {
    this.matches = res.result.items;
  }

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.years = this.initAvailableYears();

    this.searchForm = new FormGroup({
      term: new FormControl(''),
      year: new FormControl('Any'),
    });
  }

  initAvailableYears(): any[] {
    const years = [];
    let currYear = new Date().getFullYear();
    const earliestYear = 1993;
    years.push('Any');
    while (currYear >= earliestYear) {
      years.push(currYear);
      currYear--;
    }
    years.push('Any');
    return years;
  }

}
