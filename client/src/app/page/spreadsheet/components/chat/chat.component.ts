import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ChatModel } from 'src/app/model/chat.model';
import { User } from 'src/app/model/user.model';
import { ChatService } from 'src/app/service/chat.service';
import { AuthState } from 'src/ngrx/states/auth.states';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  title = 'client';

  chat$!: Observable<any>;
  messages: any[] = [];
  // users: Array<any> = [];

  roomId: string = '';
  newMessage: string = '';
  userName: string = '';
  auth$!: Observable<AuthState>;
  user!:User; 
  sender = document.getElementById('send')! as HTMLElement;

  constructor(protected chatService: ChatService, private route: ActivatedRoute,private store: Store<{auth: AuthState}>){
    this.auth$ = this.store.select('auth');
    this.auth$.subscribe((res) => {
      this.user = res.user!;
      // console.log(this.user);
    })
    this.route.paramMap.subscribe(params => {
      this.roomId = params.get('id')!;
    });
    setTimeout(() => {
      this.joinRoom();
    },1500)
  }

  joinRoom(){
      console.log('Already joined in: ', this.roomId);
      this.chat$ = this.chatService.getMessageByRoomId(this.roomId);
      this.chat$.subscribe((message: any) => {this.messages.push(message)});
      
  }
  sendMessage(message: string ){
    let newMessageData: ChatModel = {
      roomId: this.roomId,
      msg: message,
      date: Date.now(),
      from: this.user.userId!,
      fromURL: this.user.photoURL!,
    }
    this.chatService.sendMessageByRoom(newMessageData);
    this.newMessage = '';
  }

  send(message: string, event: any){
    let newMessageData: ChatModel = {
      roomId: this.roomId,
      msg: message,
      date: Date.now(),
      from: this.user.userId!,
      fromURL: this.user.photoURL!,
    }
    if(event.key ==  'Enter'){
      this.chatService.sendMessageByRoom(newMessageData);
      this.newMessage = '';
    }
  }
}
