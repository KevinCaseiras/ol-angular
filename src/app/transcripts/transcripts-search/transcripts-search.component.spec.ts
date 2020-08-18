import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptsSearchComponent } from './transcripts-search.component';

describe('TranscriptsSearchComponent', () => {
  let component: TranscriptsSearchComponent;
  let fixture: ComponentFixture<TranscriptsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranscriptsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscriptsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
