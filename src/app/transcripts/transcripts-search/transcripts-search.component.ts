import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {Pagination} from '../../pagination';
import {ActivatedRoute, Router, Params, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';

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

  onSearchClick(): void {
    this.updateQueryParams();
  }

  search(): void {
    const term = this.searchForm.value.term || '*'; // An empty string should match any string.
    const year = this.searchForm.value.year;

    // The search API we call changes depending on if we are searching a specific year or not.
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
    this.updateQueryParams();
  }

  updateQueryParams(): void {
    const queryParams: Params = {
      term: this.searchForm.value.term,
      year: this.searchForm.value.year,
      page: this.pagination.currentPage()
    };

    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams,
        queryParamsHandling: 'merge',
      });
  }

  constructor(private httpClient: HttpClient,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.years = this.initAvailableYears();

    // Set model to initial request param values if given.
    let termParam: string = this.activatedRoute.snapshot.queryParamMap.get('term') || '';
    let yearParam: string = this.activatedRoute.snapshot.queryParamMap.get('year') || 'Any';
    let pageParam: number = +this.activatedRoute.snapshot.queryParamMap.get('page') || 1;

    this.searchForm = new FormGroup({
      term: new FormControl(termParam),
      year: new FormControl(yearParam),
    });

    this.pagination = new Pagination(25, 1, 25, 100);
    this.pagination.setPage(pageParam);

    // Load initial data request.
    this.search();

    // Subscribe to url changes to handle forward/back browser navigation.
    // This is also triggered whenever the user changes a form field and searches.
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e) => {
        console.log('Route change event');
        termParam = this.activatedRoute.snapshot.queryParamMap.get('term') || '';
        yearParam = this.activatedRoute.snapshot.queryParamMap.get('year') || 'Any';
        pageParam = +this.activatedRoute.snapshot.queryParamMap.get('page') || 1;

        // update model data
        this.searchForm.setValue({
          term: termParam,
          year: yearParam
        });

        this.pagination.setPage(pageParam);

        this.search();
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
