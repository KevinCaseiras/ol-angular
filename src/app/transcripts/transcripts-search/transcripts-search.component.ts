import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {Pagination} from '../../pagination';

@Component({
  selector: 'app-transcripts-search',
  templateUrl: './transcripts-search.component.html',
  styleUrls: ['./transcripts-search.component.css']
})

export class TranscriptsSearchComponent implements OnInit {
  matches = [];
  years = [];
  searchForm: FormGroup;
  pagination: Pagination;

  search(): void {
    const term = this.searchForm.value.term || '*';
    const year = this.searchForm.value.year;
    if (this.searchForm.value.year === 'Any') {
      this.doSearchAllYears(term).subscribe(
        res => {
          console.log(res);
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
    return this.httpClient.get('http://localhost:8080/api/3/transcripts/search?' +
      'term=' + term +
      '&limit=' + this.pagination.limit +
      '&offset=' + this.pagination.offsetStart);
  }

  doSearchSingleYear(term: string, year: number): Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/3/transcripts/' + year + '/search?' +
      'term=' + term +
      '&limit=' + this.pagination.limit +
      '&offset=' + this.pagination.offsetStart);
  }

  handleSearchResponse(res): void {
    this.matches = res.result.items;
    this.pagination = new Pagination(res.limit, res.offsetStart, res.offsetEnd, res.total);
  }

  pageChanged(page): void {
    this.pagination.setPage(page);
    this.search();
  }

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.years = this.initAvailableYears();

    this.searchForm = new FormGroup({
      term: new FormControl(''),
      year: new FormControl('Any'),
    });

    this.pagination = new Pagination(25, 1, 25, 100);
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
