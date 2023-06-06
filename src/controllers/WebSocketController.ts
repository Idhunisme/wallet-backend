import WebSocket from 'ws';

export class WebSocketController {
    private externalWebSocket: WebSocket;
  private wss: WebSocket.Server;

  constructor() {
    this.externalWebSocket = new WebSocket('wss://ws.coincap.io/prices?assets=ALL');

    this.externalWebSocket.on('open', () => {
      console.log('Connected to the external WebSocket server');
    });

    this.wss = new WebSocket.Server({ path: '/ws/ticker', noServer: true });

    this.wss.on('connection', (ws: WebSocket) => {
      console.log('A client connected to the WebSocket server');

      ws.on('message', (message: string) => {
        console.log('Received message from client:', message);
      });

      this.externalWebSocket.on('message', (message: string) => {
        ws.send(message.toString());
      });

      ws.on('close', () => {
        console.log('Client disconnected');
      });
    });
  }

  public start(server: any): void {
    server.on('upgrade', (request: any, socket: any, head: any) => {
      this.wss.handleUpgrade(request, socket, head, (ws: WebSocket) => {
        this.wss.emit('connection', ws, request);
      });
    });
  }
}

  

