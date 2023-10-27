import { Component, Input, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QUOTES_MAP } from 'src/app/models/Quotes.model';

import { QuoteCardComponent } from './quote-card.component';

@Component({
  selector: 'app-chart',
})
class MockComponent {
  @Input() data;
  @Input() timestamp;
}

describe('QuoteCardComponent', () => {
  let component: QuoteCardComponent;
  let fixture: ComponentFixture<QuoteCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuoteCardComponent, MockComponent],
    });
    fixture = TestBed.createComponent(QuoteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set name based on acronym', () => {
    expect(component.name).toBeFalsy();
    const newValue = 'MGLU3';
    component.ngOnChanges({
      acronym: new SimpleChange(null, newValue, true),
    });
    component.acronym = newValue;
    fixture.detectChanges();

    expect(component.name).toBe(QUOTES_MAP[newValue].fullName);

    const newValue2 = 'BBDC4';
    component.ngOnChanges({
      acronym: new SimpleChange(null, newValue2, false),
    });
    component.acronym = newValue2;
    fixture.detectChanges();

    expect(component.name).toBe(QUOTES_MAP[newValue2].fullName);
  });

  it('should set valueIncrease if currentValue changes', () => {
    expect(component.valueIncrease).toBeTrue();
    const newValue = 123;
    component.ngOnChanges({
      currentValue: new SimpleChange(component.currentValue, newValue, true),
    });
    component.currentValue = newValue;
    fixture.detectChanges();

    expect(component.valueIncrease).toBeTrue();

    const newValue2 = 50;
    component.ngOnChanges({
      currentValue: new SimpleChange(component.currentValue, newValue2, false),
    });
    component.currentValue = newValue2;
    fixture.detectChanges();

    expect(component.valueIncrease).toBeFalse();
  });
});
