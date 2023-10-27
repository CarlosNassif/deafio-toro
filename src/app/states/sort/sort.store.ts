import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { SortTypes } from 'src/app/models/enums/SortTypes.enum';

export interface SortState {
  type: SortTypes;
}

export function createInitialState(): SortState {
  return {
    type: null,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'sort' })
export class SortStore extends Store<SortState> {
  constructor() {
    super(createInitialState());
  }
}
