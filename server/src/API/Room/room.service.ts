
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomModel } from '../../Models/room.model';
import { AuthModel } from 'src/Models/auth.model';
import { Room, RoomDocument } from '../../schema/room.schema';

@Injectable()
export class RoomService {
    constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {
    }

    async create(id: string, firstUser: AuthModel): Promise<Room> {
        let room: RoomModel = {
            id: id,
            users: [firstUser]
        };
        let document = await this.roomModel.create(room);
        return document.save();
    }
    async addUser(id: string, user: AuthModel): Promise<Room> {
        try {
            const document = await this.roomModel.findOne({ id: id }).exec();
         
            if (!document) return this.create(id, user);
           
            let inRoom = document.users.findIndex((userInRoom) => userInRoom.userId == user.userId);
        
            if (inRoom !== -1) return null;
            document.users.push(user);
            return document.save();
        } catch (err) {
            console.log('lỗi 4', err);
        }


    }
    async get(id: string): Promise<Room> {
        try {
            const document = await this.roomModel.findOne({ id: id }).exec();
            if (!document) return null;
            return document;
        } catch (err) {
            console.log('lỗi 3', err);
        }

    }
    async delete(id: string): Promise<Room> {
        try {
            const document = await this.roomModel.findOne({ id: id }).exec();
          
            if (!document) return null;

            return document.remove();
        } catch (err) {
            console.log('lỗi 2', err);
        }

    }
    async removeUser(id: string, user: AuthModel): Promise<Room> {
        try {
           
            const document = await this.roomModel.findOne({ id: id }).exec();
            if (!document) return null;
            let inRoom = document.users.findIndex((userInRoom) => userInRoom.userId == user.userId);
            if (inRoom !== -1) return null;
            document.users.splice(inRoom, 1);
            if (document.users.length === 0) return this.delete(id);
            return document.save();
        } catch (err) {
            console.log('lỗi 1', err);
        }

    }
}