import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDocument, Message } from 'src/schema/chat.schema';

@Injectable()
export class ChatService {
    constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) { }


    async getAllById(id: string): Promise<Message[] | null> {
        try {
            const messages = await this.messageModel.find({ roomId: id }).exec();
            return messages as Message[];
        }
        catch (e) {
            // console.log(e);
            return null;
        }
    }

    async getMessageById(id: string): Promise<Message | null> {
        try {
            const message = await this.messageModel.findOne({ id: id }).exec();
            return message as Message;
        }
        catch (e) {
            // console.log(e);
            return null;
        }
    }


    async createMessage(message: Message): Promise<Message | null> {
        try {
            const newMessage = await this.messageModel.create(message);
            return newMessage as Message;
        }
        catch (e) {
            // console.log(e);
            return null;
        }
    }

    async deleteMessage(id: string): Promise<Message | null> {
        try {
            return await this.messageModel.findByIdAndDelete(id);
        }
        catch (e) {
            // console.log(e);
            return null;
        }
    }

}
