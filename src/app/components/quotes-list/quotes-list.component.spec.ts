import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';

import { QuotesListComponent } from './quotes-list.component';
import { Quote, QuoteName } from 'src/app/models/Quotes.model';

@Component({
  selector: 'app-quote-card',
})
class MockComponent {
  @Input() acronym: QuoteName;
  @Input() currentValue: number = 0;
  @Input() timestamp: number;
}

describe('QuotesListComponent', () => {
  let component: QuotesListComponent;
  let fixture: ComponentFixture<QuotesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuotesListComponent, MockComponent],
    });
    fixture = TestBed.createComponent(QuotesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('list should update when quotes update', () => {
    component.quotes$ = of([]);
    fixture.detectChanges();

    const elements = fixture.debugElement.queryAll(By.css('app-quote-card'));
    const cards = elements?.map((e) => e.nativeElement);

    expect(cards.length).toBe(0);

    component.quotes$ = of([
      {
        id: 'ABEV3',
        lastValue: 123,
        currentValue: 0,
        timestamp: 1,
      },
    ] as Quote[]);
    fixture.detectChanges();

    const elements1 = fixture.debugElement.queryAll(By.css('app-quote-card'));
    const cards1 = elements1?.map((e) => e.nativeElement);

    expect(cards1.length).toBe(1);

    component.quotes$ = of([
      {
        id: 'ABEV3',
        lastValue: 123,
        currentValue: 0,
        timestamp: 1,
      },
      {
        id: 'B3SA3',
        lastValue: 123,
        currentValue: 0,
        timestamp: 1,
      },
    ] as Quote[]);
    fixture.detectChanges();

    const elements2 = fixture.debugElement.queryAll(By.css('app-quote-card'));
    const cards2 = elements2?.map((e) => e.nativeElement);

    expect(cards2.length).toBe(2);
  });
});
