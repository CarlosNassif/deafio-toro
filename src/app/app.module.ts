import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxEchartsModule } from 'ngx-echarts';

import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ChartComponent } from './components/quote-card/chart/chart.component';
import { QuoteCardComponent } from './components/quote-card/quote-card.component';
import { QuotesListComponent } from './components/quotes-list/quotes-list.component';
import { SortComponent } from './components/sort/sort.component';
import { QuotesService } from './services/quotes/quotes.service';
import { SortService } from './services/sort/sort.service';

@NgModule({
  declarations: [
    AppComponent,
    QuoteCardComponent,
    ChartComponent,
    SortComponent,
    QuotesListComponent,
  ],
  imports: [
    BrowserModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    environment.production ? [] : AkitaNgDevtools.forRoot(),
  ],
  providers: [SortService, QuotesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
