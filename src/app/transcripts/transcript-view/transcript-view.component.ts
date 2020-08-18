import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transcript-view',
  templateUrl: './transcript-view.component.html',
  styleUrls: ['./transcript-view.component.css']
})
export class TranscriptViewComponent implements OnInit {
  productId: string;

  constructor(private activatedRoute: ActivatedRoute) {
    this.productId = this.activatedRoute.snapshot.params.dateTime;
  }

  ngOnInit(): void {
  }

}
