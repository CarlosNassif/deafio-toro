import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { QUOTES_MAP, QuoteName } from 'src/app/models/Quotes.model';

@Component({
  selector: 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteCardComponent implements OnInit, OnChanges {
  @Input() acronym: QuoteName;
  @Input() currentValue: number = 0;
  @Input() timestamp: number;

  valueIncrease = true;
  name: string;
  imgSrc: string = 'assets/aes-eletropaulo.png';

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes?.['currentValue']) {
      this._setValueIncrease(
        changes['currentValue'].currentValue,
        changes['currentValue'].previousValue
      );
    }
    if (!!changes?.['acronym']) {
      this._setName(changes?.['acronym'].currentValue);
    }
  }

  private _setValueIncrease(currentValue: number, previousValue: number) {
    this.valueIncrease = currentValue >= previousValue;
  }

  private _setName(acronym: string) {
    this.name = QUOTES_MAP[acronym].fullName;
  }
}
