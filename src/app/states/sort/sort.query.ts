import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { filter } from 'rxjs/operators';
import { SortState, SortStore } from './sort.store';

@Injectable({
  providedIn: 'root',
})
export class SortQuery extends Query<SortState> {
  type$ = this.select('type').pipe(filter((type) => !!type));

  constructor(protected override store: SortStore) {
    super(store);
  }
}
