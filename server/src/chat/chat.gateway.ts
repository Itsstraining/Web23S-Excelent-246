import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer() server: Server;
  constructor(private chatService: ChatService) {}

  handleConnection(client: any, ...args: any){
    console.log(`Client ${client.id} connected`);
  }

  handledisconneted(client: any, ...args: any){
    console.log(`Client ${client.id} disconneted`);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    const roomId = payload.roomId;
    console.log('message',payload);
    this.chatService.createMessage(payload);
    this.server.emit('message-'+ roomId, payload);
    return 'Hello world!';
  }
}
