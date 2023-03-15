import { Sse } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { FileService } from 'src/API/file/file.service';
import { AuthModel } from 'src/Models/auth.model';
import { FileModel } from 'src/Models/file.model';



@WebSocketGateway({ cors: true })
export class FileGateway{
  @WebSocketServer() server: Server;
  rooms:Array<{roomId:string,users:Array<{userInfo:AuthModel,socketId:string}>}>=[];
  
  constructor(private fileService: FileService) {}

  handleConnection(client:any, ...arg: any[]){
  
  }

  handleDisconnect(client:any){
   
    let room = this.rooms.findIndex((room)=>room.users.findIndex((user)=>user.socketId===client.id)!=-1);
    if(room!=-1){
      let user = this.rooms[room].users.findIndex((user)=>user.socketId===client.id);
      if(user!=-1){
        this.rooms[room].users.splice(user,1);
      }
      this.server.emit('leaveRoom',this.rooms[room]);
    }
  }


  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any) {
    console.log('message', payload);
    client.join('message-' + payload.fileId);
    client.broadcast.emit('message-' + payload.fileId, payload);
    
    return 'Hello world!';
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket,payload:any) {
    console.log('join room',payload.fileId)
    client.join('message-' + payload.fileId);
    let room = this.rooms.findIndex((room)=>room.roomId===payload.fileId);
    if(room===-1){
      //Thêm người dùng vào phòng
      this.rooms.push({roomId:payload.fileId,users:[{userInfo:payload.user,socketId:client.id}]});

    }else{
      this.rooms[room].users.push({userInfo:payload.user,socketId:client.id});
    }
    console.log("join room: " + this.rooms[room])
    console.log(this.rooms[room])
    this.server.emit('update-room',this.rooms[room]);
  }


  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket,payload:any) {
    console.log('leave room',payload.fileId)
    client.leave('message-' + payload.fileId);
    let room = this.rooms.findIndex((room)=>room.roomId===payload.fileId);
    if(room!==-1){
      let user = this.rooms[room].users.findIndex((user)=>user.userInfo.userId===payload.user.userId);
      if(user!==-1){
        this.rooms[room].users.splice(user,1);
      }
    }
    console.log("out room: " + this.rooms[room])
    console.log(this.rooms[room])
    this.server.emit('update-room',this.rooms[room]);
  }
}
