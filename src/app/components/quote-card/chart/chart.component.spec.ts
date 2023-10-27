import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  LineSeriesOption,
  TitleComponentOption,
  XAXisComponentOption,
  YAXisComponentOption,
} from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';

import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartComponent],
      imports: [
        NgxEchartsModule.forRoot({
          echarts: () => import('echarts'),
        }),
      ],
    });
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should update when new timestamp is submitted', () => {
    expect(component.timestamp).toBeFalsy();
    expect(component.currentTimestamp.length).toBe(0);
    expect(component.currentData.length).toBe(0);
    expect(component.counter).toBe(0);

    const newValue = 1;
    component.ngOnChanges({
      timestamp: new SimpleChange(component.timestamp, newValue, true),
    });
    component.timestamp = newValue;
    fixture.detectChanges();

    expect(component.timestamp).toBeTruthy();
    expect(component.currentTimestamp.length).toBe(1);
    expect(component.currentData.length).toBe(1);
    expect(component.counter).toBe(1);
  });

  it('Should NOT update when new timestamp is NOT submitted', () => {
    expect(component.timestamp).toBeFalsy();
    expect(component.currentTimestamp.length).toBe(0);
    expect(component.currentData.length).toBe(0);
    expect(component.counter).toBe(0);

    const newValue = 1;
    component.ngOnChanges({
      data: new SimpleChange(component.data, newValue, true),
    });
    component.data = newValue;
    fixture.detectChanges();

    expect(component.timestamp).toBeFalsy();
    expect(component.currentTimestamp.length).toBe(0);
    expect(component.currentData.length).toBe(0);
    expect(component.counter).toBe(0);
  });

  describe('chart styling', () => {
    let series: LineSeriesOption;

    beforeEach(() => {
      expect(component.options).toBeTruthy();
      series = component.options.series as LineSeriesOption;
    });

    it('Should be smooth-line type', () => {
      expect(series.type).toBe('line');
      expect(series.smooth).toBeTrue();
    });

    it('Should have specified line and area styles', () => {
      expect(series.color).toBe('#00ADD2');
      expect(series.lineStyle.color).toBe('#00ADD2');
      expect(series.lineStyle.width).toBe(3);
      expect(series.areaStyle.opacity).toBe(0.2);
    });

    it('Should not have x axis and y Axis visible', () => {
      let xAxis = component.options.xAxis as XAXisComponentOption;
      let yAxis = component.options.yAxis as YAXisComponentOption;

      expect(xAxis.show).toBeFalse();
      expect(yAxis.show).toBeFalse();
    });

    it('Should not have title', () => {
      let title = component.options.title as TitleComponentOption;
      expect(title.show).toBeFalse();
    });

    it('Should have no boundary gap on xAxis', () => {
      let xAxis: any = component.options.xAxis;
      expect(xAxis.boundaryGap).toBeFalse();
    });
  });
});
