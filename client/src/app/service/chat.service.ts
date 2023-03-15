import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ChatModel } from '../model/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  participators: Array<any> = [];
  apiURL = 'http://localhost:3000/chat/';

  constructor(private socket:Socket, private http: HttpClient) { }

  getPrevMessagesByRoomId(roomId: string){
    return this.http.get(`${this.apiURL}getAll/${roomId}`);
  }

  getMessageByRoomId(roomId: string){
    const channel = 'message-' + roomId;
    this.http.get(`${this.apiURL}/getOne/${roomId}`)
    return this.socket.fromEvent(channel);
  }
  sendMessageByRoom(data: ChatModel){
    this.socket.emit('message',data);
    return this.http.post(`${this.apiURL}/send`, data);
  }
}
