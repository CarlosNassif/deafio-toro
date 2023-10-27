import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Quote, QuotesMap } from 'src/app/models/Quotes.model';

export interface QuotesState {
  quotes: Quote[];
  lastQuote: Quote;
  quotesMap: QuotesMap;
}

export function createInitialState(): QuotesState {
  return {
    quotes: [],
    lastQuote: null,
    quotesMap: {},
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'quote' })
export class QuoteStore extends Store<QuotesState> {
  constructor() {
    super(createInitialState());
  }
}
