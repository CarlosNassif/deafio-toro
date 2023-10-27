import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import type { EChartsOption, SeriesOption } from 'echarts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() data: number;
  @Input() timestamp!: number;

  counter: number = 0;

  currentData: [number, number][] = [];
  currentTimestamp: number[] = [];

  options!: EChartsOption;
  mergeOptions!: EChartsOption;

  ngOnInit(): void {
    this.options = {
      title: {
        show: false,
      },
      grid: {
        left: '0',
        bottom: '1px',
        top: 3,
        right: '0',
      },
      xAxis: {
        data: this.currentTimestamp,
        show: false,
        nameLocation: 'end',
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        show: false,
      },
      series: {
        data: this.currentData,
        type: 'line',
        smooth: true,
        color: '#00ADD2',
        symbol: 'none',
        lineStyle: {
          color: '#00ADD2',
          width: 3,
        },
        areaStyle: {
          opacity: 0.2,
        },
        cursor: 'default',
      },
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes['timestamp']) {
      this.updateData();
      this.mergeOptions = {
        ...this.options,
        xAxis: {
          data: this.currentTimestamp,
        },
        series: {
          data: this.currentData,
        },
      };
    }
  }

  updateData() {
    this.currentTimestamp.push(this.timestamp);
    this.currentData.push([this.counter, this.data]);
    this.counter++;
  }
}
