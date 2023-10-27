import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortComponent } from './sort.component';
import { SortQuery } from 'src/app/states/sort/sort.query';
import { SortService } from 'src/app/services/sort/sort.service';
import { QuoteQuery } from 'src/app/states/quote/quote.query';

describe('SortListComponent', () => {
  let component: SortComponent;
  let fixture: ComponentFixture<SortComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortComponent],
      providers: [SortQuery, SortService, QuoteQuery],
    });
    fixture = TestBed.createComponent(SortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort high and update highToLow', () => {
    component.sortHigh();
    fixture.detectChanges();

    expect(component.highToLow).toBeTrue();
  });

  it('should sort low and update highToLow', () => {
    component.sortLow();
    fixture.detectChanges();

    expect(component.highToLow).toBeFalse();
  });
});
