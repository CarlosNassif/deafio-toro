import { Component, OnDestroy, OnInit } from '@angular/core';
import { enableAkitaProdMode } from '@datorama/akita';
import { environment } from 'src/environments/environment';
import { QuotesService } from './services/quotes/quotes.service';
import { WebsocketService } from './services/websocket/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private webSocketService: WebsocketService,
    private quotesService: QuotesService
  ) {}

  ngOnInit(): void {
    if (environment.production) {
      enableAkitaProdMode();
    }
    this.webSocketService.openWebSocket(this.updateQuotesMap.bind(this));
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

  updateQuotesMap(message: string) {
    this.quotesService.updateQuoteFromMessage(message);
  }
}
