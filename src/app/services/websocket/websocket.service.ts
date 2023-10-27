import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, filter, retry, switchMap } from 'rxjs/operators';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { WebSocketEvent } from '../../models/enums/WebSocketEvent.enum';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  worker: Worker;

  constructor() {}

  getApiUrl = 'ws://localhost:8080/quotes';
  connection$!: WebSocketSubject<{ [attr: string]: number; timestamp: number }>;
  RETRY_SECONDS = 10;

  openWebSocket(callback: Function) {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(
        new URL('./websocket-connection.worker.ts', import.meta.url)
      );

      this.worker.onmessage = (message: {
        data: {
          event: WebSocketEvent;
          message: string;
        };
      }) => {
        if (message.data.event === WebSocketEvent.MESSAGE) {
          callback(message.data.message);
        }
      };

      this.worker.postMessage({ event: WebSocketEvent.OPEN });
    } else {
      this.connect().subscribe((message) => callback(JSON.stringify(message)));
    }
  }

  closeWebSocket() {
    this.closeConnection();
    this.worker.postMessage({ event: WebSocketEvent.CLOSE });
  }

  connect(): Observable<any> {
    return of(this.getApiUrl).pipe(
      filter((wsUrl) => !!wsUrl),
      switchMap((wsUrl) => {
        if (this.connection$) {
          return this.connection$;
        } else {
          this.connection$ = webSocket(wsUrl);
          return this.connection$;
        }
      }),
      retry({
        count: 3,
        delay: (errors) => errors.pipe(delay(this.RETRY_SECONDS)),
      })
    );
  }

  closeConnection() {
    if (this.connection$) {
      this.connection$.complete();
      this.connection$ = null;
    }
  }
}
