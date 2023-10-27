import { Component, Input, SimpleChange } from '@angular/core';

import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WebsocketService } from './services/websocket/websocket.service';
import { QuotesService } from './services/quotes/quotes.service';

@Component({
  selector: 'app-sort',
})
class MockSortComponent {}

@Component({
  selector: 'app-quotes-list',
})
class MockQuotesListComponent {}
let websocketServiceStub: Partial<WebsocketService>;
describe('AppComponent', () => {
  websocketServiceStub = {
    openWebSocket: (_) => {},
    closeWebSocket: () => {},
  };

  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [AppComponent, MockSortComponent, MockQuotesListComponent],
      providers: [
        {
          provide: WebsocketService,
          useValue: websocketServiceStub,
        },
        QuotesService,
      ],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
