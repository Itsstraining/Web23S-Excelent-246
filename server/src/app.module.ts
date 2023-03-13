import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './API/Auth/auth.module';
import { ChatModule } from './API/chat/chat.module';
import { FileModule } from './API/file/file.module';
import { FileService } from './API/file/file.service';
import { InvitationModule } from './api/invitation/invitation.module';
import { ChatGateway } from './chat/chat.gateway';
import { FileGateway } from './file/file.gateway';
import { RoomService } from './api/room/room.service';




@Module({
  imports: [
    //gateway

    // api module
    FileModule,
    AuthModule,
    ChatModule,
    InvitationModule,
    // database mongo config
    MongooseModule.forRoot('mongodb+srv://admin:123@cluster0.o8n39ex.mongodb.net/?retryWrites=true&w=majority'),

    ConfigModule.forRoot(),

    // InvitationModule,
  ],
  controllers: [
  ],
  providers: [ChatGateway],
})
export class AppModule { }
