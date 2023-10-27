/// <reference lib="webworker" />

import { WebSocketEvent } from '../../models/enums/WebSocketEvent.enum';

const socket = new WebSocket('ws:/localhost:8080/quotes');

addEventListener('message', ({ data }) => {
  if (data.event === WebSocketEvent.OPEN) {
    connectWebsocket();
  }
  if (data.event === WebSocketEvent.CLOSE) {
    socket.close();
  }
  if (data.event === WebSocketEvent.MESSAGE) {
    socket.send(data.message);
  }
});

function connectWebsocket() {
  socket.onmessage = (
    message: MessageEvent<{ [attr: string]: number; timestamp: number }>
  ) => {
    postMessage({ event: WebSocketEvent.MESSAGE, message: message.data });
  };
  socket.onclose = (_) => {
    postMessage({ event: WebSocketEvent.CLOSE });
  };
  socket.onerror = (_) => {
    postMessage({ event: WebSocketEvent.ERROR });
  };
  socket.onopen = (_) => {
    postMessage({ event: WebSocketEvent.OPEN });
  };
}
