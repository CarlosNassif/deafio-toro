import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { QuotesState, QuoteStore } from './quote.store';

@Injectable({
  providedIn: 'root',
})
export class QuoteQuery extends Query<QuotesState> {
  quotes$ = this.select('quotes');

  constructor(protected override store: QuoteStore) {
    super(store);
  }
}
