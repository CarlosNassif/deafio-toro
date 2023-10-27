import { Component, OnInit } from '@angular/core';
import { SortTypes } from 'src/app/models/enums/SortTypes.enum';
import { QuoteQuery } from 'src/app/states/quote/quote.query';
import { SortQuery } from 'src/app/states/sort/sort.query';
import { SortService } from '../../services/sort/sort.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
})
export class SortComponent implements OnInit {
  highToLow: boolean;

  haveQuotes: boolean = false;

  constructor(
    private sortService: SortService,
    private sortQuery: SortQuery,
    private quoteQuery: QuoteQuery
  ) {}

  ngOnInit(): void {
    this._getSortType();
    this._getQuotesLength();
  }

  private _getSortType() {
    this.sortQuery.type$.subscribe({
      next: (type) => {
        this.highToLow = type === SortTypes.HIGH;
      },
    });
  }

  sortHigh() {
    this._sort(SortTypes.HIGH);
  }

  sortLow() {
    this._sort(SortTypes.LOW);
  }

  private _sort(newType: SortTypes) {
    this.sortService.updateType(newType);
  }

  _getQuotesLength() {
    const sub = this.quoteQuery.quotes$.subscribe((quotes) => {
      if (quotes.length > 0) {
        this.haveQuotes = true;
        sub.unsubscribe();
      }
    });
  }
}
