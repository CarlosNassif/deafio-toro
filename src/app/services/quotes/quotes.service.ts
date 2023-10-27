import { EventEmitter, Injectable } from '@angular/core';
import { Quote, QuoteName } from 'src/app/models/Quotes.model';
import { SortQuery } from 'src/app/states/sort/sort.query';
import { QuoteStore, QuotesState } from './../../states/quote/quote.store';
import { SortTypes } from 'src/app/models/enums/SortTypes.enum';
import { interval, throttle } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  private _sortFunction: (a: Quote, b: Quote) => number;

  private _addOrder$: EventEmitter<Quote[]> = new EventEmitter();

  private readonly UPDATE_TIME = 15_000;

  constructor(private quoteStore: QuoteStore, private sortQuery: SortQuery) {
    this.subscribeToSortType();
    this._addOrder$
      .pipe(throttle(() => interval(this.UPDATE_TIME)))
      .subscribe((quotes) => {
        this.addOrder(quotes);
      });
  }

  private subscribeToSortType() {
    this.sortQuery.type$.subscribe((type) => {
      this._sortFunction =
        type === SortTypes.HIGH ? this._sortHigh : this._sortLow;
      const quotes = this.quoteStore.getValue().quotes;
      this.addOrder(quotes);
    });
  }

  private _sortHigh(a: Quote, b: Quote) {
    if (a.lastValue - a.currentValue > b.lastValue - b.currentValue) return 1;
    if (a.lastValue - a.currentValue < b.lastValue - b.currentValue) return -1;
    return 0;
  }

  private _sortLow(a: Quote, b: Quote) {
    if (a.lastValue - a.currentValue > b.lastValue - b.currentValue) return -1;
    if (a.lastValue - a.currentValue < b.lastValue - b.currentValue) return 1;
    return 0;
  }

  updateQuoteFromMessage(message: string) {
    const quote = this._buildQuoteFromMessage(message);
    this.updateQuote(quote);
  }

  private _buildQuoteFromMessage(message: string) {
    const obj: { [attr: string]: number; timestamp: number } =
      JSON.parse(message);

    const quoteName = Object.keys(obj)[0] as QuoteName;

    const quotes = this.quoteStore.getValue().quotes;
    const quote: Quote = {
      id: quoteName,
      lastValue: obj[quoteName],
      currentValue: obj[quoteName],
      timestamp: obj.timestamp,
      order: quotes.length < 8 ? 1 : 9,
    };

    return quote;
  }

  updateQuote(quote: Quote) {
    this.quoteStore.update((state) => {
      const newState: QuotesState = {
        quotes: [...state.quotes],
        lastQuote: null,
        quotesMap: {
          ...state.quotesMap,
        },
      };
      this._updateLastQuote(newState, quote);
      this._updateQuotesList(newState, quote);
      this._updateQuotesMap(newState, quote);

      return newState;
    });
  }

  private _updateLastQuote(state: QuotesState, quote: Quote) {
    state.lastQuote = quote;
  }

  private _updateQuotesList(state: QuotesState, quote: Quote) {
    const index = state.quotes.findIndex((q) => q.id == quote.id);

    if (index >= 0) {
      state.quotes[index].lastValue = state.quotes[index].currentValue;
      state.quotes[index].currentValue = quote.lastValue;
      state.quotes[index].timestamp = quote.timestamp;
    } else {
      state.quotes.push(quote);
    }

    this._addOrder$.next(state.quotes);
    // this.addOrder(state.quotes);
  }

  private addOrder(quotes: Quote[]) {
    console.log(
      '🚀 ~ file: quotes.service.ts:102 ~ QuotesService ~ addOrder ~ addOrder:'
    );
    const arrCopy: Quote[] = [...quotes];
    arrCopy.sort(this._sortFunction);

    arrCopy.forEach((quote, index) => {
      quote.order = index;
    });
  }

  private _updateQuotesMap(state: QuotesState, quote: Quote) {
    try {
      state.quotesMap[quote.id].values.push(quote.currentValue);
      state.quotesMap[quote.id].timestamp = quote.timestamp;
    } catch (err) {
      state.quotesMap[quote.id] = {
        values: [quote.currentValue],
        timestamp: quote.timestamp,
      };
    }
  }
}
