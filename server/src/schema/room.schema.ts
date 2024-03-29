import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AuthModel } from '../Models/auth.model';

export type RoomDocument = HydratedDocument<Room>;

@Schema()
export class Room {
    @Prop()
    id: string;
    //prop type Array UserModel
    @Prop()
    users: Array<AuthModel>;
    
}

export const RoomSchema = SchemaFactory.createForClass(Room);