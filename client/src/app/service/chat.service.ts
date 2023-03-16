import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ChatModel } from '../model/chat.model';
import { environment } from '../env/environment';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  participators: Array<any> = [];


  constructor(private socket: Socket, private http: HttpClient) { }

  getPrevMessagesByRoomId(roomId: string) {
    return this.http.get(`${environment.baseUrl}chat/getAll/${roomId}`);
  }

  getMessageByRoomId(roomId: string) {
    const channel = 'mess-' + roomId;
    this.http.get(`${environment.baseUrl}chat/getOne/${roomId}`)
    return this.socket.fromEvent(channel);
  }
  sendMessageByRoom(data: ChatModel) {
    this.socket.emit('mess', data);
    return this.http.post(`${environment.baseUrl}chat/send`, data);
  }
}
