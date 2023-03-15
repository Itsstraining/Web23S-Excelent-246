import { Body, Controller, Get, Post } from '@nestjs/common';
import { Param, Query } from '@nestjs/common/decorators';
import { Message } from 'src/schema/chat.schema'
import { ChatService } from 'src/chat/chat.service';

@Controller('chat')
export class ChatController {

    constructor(private chatService: ChatService){}


    @Get('getAll/:id')
    getAllMessagesById(@Param('id') id: string){
        return this.chatService.getAllById(id);
    }
    
    @Get('getOne/:id')
    getMessageById(@Param('id') id: string){
        return this.chatService.getMessageById(id);
    }

    @Post('/send')
    sendMessage(@Body() message: Message){
        this.chatService.createMessage(message);
    }



}
