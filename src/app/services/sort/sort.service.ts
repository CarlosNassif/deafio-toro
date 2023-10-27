import { Injectable } from '@angular/core';
import { SortTypes } from '../../models/enums/SortTypes.enum';
import { SortStore } from '../../states/sort/sort.store';

@Injectable({
  providedIn: 'root',
})
export class SortService {
  constructor(private sortStore: SortStore) {}

  updateType(newType: SortTypes) {
    this.sortStore.update({ type: newType });
  }
}
