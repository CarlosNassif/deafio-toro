import { Component } from '@angular/core';
import { Quote } from 'src/app/models/Quotes.model';
import { QuoteQuery } from 'src/app/states/quote/quote.query';

@Component({
  selector: 'app-quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.scss'],
})
export class QuotesListComponent {
  quotes$ = this.quoteQuery.quotes$;

  constructor(private quoteQuery: QuoteQuery) {}

  itemKey(_, item: Quote) {
    return item.id;
  }
}
